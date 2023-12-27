import { PagarmeTransactionRequest } from './types/PagarmeTransactionRequest'
import { PagarmeTransactionResponse } from './types/PagarmeTransactionResponse'
import { PagarmeCreditCardTransaction } from './types/PagarmeCreditCardTransactionResponse'
import { PagarmeBoletoTransaction } from './types/PagarmeBoletoTransaction'
import { IPaymentProvider } from '../IPaymentProvider'

import { envConfig } from '@configs/envConfig'

import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { Transaction, TransactionStatus } from '@entities/Transaction'

import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'
import { IDateProvider } from '@providers/DateProvider/IDateProvider'

import { Console } from '@utils/Console'
import { AppError } from '@utils/AppError'
import { CreateTransactionDTO } from '@modules/payment/dtos/CreateTransactionDTO'
import crypto from 'node:crypto'
import { PagarmePixTransaction } from './types/PagarmePixTransaction'
import { QRCode } from '@utils/QRCode'
import { File } from '@utils/File'
import { fileConfig } from '@configs/fileConfig'

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

    api.setBaseUrl(URL)
    api.setAuth('sk_test_18b2a5468876488387eec0e390708a50', '')
  }

  private getTransactionItems(products: Product[]) {
    return products.map((product) => ({
      id: product.id,
      code: product.sku,
      quantity: product.quantity,
      description: product.name,
      amount: product.price * 100,
    }))
  }

  private formatCustomer(customer: Customer) {
    return {
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
    }
  }

  async createTicketTransaction({
    customer,
    products,
    shipmentService,
  }: CreateTransactionDTO): Promise<Transaction> {
    const formatedCustomer = this.formatCustomer(customer)
    const items = this.getTransactionItems(products)
    const documentNumber = crypto.randomUUID().slice(0, 16)

    const ticketTransaction: PagarmeTransactionRequest = {
      customer: formatedCustomer,
      shipping: {
        amount: Number(shipmentService.price) * 100,
        description: shipmentService.name,
        recipient_name: formatedCustomer.name,
        recipient_phone: formatedCustomer.phones.mobile_phone.number,
        address: {
          country: 'BR',
          state: formatedCustomer.address.state,
          city: formatedCustomer.address.city,
          zip_code: formatedCustomer.address.zip_code,
          line_1: formatedCustomer.address.line_1,
          street: formatedCustomer.address.street,
        },
      },
      payments: [
        {
          payment_method: 'boleto',
          boleto: {
            bank: '033',
            instructions: 'Pagar até o vencimento em 3 dias.',
            due_at: this.date.addDays(new Date(), 3),
            document_number: documentNumber,
            type: 'DM',
          },
        },
      ],
      items,
    }

    const response = await this.api.post<
      PagarmeTransactionResponse<PagarmeBoletoTransaction>
    >('/orders', ticketTransaction)

    if (
      !response.charges[0].last_transaction.success ||
      response.charges[0].last_transaction.status !== 'generated'
    ) {
      throw new AppError('Failed to generate ticket')
    }

    new Console().log(response.charges[0].last_transaction)

    const qrcode = new QRCode()

    const code = await qrcode.decode(
      response.charges[0].last_transaction.qr_code,
    )

    const file = new File(fileConfig.FOLDERS.TMP, `${documentNumber}.pdf`)

    await file.downloadFromRemoteUrl(
      'https://www.africau.edu/images/default/sample.pdf',
    )

    const pdf = await file.convertToBase64()

    await file.delete()

    return {
      status: this.transationStatus[response.status],
      qrCode: response.charges[0].last_transaction.qr_code,
      code,
      pdf,
    }
  }

  async createCreditCardTransaction({
    customer,
    products,
    cardToken,
    shipmentService,
  }: CreateTransactionDTO): Promise<Transaction> {
    const formatedCustomer = this.formatCustomer(customer)
    const items = this.getTransactionItems(products)

    const creditCardTransaction: PagarmeTransactionRequest = {
      customer: formatedCustomer,
      shipping: {
        amount: Number(shipmentService.price) * 100,
        description: shipmentService.name,
        recipient_name: formatedCustomer.name,
        recipient_phone: formatedCustomer.phones.mobile_phone.number,
        address: {
          country: 'BR',
          state: formatedCustomer.address.state,
          zip_code: formatedCustomer.address.zip_code,
          line_1: formatedCustomer.address.line_1,
          street: formatedCustomer.address.street,
          city: formatedCustomer.address.city,
        },
      },
      payments: [
        {
          payment_method: 'credit_card',
          credit_card: {
            card_token: cardToken,
            installments: 1,
            card: {
              billing_address: {
                country: 'BR',
                state: formatedCustomer.address.state,
                city: formatedCustomer.address.city,
                zip_code: formatedCustomer.address.zip_code,
                line_1: `${formatedCustomer.address.number}, ${formatedCustomer.address.street},
                ${formatedCustomer.address.neighborhood}`,
              },
            },
          },
        },
      ],
      items,
    }

    const response = await this.api.post<
      PagarmeTransactionResponse<PagarmeCreditCardTransaction>
    >('/orders', creditCardTransaction)

    return {
      status: this.transationStatus[response.status],
    }
  }

  async createPixTransaction({
    customer,
    products,
    shipmentService,
  }: Omit<CreateTransactionDTO, 'paymentMethod'>): Promise<Transaction> {
    const formatedCustomer = this.formatCustomer(customer)
    const items = this.getTransactionItems(products)

    const pixTransaction: PagarmeTransactionRequest = {
      customer: formatedCustomer,
      shipping: {
        amount: shipmentService.price * 100,
        description: shipmentService.name,
        recipient_name: formatedCustomer.name,
        recipient_phone: formatedCustomer.phones.mobile_phone.number,
        address: {
          country: 'BR',
          state: formatedCustomer.address.state,
          zip_code: formatedCustomer.address.zip_code,
          city: formatedCustomer.address.city,
          line_1: formatedCustomer.address.line_1,
          street: formatedCustomer.address.street,
        },
      },
      payments: [
        {
          payment_method: 'pix',
          pix: {
            expires_in: String(60 * 60 * 30), // 15 minutes
          },
        },
      ],
      items,
    }

    const response = await this.api.post<
      PagarmeTransactionResponse<PagarmePixTransaction>
    >('/orders', pixTransaction)

    const qrcode = new QRCode()

    const code = await qrcode.decode(
      response.charges[0].last_transaction.qr_code_url,
    )

    // new Console().log(response.charges[0].last_transaction)

    return {
      status: this.transationStatus[response.status],
      qrCode: response.charges[0].last_transaction.qr_code_url,
      code,
      expires_at: response.charges[0].last_transaction.expires_at,
    }
  }

  handleApiError(apiError: unknown) {
    const console = new Console()
    const error = this.api.getResponseError<{
      message: string
      statusCode: number
    }>(apiError)

    console.error({ error })

    if (error.message && error.statusCode) {
      throw new AppError(error.message, error.statusCode)
    } else {
      throw new AppError(String(error), 500)
    }
  }
}
