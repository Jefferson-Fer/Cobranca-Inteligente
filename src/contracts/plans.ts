export type Plans = {
  title: string
  description: string
  value: number
  ticket: {
    value: number
    description: string
  }
  card_credit: {
    value: number
    description: string
  }
  analitycs: string | null
  pix: {
    value: number
    description: string
  } | null
  invoice: string | null
}
