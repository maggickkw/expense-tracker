import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const expenses = expensesCtx.expenses || [];
  return <ExpensesOutput expenses={expenses} expensesPeriod="Total" fallbackText="No expenses found" />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
