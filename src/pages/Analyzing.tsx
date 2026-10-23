import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isComplete, matchCharacter } from '../lib/matching'
import { loadSession } from '../lib/session'

const MESSAGES = [
  '당신의 회사생활 데이터를 분석 중...',
  '숨겨진 직장인 본능을 탐색 중...',
  '당신과 가장 닮은 동료를 찾았어요!',
]

export function Analyzing() {
  const navigate = useNavigate()
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const { answers } = loadSession()
    if (!isComplete(answers)) {
      navigate('/test', { replace: true })
      return
    }

    const result = matchCharacter(answers)
    const tick = window.setInterval(() => {
      setMessageIndex((current) => Math.min(current + 1, MESSAGES.length - 1))
    }, 700)
    const done = window.setTimeout(() => {
      navigate(`/result/${result.id}`, { replace: true })
    }, 2100)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(done)
    }
  }, [navigate])

  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="animate-pulse-soft mb-6 flex gap-2" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="h-3 w-3 rounded-full bg-accent" />
        <span className="h-3 w-3 rounded-full bg-secondary" />
      </div>
      <h1 className="font-display text-2xl font-bold">분석 중</h1>
      <p className="mt-3 min-h-12 text-sm text-ink/75" aria-live="polite">
        {MESSAGES[messageIndex]}
      </p>
    </section>
  )
}
