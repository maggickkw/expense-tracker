export function getDateMinusDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export function generateRandomNumericId(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getFormattedDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
