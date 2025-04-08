import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { useContext, useState } from "react";
import ExpenseEntriesContextProvider, {
  ExpenseEntriesContext,
} from "../store/context/ExpenseEntriesContext";
import ReoccuringEntry from "../components/ReoccuringEntries/ReoccuringEntry";
import { GlobalStyles } from "../constants/GlobalStyles";


const { width, height } = Dimensions.get("window");
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
    paddingHorizontal: height * 0.025,
    paddingVertical: height * 0.02,
    flex:1,
    backgroundColor: GlobalStyles.colors.backgroundMain
  }
})