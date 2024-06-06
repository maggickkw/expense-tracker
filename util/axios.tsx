import axios from "axios";
import { ExpenseData, expenseItem } from "../data/types";

const URL = "https://react-native-demo-d215c-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData: ExpenseData) {
  const response = await axios.post(URL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function getExpenses() {
  const response = await axios.get(URL + "/expenses.json");

  const expenses = [];
  //  console.log(JSON.stringify(response.data, null, 3));
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    // console.log("expenseObj:" ,JSON.stringify(expenseObj,null,3))
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id: string | number, expenseData: ExpenseData) {
  return axios.put(URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpenses(id: string | number) {
  return axios.delete(URL + `/expenses/${id}.json`)
}
