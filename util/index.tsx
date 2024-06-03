export function getDateMinusDays(date: Date, days: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() - days);
    return newDate;
}

export function generateRandomNumericId(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
