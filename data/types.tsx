export interface expenseItem {
    id: string | number;
    description: string;
    amount: number;
    date: Date;

}


export type ExpenseData = Omit<expenseItem, 'id'>;



export interface FullExpenseItem extends ExpenseData {
    id: string | number;
  }