import { Link } from 'react-router-dom'

export function Home() {
  return (
    <section className="flex flex-1 flex-col items-center text-center">
      <p className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">직장인 캐릭터 심리테스트</p>
      <h1 className="mt-5 font-display text-[1.85rem] leading-snug font-bold sm:text-4xl">
        회사에서 나는
        <br />
        어떤 캐릭터일까?
      </h1>
      <p className="mt-3 text-sm text-ink/75">출근만 했을 뿐인데, 캐릭터가 생겼다.</p>
      <img
        src="/hero.jpg"
        alt="직장인 동물 캐릭터들이 모여 있는 대표 일러스트"
        className="animate-float mt-6 w-full max-w-sm rounded-[2rem] bg-white object-cover shadow-[0_16px_40px_rgba(64,51,47,0.12)]"
      />
      <div className="mt-6 grid w-full grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
          <p className="text-ink/55">문항 수</p>
          <p className="mt-1 font-bold">12문항</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
          <p className="text-ink/55">예상 시간</p>
          <p className="mt-1 font-bold">약 2~3분</p>
        </div>
      </div>
      <Link
        to="/test"
        className="mt-7 w-full rounded-2xl bg-primary py-4 text-base font-bold text-ink shadow-[0_10px_24px_rgba(255,143,163,0.45)] transition hover:bg-primary-strong"
      >
        테스트 시작하기
      </Link>
      <p className="mt-4 text-xs leading-relaxed text-ink/60">
        회원가입 없이 바로 시작할 수 있어요.
        <br />
        오락용 콘텐츠이며 심리 진단이 아닙니다.
      </p>
    </section>
  )
}
