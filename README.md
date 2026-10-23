# 회사생활.zip

직장인 캐릭터 심리테스트 웹서비스입니다. 12문항, 4개 성향 축, 8종 동물 캐릭터 결과를 제공합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 표시된 주소로 접속합니다. 기본은 `http://localhost:5173`입니다.

## 배포

Vercel 또는 Netlify에 정적 사이트로 배포하면 됩니다.

- 빌드 명령: `npm run build`
- 출력 폴더: `dist`
- HTTPS가 기본 적용되는 호스팅을 사용하세요.

결과 페이지(`/result/CHR-01` 등)는 빌드 시 OG 메타가 들어간 HTML이 함께 생성됩니다. SNS 미리보기는 배포 URL에서 다시 확인하세요.

## 운영 메모

- 문항과 결과 문구는 `src/data/questions.ts`, `src/data/characters.ts`에서 수정합니다.
- 사용자 응답은 서버에 저장되지 않고 브라우저 `sessionStorage`에만 잠시 남습니다.
- 공유 주소에는 캐릭터 ID만 포함됩니다.
- 오락용 콘텐츠이며 심리 진단이 아닙니다.
