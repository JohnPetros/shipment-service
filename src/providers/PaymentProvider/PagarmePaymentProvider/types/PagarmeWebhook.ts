export interface PagarmeWebhook {
  id: string
  account: {
    id: string
    name: string
  }
  type: string
  created_at: string
  data: {
    id: string
    code: string
    amount: number
    currency: string
    closed: boolean
    items: {
      id: string
      description: string
      amount: number
      quantity: number
      status: string
      created_at: string
      updated_at: string
    }[]
    customer: {
      id: string
      name: string
      email: string
      document: string
      type: string
      delinquent: boolean
      created_at: string
      updated_at: string
      phones: Record<string, never>
    }
    shipping: {
      amount: number
      description: string
      address: {
        zip_code: string
        city: string
        state: string
        country: string
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
        type: string
        delinquent: boolean
        created_at: string
        updated_at: string
        phones: Record<string, never>
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
        acquirer_affiliation_code: string
        acquirer_tid: string
        acquirer_nsu: string
        acquirer_auth_code: string
        operation_type: string
        card: {
          id: string
          last_four_digits: string
          brand: string
          holder_name: string
          exp_month: number
          exp_year: number
          status: string
          created_at: string
          updated_at: string
          billing_address: {
            zip_code: string
            city: string
            state: string
            country: string
            line_1: string
          }
          type: string
        }
        created_at: string
        updated_at: string
        gateway_response: {
          code: string
        }
      }
    }[]
  }
}
