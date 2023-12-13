import jimp from 'jimp'
import jsQR from 'jsqr'
import { AppError } from './AppError'

export class QRCode {
  async decode(path: string) {
    const image = await jimp.read(path)

    const decodedQR = jsQR(
      image.bitmap.data as unknown as Uint8ClampedArray,
      image.bitmap.width,
      image.bitmap.height,
    )

    if (!decodedQR?.data) {
      throw new AppError('QR code not found in the image.')
    }

    return decodedQR.data
  }
}
