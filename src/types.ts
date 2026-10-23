export type Choice = 'A' | 'B'
export type Axis = 'PI' | 'TF' | 'AC' | 'RE'
export type TraitCode = `${'P' | 'I'}${'T' | 'F'}${'A' | 'C'}${'R' | 'E'}`

export interface Question {
  id: string
  number: number
  text: string
  optionA: string
  optionB: string
  axis: Axis
}

export interface Character {
  id: string
  name: string
  traitCode: TraitCode
  tagline: string
  quote: string
  description: string
  workStyle: string
  strengths: string[]
  cautions: string[]
  partnerId: string
  oppositeId: string
  image: string
}
