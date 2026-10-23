import type { Character } from '../types'

export function resultPath(characterId: string) {
  return `/result/${characterId}`
}

export function resultUrl(characterId: string) {
  return `${window.location.origin}${resultPath(characterId)}`
}

export async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const input = document.createElement('textarea')
  input.value = text
  input.setAttribute('readonly', 'true')
  input.style.position = 'fixed'
  input.style.left = '-9999px'
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

export async function shareResult(character: Character) {
  const url = resultUrl(character.id)
  const title = `나는 ${character.name} | 회사생활.zip`
  const text = `회사에서 나는 ${character.name}! ${character.tagline}`

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return 'shared' as const
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'cancelled' as const
      }
    }
  }

  await copyText(url)
  return 'copied' as const
}
