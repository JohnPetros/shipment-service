import 'dayjs/locale/pt-br'
import dayjs, { Dayjs } from 'dayjs'

import { IDateProvider } from './IDateProvider'

export class DayjsDateProvider implements IDateProvider {
  private convertToSaoPauloTimeZone(date: Date): Dayjs {
    return dayjs(date).subtract(3, 'hour')
  }

  addDays(date: Date, days: number): Date {
    const currentDate = this.convertToSaoPauloTimeZone(date)
    return currentDate.add(days, 'day').toDate()
  }

  addMinutes(date: Date, minutes: number): Date {
    const currentDate = this.convertToSaoPauloTimeZone(date)

    return currentDate.add(15, 'minute').toDate()
  }
}
