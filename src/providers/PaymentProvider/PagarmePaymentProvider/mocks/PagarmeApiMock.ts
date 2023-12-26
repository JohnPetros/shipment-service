import { envConfig } from '@configs/envConfig'
import { jwtMock } from '@entities/mocks/jwtMock'
import { http, HttpResponse } from 'msw'
import { shipmentServiceMock } from '@entities/mocks/shipmentServiceMock'
import { PagarmeTransactionResponse } from '../types/PagarmeTransactionResponse'
import { PagarmeBoletoTransaction } from '../types/PagarmeBoletoTransaction'
import { PagarmePixTransaction } from '../types/PagarmePixTransaction'
import { PagarmeCreditCardTransaction } from '../types/PagarmeCreditCardTransactionResponse'

import { setupServer } from 'msw/node'

export const pagarmeApiMock = setupServer()
