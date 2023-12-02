export interface ICache {
  set(key: string, data: unknown): Promise<void>
  get<Data>(key: string): Promise<Data | null>
  delete(key: string): Promise<void>
}
