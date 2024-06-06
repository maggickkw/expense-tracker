import { createContext, useReducer } from "react";
import { dummyExpenses } from "../data/dummyData";
import { expenseItem, ExpenseData } from "../data/types";
import { generateRandomNumericId } from "../util";

const MIN_ID = 10000; // Minimum 5-digit number
const MAX_ID = 99999;

type ActionType =
  | { type: 'ADD'; payload: expenseItem }
  | { type: 'SET'; payload: expenseItem[] }
  | { type: 'UPDATE'; payload: { id: number | string; data: ExpenseData } }
  | { type: 'DELETE'; payload: number };


interface ExpensesContextType {
  expenses: expenseItem[];
  addExpense: (expenseData: expenseItem) => void;
  setExpenses: (expenses: expenseItem[]) => void;
  deleteExpense: (id: number) => void;
  updateExpense: (id: number, expenseData: ExpenseData) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

function expensesReducer(state: expenseItem[], action: ActionType): expenseItem[] {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload.reverse();
    case "UPDATE":
      const updatableIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: {children: React.ReactNode}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: expenseItem) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses: expenseItem[]) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id: number) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: number, expenseData: ExpenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value: ExpensesContextType = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
