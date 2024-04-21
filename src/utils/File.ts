import fs from 'node:fs'
import path from 'node:path'
import { AppError } from './AppError'

export class File {
  folder: string
  fileName: string

  constructor(folder: string, fileName: string) {
    this.folder = folder
    this.fileName = fileName
  }

  getPath() {
    return path.resolve(this.folder, this.fileName)
  }

  async checkFileExists() {
    const isFileExists = fs.existsSync(this.getPath())
    if (!isFileExists) throw new AppError('File does not exist', 500)
  }

  read() {
    return fs.readFileSync(this.getPath())
  }

  async convertToBase64() {
    this.checkFileExists()

    const binaryData = fs.readFileSync(this.getPath())

    return Buffer.from(binaryData).toString('base64')
  }

  async delete() {
    const isFileExists = this.checkFileExists()
    if (!isFileExists) throw new AppError('File does not exist', 500)

    try {
      await fs.promises.unlink(this.getPath())
    } catch (error) {
      throw new AppError('Failed to delete file', 500)
    }
  }
}
