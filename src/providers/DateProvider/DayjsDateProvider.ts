import dayjs from 'dayjs'
import { IDateProvider } from './IDateProvider'

export class DayjsDateProvider implements IDateProvider {
  addDays(date: Date, days: number): Date {
    const currentDate = dayjs(date)
    return currentDate.add(days, 'day').toDate()
  }
}
