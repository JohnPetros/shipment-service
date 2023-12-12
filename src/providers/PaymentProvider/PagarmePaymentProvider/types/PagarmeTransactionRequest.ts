export type PagarmeTransactionRequest = {
  items: {
    code: string
    amount: number
    description: string
    quantity: number
    category?: string
  }[]
  customer: {
    name: string
    email: string
    document: string
    type: string
    address: {
      street: string
      number: string
      zip_code: string
      neighborhood: string
      city: string
      state: string
      country: string
      complement?: string
      metadata?: {
        key0: string
        key1: string
        key2: string
      }
      line_1: string
      line_2?: string
    }
    metadata?: {
      key0: string
    }
    phones?: {
      home_phone?: {
        country_code: string
        number: string
        area_code: string
        Type?: string
      }
      mobile_phone: {
        country_code: string
        number: string
        area_code: string
        Type?: string
      }
    }
    code?: string
    gender?: string
    document_type: string
  }
  payments: {
    payment_method: string
    credit_card?: {
      installments: number
      statement_descriptor: string
      card: {
        number: string
        holder_name: string
        exp_month: number
        exp_year: number
        cvv: string
        billing_address: {
          street: string
          number: string
          zip_code: string
          neighborhood: string
          city: string
          state: string
          country: string
          complement?: string
          line_1: string
          line_2?: string
        }
      }
      card_id?: string
      card_token?: string
    }
    debit_card?: {
      statement_descriptor: string
      card: {
        number: string
        holder_name: string
        exp_month: number
        exp_year: number
        cvv: string
        billing_address: {
          street: string
          number: string
          zip_code: string
          neighborhood: string
          city: string
          state: string
          country: string
          complement?: string
          line_1: string
          line_2?: string
        }
      }
      card_id?: string
      card_token?: string
      recurrence?: boolean
    }
    boleto?: {
      bank: number
      due_at: Date
      document_number: string
      type: string
      instructions: string
    }
  }[]
}
