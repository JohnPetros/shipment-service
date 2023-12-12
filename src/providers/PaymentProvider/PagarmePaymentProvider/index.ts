import { PagarmeTransactionRequest } from './types/PagarmeTransactionRequest'
import { PagarmeTransactionResponse } from './types/PagarmeTransactionResponse'
import { PagarmeCreditCardTransaction } from './types/PagarmeCreditCardTransactionResponse'
import { IPaymentProvider } from '../IPaymentProvider'

import { Customer } from '@entities/Customer'
import { Payment } from '@entities/Payment'
import { Product } from '@entities/Product'
import { Transaction, TransactionStatus } from '@entities/Transaction'

import { CreateCreditCardTransactionDTO } from '@modules/payment/dtos/CreateTransactionDTO'
import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'
import { IDateProvider } from '@providers/DateProvider/IDateProvider'

import { Console } from '@utils/Console'
import { envConfig } from '@configs/envConfig'
import { AppError } from '@utils/AppError'

const URL = envConfig.PAGAR_ME_API_URL
const SECRET_KEY = envConfig.PAGAR_ME_SECRET_KEY
const PUBLIC_KEY = envConfig.PAGAR_ME_PUBLIC_KEY

export class PagarMePaymentProvider implements IPaymentProvider {
  private api: IHttpClientProvider
  private date: IDateProvider
  private transationStatus: Record<string, TransactionStatus> = {
    paid: 'approved',
    failed: 'rejected',
    pending: 'pending',
    canceled: 'cancelled',
  }

  constructor(api: IHttpClientProvider, date: IDateProvider) {
    this.api = api
    this.date = date

    if (!URL) throw new AppError('Pagar.Me API URL must be provided')
    if (!SECRET_KEY || !PUBLIC_KEY)
      throw new AppError('Pagar.Me API KEYS must be provided')

    console.log({ PUBLIC_KEY })
    console.log({ SECRET_KEY })

    api.setBaseUrl(URL)
    api.setAuth('sk_test_18b2a5468876488387eec0e390708a50', '')
  }

  async createCreditCardTransaction({
    customer,
    products,
    creditCard,
  }: CreateCreditCardTransactionDTO): Promise<Transaction> {
    const expirationDateMonth = creditCard.expirationDate.slice(0, 2)
    const expirationDateYear = creditCard.expirationDate.slice(3)
    console.log({ expirationDateMonth })
    console.log({ expirationDateYear })

    const creditCardTransaction: PagarmeTransactionRequest = {
      customer: {
        email: customer.email,
        name: customer.name,
        document_type: customer.type === 'natural' ? 'cpf' : 'cnpj',
        document: customer.document,
        type: customer.type === 'natural' ? 'individual' : 'company',
        address: {
          line_1: `${customer.address.number}, ${customer.address.street},
          ${customer.address.neighborhood}`,
          number: customer.address.number.toString(),
          street: customer.address.street,
          neighborhood: customer.address.neighborhood,
          zip_code: customer.address.zipCode,
          city: customer.address.city,
          state: customer.address.state,
          country: 'BR',
        },
        phones: {
          mobile_phone: {
            country_code: '55',
            area_code: customer.phone.slice(0, 2),
            number: customer.phone,
          },
        },
      },
      payments: [
        {
          payment_method: 'credit_card',
          credit_card: {
            statement_descriptor: '',
            installments: 1,
            card: {
              cvv: creditCard.cvv,
              number: creditCard.number,
              holder_name: creditCard.holderName,
              exp_year: Number(expirationDateYear),
              exp_month: Number(expirationDateMonth),
              billing_address: {
                line_1: `${customer.address.number}, ${customer.address.street},
                ${customer.address.neighborhood}`,
                number: customer.address.number.toString(),
                street: customer.address.street,
                neighborhood: customer.address.neighborhood,
                zip_code: customer.address.zipCode,
                city: customer.address.city,
                state: customer.address.state,
                country: 'BR',
              },
            },
          },
        },
      ],
      items: products.map((product) => ({
        id: product.id,
        code: product.sku,
        quantity: product.quantity,
        description: product.name,
        amount: product.price * 100,
      })),
    }

    const response = await this.api.post<
      PagarmeTransactionResponse<PagarmeCreditCardTransaction>
    >('/orders', creditCardTransaction)

    new Console().log(response.status)

    return {
      status: this.transationStatus[response.status],
    }
  }

  getPayment(paymentId: string): Promise<Payment> {
    throw new AppError('Method not implemented.')
  }

  checkout(customer: Customer, products: Product[]): Promise<string> {
    throw new AppError('Method not implemented.')
  }

  handleApiError(apiError: unknown) {
    const console = new Console()
    const error = this.api.getResponseError(apiError)

    console.error({ error })
  }
}
