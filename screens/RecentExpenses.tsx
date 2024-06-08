import { StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util";
import { getExpenses } from "../util/axios";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpenses() {
    setLoading(true);
    try{
      const expenses = await getExpenses();
      expensesCtx.setExpenses(expenses)
    } catch(error) {
      setError('Could not fetch expenses');
    }
    setLoading(false);

    }
    fetchExpenses();
  }, []);

  const pressHandler = () => {
    setError('')
  }

  if (error && !loading){
    return <ErrorOverlay message={error} pressHandler={pressHandler} />
  }

  if (loading) {
    return <LoadingOverlay />
  }

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
