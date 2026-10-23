import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { isComplete } from '../lib/matching'
import { loadSession, saveSession } from '../lib/session'
import type { Choice } from '../types'

export function Test() {
  const navigate = useNavigate()
  const [session, setSession] = useState(() => loadSession())

  const question = QUESTIONS[session.currentIndex]
  const progress = ((session.currentIndex + 1) / QUESTIONS.length) * 100
  const selected = session.answers[session.currentIndex]
  const answeredCount = useMemo(
    () => session.answers.filter((answer) => answer !== null).length,
    [session.answers],
  )

  const choose = useCallback(
    (choice: Choice) => {
      const answers = [...session.answers]
      answers[session.currentIndex] = choice

      if (session.currentIndex < QUESTIONS.length - 1) {
        setSession({ answers, currentIndex: session.currentIndex + 1 })
        return
      }

      saveSession({ answers, currentIndex: session.currentIndex })
      if (isComplete(answers)) {
        navigate('/analyzing')
        return
      }
      const firstMissing = answers.findIndex((answer) => answer === null)
      setSession({ answers, currentIndex: Math.max(firstMissing, 0) })
    },
    [navigate, session.answers, session.currentIndex],
  )

  useEffect(() => {
    saveSession(session)
  }, [session])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === '1' || event.key === 'a' || event.key === 'A') choose('A')
      if (event.key === '2' || event.key === 'b' || event.key === 'B') choose('B')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose])

  function goPrev() {
    if (session.currentIndex === 0) return
    setSession((current) => ({ ...current, currentIndex: current.currentIndex - 1 }))
  }

  return (
    <section className="flex flex-1 flex-col">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>
            {question.number} / {QUESTIONS.length}
          </span>
          <span className="text-ink/60">응답 {answeredCount}개</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
        <progress className="sr-only" value={session.currentIndex + 1} max={QUESTIONS.length}>
          진행률
        </progress>
      </div>

      <h1 className="font-display text-2xl leading-snug font-bold">{question.text}</h1>

      <div className="mt-8 grid gap-3">
        <ChoiceButton
          label="A"
          text={question.optionA}
          selected={selected === 'A'}
          onSelect={() => choose('A')}
        />
        <ChoiceButton
          label="B"
          text={question.optionB}
          selected={selected === 'B'}
          onSelect={() => choose('B')}
        />
      </div>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={session.currentIndex === 0}
          className="w-full rounded-2xl border border-ink/10 bg-white py-3 text-sm font-medium disabled:opacity-40"
        >
          이전 질문
        </button>
      </div>
    </section>
  )
}

function ChoiceButton({
  label,
  text,
  selected,
  onSelect,
}: {
  label: string
  text: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`rounded-2xl px-5 py-5 text-left text-base font-medium shadow-sm transition ${
        selected ? 'bg-secondary ring-2 ring-accent' : 'bg-white hover:bg-secondary/70'
      }`}
    >
      <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/30 text-sm font-bold">
        {label}
      </span>
      {text}
    </button>
  )
}
