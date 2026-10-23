import { CHARACTERS } from '../data/characters'
import { QUESTIONS } from '../data/questions'
import type { Character, Choice, TraitCode } from '../types'

const AXIS_LETTERS = {
  PI: ['P', 'I'],
  TF: ['T', 'F'],
  AC: ['A', 'C'],
  RE: ['R', 'E'],
} as const

export const EMPTY_ANSWERS: (Choice | null)[] = QUESTIONS.map(() => null)

export function isComplete(answers: (Choice | null)[]): answers is Choice[] {
  return answers.length === QUESTIONS.length && answers.every((answer) => answer === 'A' || answer === 'B')
}

export function computeTraitCode(answers: Choice[]): TraitCode {
  const letters = (['PI', 'TF', 'AC', 'RE'] as const).map((axis) => {
    const related = QUESTIONS.map((question, index) => ({ question, answer: answers[index] })).filter(
      ({ question }) => question.axis === axis,
    )
    const firstCount = related.filter(({ answer }) => answer === 'A').length
    const [first, second] = AXIS_LETTERS[axis]
    return firstCount >= 2 ? first : second
  })

  return letters.join('') as TraitCode
}

function matchingCount(userCode: TraitCode, characterCode: TraitCode) {
  return [...userCode].filter((letter, index) => letter === characterCode[index]).length
}

export function matchCharacter(answers: Choice[]): Character {
  const userCode = computeTraitCode(answers)

  return [...CHARACTERS].sort((left, right) => {
    const leftScore = matchingCount(userCode, left.traitCode)
    const rightScore = matchingCount(userCode, right.traitCode)
    if (rightScore !== leftScore) return rightScore - leftScore

    for (let index = 0; index < 4; index += 1) {
      const leftMatch = left.traitCode[index] === userCode[index]
      const rightMatch = right.traitCode[index] === userCode[index]
      if (leftMatch !== rightMatch) return leftMatch ? -1 : 1
    }

    return left.id.localeCompare(right.id)
  })[0]
}

export function allTraitCodes(): TraitCode[] {
  const codes: TraitCode[] = []
  for (const collab of ['P', 'I'] as const) {
    for (const approach of ['T', 'F'] as const) {
      for (const response of ['A', 'C'] as const) {
        for (const motive of ['R', 'E'] as const) {
          codes.push(`${collab}${approach}${response}${motive}`)
        }
      }
    }
  }
  return codes
}

export function answersForTraitCode(code: TraitCode): Choice[] {
  return QUESTIONS.map((question) => {
    const letter = {
      PI: code[0],
      TF: code[1],
      AC: code[2],
      RE: code[3],
    }[question.axis]
    const [first] = AXIS_LETTERS[question.axis]
    return letter === first ? 'A' : 'B'
  })
}

export function distributionForAllCodes() {
  const counts = Object.fromEntries(CHARACTERS.map((character) => [character.id, 0])) as Record<string, number>

  for (const code of allTraitCodes()) {
    const result = matchCharacter(answersForTraitCode(code))
    counts[result.id] += 1
  }

  return counts
}

if (import.meta.env.DEV) {
  for (const code of allTraitCodes()) {
    const first = matchCharacter(answersForTraitCode(code))
    const second = matchCharacter(answersForTraitCode(code))
    if (first.id !== second.id) {
      throw new Error(`동일 응답 결과가 달라졌습니다: ${code}`)
    }
  }
}
