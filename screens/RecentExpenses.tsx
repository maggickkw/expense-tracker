import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util";
import { getExpenses } from "../util/axios";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpenses() {
    const expenses = await getExpenses();
    expensesCtx.setExpenses(expenses)
    }
    fetchExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="You have registered no expenses in the last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
