export interface IDateProvider {
  addDays(date: Date, days: number): Date
  addMinutes(date: Date, minutes: number): Date
}
