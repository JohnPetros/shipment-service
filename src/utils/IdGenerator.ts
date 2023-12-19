import { randomUUID } from 'node:crypto'
import UUIDINT from 'uuid-int'

export class IdGenerator {
  uuidString() {
    return randomUUID()
  }

  uuidNumber(length: number) {
    const uuidInt = UUIDINT(length)

    return uuidInt.uuid()
  }
}
