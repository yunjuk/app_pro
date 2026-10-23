import { toPng } from 'html-to-image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CHARACTER_MAP } from '../data/characters'
import { clearSession } from '../lib/session'
import { resultUrl, shareResult } from '../lib/share'

export function Result() {
  const { id = '' } = useParams()
  const character = CHARACTER_MAP[id]
  const cardRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('')
  const partner = character ? CHARACTER_MAP[character.partnerId] : undefined
  const opposite = character ? CHARACTER_MAP[character.oppositeId] : undefined

  const pageTitle = useMemo(() => {
    if (!character) return '회사생활.zip'
    return `${character.name} | 회사생활.zip`
  }, [character])

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  if (!character) {
    return <Navigate to="/" replace />
  }

  async function downloadCard() {
    if (!cardRef.current) return
    setStatus('이미지를 만들고 있어요...')
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#fff9f4',
      })
      const link = document.createElement('a')
      link.download = `회사생활zip-${character.name}.png`
      link.href = dataUrl
      link.click()
      setStatus('결과 이미지를 저장했어요.')
    } catch {
      setStatus('이미지 저장에 실패했어요. 잠시 후 다시 시도해 주세요.')
    }
  }

  async function onShare() {
    const result = await shareResult(character)
    if (result === 'copied') setStatus('결과 링크를 복사했어요.')
    if (result === 'shared') setStatus('공유 창을 열었어요.')
  }

  async function copyLink() {
    await navigator.clipboard?.writeText(resultUrl(character.id))
    setStatus('결과 링크를 복사했어요.')
  }

  return (
    <section className="flex flex-1 flex-col gap-5">
      <div
        ref={cardRef}
        className="overflow-hidden rounded-[1.8rem] bg-white p-5 shadow-[0_16px_40px_rgba(64,51,47,0.1)]"
      >
        <p className="text-xs font-medium tracking-wide text-ink/55">회사생활.zip</p>
        <img
          src={character.image}
          alt={`${character.name} 캐릭터 일러스트`}
          className="mx-auto mt-3 w-56 rounded-3xl object-cover"
        />
        <h1 className="mt-4 font-display text-3xl font-bold">{character.name}</h1>
        <p className="mt-1 text-sm font-medium text-primary-strong">{character.tagline}</p>
        <p className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-sm leading-relaxed">
          “{character.quote}”
        </p>
      </div>

      <article className="rounded-[1.6rem] bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold">주요 성향</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/80">{character.description}</p>
      </article>

      <article className="rounded-[1.6rem] bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold">업무 스타일</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/80">{character.workStyle}</p>
      </article>

      <article className="rounded-[1.6rem] bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold">업무상 강점</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80">
          {character.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-[1.6rem] bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold">업무상 주의점</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80">
          {character.cautions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <div className="grid grid-cols-2 gap-3">
        <article className="rounded-[1.4rem] bg-white p-4 shadow-sm">
          <h2 className="text-xs text-ink/55">환상의 업무 파트너</h2>
          <p className="mt-2 font-display font-bold">{partner?.name}</p>
          <p className="mt-1 text-xs text-ink/70">{partner?.tagline}</p>
        </article>
        <article className="rounded-[1.4rem] bg-white p-4 shadow-sm">
          <h2 className="text-xs text-ink/55">상극 유형</h2>
          <p className="mt-2 font-display font-bold">{opposite?.name}</p>
          <p className="mt-1 text-xs text-ink/70">{opposite?.tagline}</p>
        </article>
      </div>

      <div className="grid gap-3">
        <button
          type="button"
          onClick={downloadCard}
          className="rounded-2xl bg-primary py-4 font-bold text-ink"
        >
          결과 이미지 저장
        </button>
        <button type="button" onClick={onShare} className="rounded-2xl bg-accent py-4 font-bold text-ink">
          결과 공유하기
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="rounded-2xl border border-ink/10 bg-white py-3 text-sm font-medium"
        >
          결과 링크 복사
        </button>
        <Link
          to="/"
          onClick={() => clearSession()}
          className="rounded-2xl py-3 text-center text-sm font-medium text-ink/70 underline-offset-4 hover:underline"
        >
          다시 테스트하기
        </Link>
      </div>
      <p className="min-h-5 text-center text-xs text-ink/60" aria-live="polite">
        {status}
      </p>
    </section>
  )
}
