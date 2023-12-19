export type OrderStatus =
  | 'paid'
  | 'created'
  | 'cancelled'
  | 'refused'
  | 'authorized'
  | 'delivered'
  | 'waiting_payment'

export type Order = {
  status: OrderStatus
  number: number
  customer_id: string
  value_products: number
  value_shipment: number
  value_discount: number
  value_total: number
  shipment_service: string
  days_delivery: number
  address: {
    id: string
    receiver: string
    zipcode: string
    street: string
    number: string
    neighborhood: string
    complement?: string
    city: string
    uf: string
  }
  items: {
    product_id: string
    sku_id: string
    quantity: number
    price: number
  }[]
  transactions?: {
    customer_id: string
    amount: number
    installments: number
    status: OrderStatus
    holder_name: string
    holder_document: string
    authorized_at: string
    billet_url?: string
  }[]
}
