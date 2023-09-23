type question = {
  title: string
  promo: string
  fullquestion: string
  answer: string
  tags: string[]
  answered: boolean
  id: string
}

type Mode = "search" | "browse"

type tag = {
  name: string
  id: string
  description: string
  image_url: string
}
