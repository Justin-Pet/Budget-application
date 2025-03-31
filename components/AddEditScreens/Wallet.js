import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { useLanguage } from "../../store/context/LanguageContext";
import { ExpenseEntriesContext } from "../../store/context/ExpenseEntriesContext";

function Wallet() {
  const expensesCtx = useContext(ExpenseEntriesContext);

  const { translate } = useLanguage();

  return (
    <View style={styles.rootContainer}>
      
          <View style={styles.walletElementContainer}>
            <Text style={styles.walletText}>{translate("WalletBalance")}</Text>
            <Text style={styles.walletAmount}>{"\u20AC"}{expensesCtx.wallet.toFixed(2)}</Text>
          </View>
    
          
  
    </View>
    
  );
}

export default Wallet;

const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: 15,
  },

  walletElementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 75,
  },
  walletText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  walletAmount: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
