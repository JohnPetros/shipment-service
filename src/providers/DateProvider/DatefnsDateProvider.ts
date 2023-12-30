import { addDays, addMinutes } from 'date-fns'

import { IDateProvider } from './IDateProvider'

export class DateFnsDateProvider implements IDateProvider {
  addDays(date: Date, days: number): Date {
    return addDays(date, days)
  }

  addMinutes(date: Date, minutes: number): Date {
    return addMinutes(date, minutes)
  }
}
