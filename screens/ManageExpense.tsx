import { StyleSheet, View } from "react-native";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpenseData } from "../data/types";
import { deleteExpenses, storeExpense, updateExpense } from "../util/axios";

const ManageExpense = ({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, "ManageExpense">;
  navigation: NavigationProp<RootStackParamList>;
}) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense: ExpenseData | undefined  = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpense = async () => {
    await deleteExpenses(editedExpenseId);
    expensesCtx?.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: ExpenseData) => {
    if (isEditing) {
      expensesCtx?.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId ,expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx?.addExpense({ ...expenseData, id });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        cancelHandler={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        submitHandler={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary800,
    alignItems: "center",
  },
});
