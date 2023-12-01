import { melhorEnvioApiMock } from '@providers/ShipmentProvider/mocks/MelhorEnvioApiMock'
import { setupServer } from 'msw/node'
 
export const apiServerMock = setupServer(
 ...melhorEnvioApiMock
)