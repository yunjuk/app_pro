import { EMPTY_ANSWERS } from './matching'
import type { Choice } from '../types'

const STORAGE_KEY = 'office-life-zip-session-v1'

export interface QuizSession {
  answers: (Choice | null)[]
  currentIndex: number
}

function emptySession(): QuizSession {
  return {
    answers: [...EMPTY_ANSWERS],
    currentIndex: 0,
  }
}

export function loadSession(): QuizSession {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return emptySession()
    const parsed = JSON.parse(raw) as Partial<QuizSession>
    if (!Array.isArray(parsed.answers) || parsed.answers.length !== EMPTY_ANSWERS.length) {
      return emptySession()
    }
    return {
      answers: parsed.answers.map((answer) => (answer === 'A' || answer === 'B' ? answer : null)),
      currentIndex:
        typeof parsed.currentIndex === 'number'
          ? Math.min(Math.max(parsed.currentIndex, 0), EMPTY_ANSWERS.length - 1)
          : 0,
    }
  } catch {
    return emptySession()
  }
}

export function saveSession(session: QuizSession) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession() {
  sessionStorage.removeItem(STORAGE_KEY)
}
