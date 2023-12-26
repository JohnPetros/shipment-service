export type PagarmeWebhook = {
  id: string
  code: string
  amount: number
  currency: string
  closed: boolean
  items: {
    id: string
    type: string
    description: string
    amount: number
    quantity: number
    status: string
    created_at: string
    updated_at: string
    code: string
  }[]
  customer: {
    id: string
    name: string
    email: string
    document: string
    document_type: string
    type: string
    delinquent: boolean
    address: {
      id: string
      line_1: string
      street: string
      number: string
      zip_code: string
      neighborhood: string
      city: string
      state: string
      country: string
      status: string
      created_at: string
      updated_at: string
    }
    created_at: string
    updated_at: string
    phones: {
      mobile_phone: {
        country_code: string
        number: string
        area_code: string
      }
    }
  }
  shipping: {
    amount: number
    description: string
    recipient_name: string
    recipient_phone: string
    address: {
      street: string
      city: string
      state: string
      country: string
      zip_code: string
      line_1: string
    }
  }
  status: string
  created_at: string
  updated_at: string
  closed_at: string
  charges: {
    id: string
    code: string
    gateway_id: string
    amount: number
    paid_amount: number
    status: string
    currency: string
    payment_method: string
    paid_at: string
    created_at: string
    updated_at: string
    customer: {
      id: string
      name: string
      email: string
      document: string
      document_type: string
      type: string
      delinquent: boolean
      address: {
        id: string
        line_1: string
        street: string
        number: string
        zip_code: string
        neighborhood: string
        city: string
        state: string
        country: string
        status: string
        created_at: string
        updated_at: string
      }
      created_at: string
      updated_at: string
      phones: {
        mobile_phone: {
          country_code: string
          number: string
          area_code: string
        }
      }
    }
    last_transaction: {
      id: string
      transaction_type: string
      gateway_id: string
      amount: number
      status: string
      success: boolean
      installments: number
      acquirer_name: string
      acquirer_tid: string
      acquirer_nsu: string
      acquirer_auth_code: string
      acquirer_message: string
      acquirer_return_code: string
      operation_type: string
      card: {
        id: string
        first_six_digits: string
        last_four_digits: string
        brand: string
        holder_name: string
        exp_month: number
        exp_year: number
        status: string
        type: string
        created_at: string
        updated_at: string
        billing_address: {
          street: string
          number: string
          zip_code: string
          neighborhood: string
          city: string
          state: string
          country: string
          line_1: string
        }
      }
      funding_source: string
      created_at: string
      updated_at: string
      gateway_response: {
        code: string
        errors: string[]
      }
      antifraud_response: {
        status: string
        score: string
        provider_name: string
      }
      metadata: []
    }
  }[]
  checkouts: []
}
