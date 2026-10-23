import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        본문으로 건너뛰기
      </a>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-8 pt-5 sm:max-w-lg">
        <header className="mb-5 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-bold tracking-tight">
            회사생활.zip
          </Link>
          <Link to="/about" className="text-sm text-ink/70 underline-offset-4 hover:underline">
            안내
          </Link>
        </header>
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}
