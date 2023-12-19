import { DownloaderHelper } from 'node-downloader-helper'
import { AppError } from './AppError'
import fs from 'node:fs'
import path from 'node:path'

export class File {
  folder: string
  fileName: string

  constructor(folder: string, fileName: string) {
    this.folder = folder
    this.fileName = fileName
  }

  async downloadFromRemoteUrl(url: string) {
    const isFileExists = await this.checkFileExists()
    if (isFileExists) throw new AppError('File already exists', 500)

    await new Promise((resolve, reject) => {
      const download = new DownloaderHelper(url, this.folder, {
        fileName: this.fileName,
      })
      download.on('end', resolve)
      download.on('error', reject)
      download.start()
    })
  }

  async checkFileExists() {
    return fs.existsSync(path.resolve(this.folder, this.fileName))
  }

  async convertToBase64() {
    const isFileExists = await this.checkFileExists()
    if (!isFileExists) throw new AppError('File does not exist', 500)

    const binaryData = fs.readFileSync(path.resolve(this.folder, this.fileName))

    return Buffer.from(binaryData).toString('base64')
  }

  async delete() {
    const isFileExists = this.checkFileExists()
    if (!isFileExists) throw new AppError('File does not exist', 500)

    try {
      await fs.promises.unlink(path.resolve(this.folder, this.fileName))
    } catch (error) {
      throw new AppError('Failed to delete file', 500)
    }
  }
}
