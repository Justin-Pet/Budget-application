import ExpenseEntriesContextProvider, {
  ExpenseEntriesContext,
} from "../store/context/ExpenseEntriesContext";

import { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";
import { useLanguage } from "../store/context/LanguageContext";

const { height } = Dimensions.get("window");

function WalletDashboard() {
  const { translate } = useLanguage();
  const expenseEntriesCtx = useContext(ExpenseEntriesContext);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.walletHeader}>
        {translate("CurrentWalletBalance")}
      </Text>
      <View style={styles.walletContainer}>
        <Text style={styles.walletText}>{translate("wallet")}</Text>
        <Text style={styles.amount}>
          {"\u20AC"}
          {expenseEntriesCtx.wallet}
        </Text>
      </View>
      <View style={styles.walletContainer}>
        <Text style={styles.walletText}>{translate("bankWallet")}</Text>
        <Text style={styles.amount}>
          {"\u20AC"}
          {expenseEntriesCtx.bankWallet}
        </Text>
      </View>
    </View>
  );
}

export default WalletDashboard;

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: height * 0.018,
  },
  walletContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    borderBottomWidth: height * 0.001,
    borderStyle: "dotted",
    borderBottomColor: GlobalStyles.colors.accentColor,
    marginVertical: height * 0.01,
  },
  walletText: {
    fontSize: height * 0.02,
    color: GlobalStyles.colors.headerColor,
    fontWeight: "bold",
  },
  amount: {
    fontWeight: "bold",
    fontSize: height * 0.023,
    color: GlobalStyles.colors.accentColor,
  },
  walletHeader: {
    color: GlobalStyles.colors.headerColor,
    fontSize: height * 0.025,
    fontWeight: "bold",
    marginVertical: height * 0.01,
  },
});
