import { ICache } from '@cache/ICache'

export class InMemoryCache implements ICache {
  private cache: {
    [key in string]: string
  }[]

  constructor() {
    this.cache = []
  }

  async set(key: string, data: string): Promise<void> {
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
    this.cache.filter((record) => {
      return !(key in record)
    })
  }
}
