import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import { useContext } from "react";
import { ExpenseEntriesContext } from "../store/context/ExpenseEntriesContext";
import ReoccuringEntry from "../components/ReoccuringEntries/ReoccuringEntry";
import { GlobalStyles } from "../constants/GlobalStyles";

const { height } = Dimensions.get("window");
/**
 * Returns a ReoccuringEntry component given an itemData object.
 * itemData contains the data for a single reoccuring payment.
 * @param {Object} itemData - Object containing data for a reoccuring payment.
 * @returns {Component} A ReoccuringEntry component.
 */
function renderReoccuringPaymentItem(itemData) {
  return <ReoccuringEntry itemData={itemData} />;
}
/**
 * A component that displays a list of reoccuring payments.
 *
 * It renders a FlatList and passes the reoccuringExpenses state from the
 * ExpenseEntriesContext to the FlatList. The renderItem prop is set to
 * renderReoccuringPaymentItem, which renders a ReoccuringEntry component for
 * each reoccuring payment item.
 *
 * @returns {Component} A component that renders a FlatList of reoccuring payments.
 */
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
  rootContainer: {
    paddingHorizontal: height * 0.025,
    paddingVertical: height * 0.02,
    flex: 1,
    backgroundColor: GlobalStyles.colors.backgroundMain,
  },
});
