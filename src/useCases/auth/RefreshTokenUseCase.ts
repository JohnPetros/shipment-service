import { IShipmentProvider } from '../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../utils/AppError'

export class RefreshTokenUseCase {
  private shippmentProvider: IShipmentProvider

  constructor(shippmentProvider: IShipmentProvider) {
    this.shippmentProvider = shippmentProvider
  }

  async execute(refreshToken: string) {
    if (!refreshToken) throw new AppError('Invalid refresh token', 401)

    console.log({ refreshToken })

    // "def5020030f59597e5d8309cde37393cbcd05545629f16b1b591d3c665ddbd002fb668b1bd4e247e5466df874631cec848f6c6b5ecb86d58df3af2a711f28ef5b53d1cb156946232ed0482ebbda40edafdcfa43483885e3b538810a924316ab900e2a69473d2ee97c2319d6b54dbf1a06db09e9715fa0ed01a8d14e4285b7db18237ca7a98f8a58e61ff13dce228bd9b0740e7d1c06172ca6fe0e41745ede9e409d1860cbdfab75b2515a182eecbfb4af1e40574095d6351c7d674e8f3a53741cd68a7f7cb87b1ce7d602da75d46523526623a65855a86b0ba946f347f364a7ca7f80381e3565989ff1bcb85b7c78fdc9ff3000fb6e3a0187f3d93df42f21670c2436445b596cc3fb4e819cc54ee4444ff0f4165a44815b349f04ee5eb0f0be9589fdda79695b93e6f3400e24505e9ac64f12e8e89e13d61ec0b8edac2d3c53f0aed6d86890b7ee7d7a07f2f1c32a81f40bdbcf705cc6b45fc253ea292408b26d8e1e1d3854e4790bed46e6b0720dbe77a69756bdaa830c4d9730f57eb30d0ae3c02d1620b492c8d43f3cecac60c0a30e36001130a0219fea1daf369fb"

    throw new AppError('Invalid refresh token', 401)

    try {
      return await this.shippmentProvider.refreshToken(refreshToken)
    } catch (error) {
      console.error(error)
      this.shippmentProvider.handleApiError(error)
      throw new AppError('Failed to refresh token', 500)
    }
  }
}
