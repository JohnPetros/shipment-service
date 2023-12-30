import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from './IDateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  convertToUtc(date: Date) {
    return dayjs(date).utc().local().format()
  }

  addDays(date: Date, days: number): Date {
    const currentDate = this.convertToUtc(date)

    return dayjs(currentDate).add(days, 'day').toDate()
  }

  addMinutes(date: Date, minutes: number): Date {
    const currentDate = this.convertToUtc(date)

    return dayjs(currentDate).add(minutes, 'minute').toDate()
  }
}
