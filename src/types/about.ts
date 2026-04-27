
export interface Pillar {
  title: string
  description: string
}

export interface AboutData {
  mission: string
  pillars: Pillar[]
  tags: string[]
}

export interface AboutClientProps {
  data: AboutData
}
