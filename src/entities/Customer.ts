export type Customer = {
  id: string
  email: string
  name: string
  phone: string
  type: 'legal' | 'natural'
  document: string
  address: {
    number: number
    street: string
    neighborhood: string
    zipCode: string
    city: string
    state: string
  }
}
