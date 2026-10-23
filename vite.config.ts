import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'

const CHARACTERS = [
  { id: 'CHR-01', name: '과몰입 햄스터', tagline: '책임감 강한 완벽주의자' },
  { id: 'CHR-02', name: '효율왕 고양이', tagline: '효율을 추구하는 실속파' },
  { id: 'CHR-03', name: '눈치백단 여우', tagline: '상황 판단이 빠른 유연한 협상가' },
  { id: 'CHR-04', name: '인간 비타민 댕댕이', tagline: '친화력 높은 분위기 메이커' },
  { id: 'CHR-05', name: '칼퇴 수호자 펭귄', tagline: '계획과 시간 관리의 달인' },
  { id: 'CHR-06', name: '네네 토끼', tagline: '동료를 배려하는 책임형' },
  { id: 'CHR-07', name: '아이디어 폭주 너구리', tagline: '도전적이고 창의적인 실행형' },
  { id: 'CHR-08', name: '든든한 해결사 곰', tagline: '문제 해결에 앞장서는 리더형' },
] as const

function resultOgPages(): Plugin {
  return {
    name: 'result-og-pages',
    apply: 'build',
    async closeBundle() {
        const distDir = path.resolve(import.meta.dirname, 'dist')
      const indexPath = path.join(distDir, 'index.html')
      const html = await readFile(indexPath, 'utf8')

      for (const character of CHARACTERS) {
        const title = `${character.name} | 회사생활.zip`
        const description = `회사에서 나는 ${character.name}! ${character.tagline}`
        const imagePath = `/characters/${character.id}.jpg`
        const pageHtml = html
          .replaceAll('회사에서 나는 어떤 캐릭터일까?', title)
          .replaceAll(
            '출근만 했을 뿐인데, 캐릭터가 생겼다. 직장인 캐릭터 심리테스트',
            description,
          )
          .replaceAll('/og.jpg', imagePath)

        const outDir = path.join(distDir, 'result', character.id)
        await mkdir(outDir, { recursive: true })
        await writeFile(path.join(outDir, 'index.html'), pageHtml, 'utf8')
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), resultOgPages()],
})
