export function About() {
  return (
    <section className="space-y-5">
      <h1 className="font-display text-2xl font-bold">서비스 안내</h1>
      <article className="rounded-[1.6rem] bg-white p-5 text-sm leading-relaxed text-ink/80 shadow-sm">
        <p>
          회사생활.zip은 직장 상황 기반의 참여형 심리테스트입니다. 12개 질문에 답하면 4개 성향 축을
          계산해 8종의 동물 캐릭터 중 가장 가까운 유형을 보여줍니다.
        </p>
      </article>
      <article className="rounded-[1.6rem] bg-white p-5 text-sm leading-relaxed text-ink/80 shadow-sm">
        <h2 className="font-display text-lg font-bold text-ink">고지사항</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>본 서비스는 오락과 자기이해를 위한 콘텐츠입니다.</li>
          <li>심리학적 진단, 채용, 업무 능력 평가를 목적으로 하지 않습니다.</li>
          <li>회원가입 없이 이용할 수 있으며 응답은 서버에 저장되지 않습니다.</li>
          <li>진행 상태는 브라우저 세션에만 잠시 보관되며, 탭을 닫으면 사라질 수 있습니다.</li>
          <li>결과 공유 주소에는 캐릭터 유형 식별값만 포함됩니다.</li>
        </ul>
      </article>
    </section>
  )
}
