import { StyleSheet, Text, View } from "react-native";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

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

  // console.log(isEdited);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpense = () => {
    expensesCtx?.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      console.log(editedExpenseId)
      expensesCtx?.updateExpense(editedExpenseId, {
        description: "lorem3 10",
        amount: 19.99,
        date: new Date("2024-06-01"),
      });
    } else {
      expensesCtx?.addExpense({
        description: "lorem3 10",
        amount: 19.99,
        date: new Date("2024-06-01"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button style={styles.buttonStyle} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary800,
    alignItems: "center",
  },
});
