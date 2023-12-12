import { Customer } from '@entities/Customer'

export const customerMock: Customer = {
  id: '123456789',
  email: 'cliente@example.com',
  name: 'Cliente Exemplo',
  phone: '123-456-7890',
  type: 'natural',
  document: '12345678901',
  address: {
    number: 42,
    street: 'Rua Ali peto',
    neighborhood: 'Bairro dos Índios',
    zipCode: '12345678',
    city: 'Cidade Fantasma',
    state: 'Estado de Ninguém',
  },
}
