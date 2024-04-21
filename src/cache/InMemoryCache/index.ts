import { ICache } from '@cache/ICache'

export class InMemoryCache implements ICache {
  private cache: {
    [key in string]: string
  }[]

  constructor() {
    this.cache = []
  }

  private hasKey(key: string) {
    return this.cache.some((object) => key in object)
  }

  async set(key: string, data: string): Promise<void> {
    if (this.hasKey(key)) {
      this.delete(key)
    }

    this.cache.push({ [key]: data })
  }

  async get(key: string): Promise<string | null> {
    const record = this.cache.find((record) => {
      return key in record
    })

    if (record) {
      return record[key]
    }

    return null
  }

  async delete(key: string): Promise<void> {
    this.cache = this.cache.filter((record) => {
      return !(key in record)
    })
  }
}
