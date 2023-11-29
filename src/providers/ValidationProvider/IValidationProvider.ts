import { IEnvConfig } from '../../configs/interfaces/IEnvConfig'

export interface IValidationProvider {
  validateEnvConfig({ PORT, NODE_ENV }: IEnvConfig): void
}
