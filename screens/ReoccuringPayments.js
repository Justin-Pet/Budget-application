import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import ExpenseEntriesContextProvider, {
  ExpenseEntriesContext,
} from "../store/context/ExpenseEntriesContext";
import ReoccuringEntry from "../components/ReoccuringEntries/ReoccuringEntry";
import { GlobalStyles } from "../constants/GlobalStyles";

function renderReoccuringPaymentItem(itemData) {
  return <ReoccuringEntry itemData={itemData} />;
}
function ReoccuringPayments() {
  const expensesCtx = useContext(ExpenseEntriesContext);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={expensesCtx.reoccuringExpenses}
        renderItem={renderReoccuringPaymentItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ReoccuringPayments;

const styles = StyleSheet.create({

  rootContainer:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex:1,
    backgroundColor: GlobalStyles.colors.backgroundMain
  }
})