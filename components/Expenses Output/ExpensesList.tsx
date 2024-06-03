import { FlatList, StyleSheet, Text, View } from 'react-native'
import { expenseItem } from '../../data/types';
import ExpenseItem from './ExpenseItem';

type ExpensesListProps = {
  expenses: expenseItem[];
  // expensesPeriod: string;
};


const renderItem = ({item}: {item: expenseItem}) => {
return <ExpenseItem {...item} />
}


const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return (
   <FlatList data={expenses} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
  )
}

export default ExpensesList

const styles = StyleSheet.create({})