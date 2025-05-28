import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Dimensions,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { GlobalStyles } from "../constants/GlobalStyles";

import CategoriesPart from "../components/AddEditScreens/CategoriesPart";
import { useContext } from "react";
import { ExpenseEntriesContext } from "../store/context/ExpenseEntriesContext";

import AddEditAmount from "../components/AddEditScreens/AddEditAmount";
import AddEditComments from "../components/AddEditScreens/AddEditComments";
import PrimaryButton from "../components/AddEditScreens/PrimaryButton";

import { useLanguage } from "../store/context/LanguageContext";

import DatePicker from "../components/AddEditScreens/DatePicker";
import WalletSelector from "../components/AddEditScreens/WalletSelector";
import ReoccuringPaymentSelector from "../components/AddEditScreens/ReoccuringPaymentSelector";

const { height } = Dimensions.get("window");
/**
 * Component responsible for adding a new expense. It allows users to input
 * details such as category, amount, comment, date, type, and whether the 
 * expense is reoccurring. It interacts with the `ExpenseEntriesContext` to 
 * store the expense data and update the current wallet balance accordingly.
 * The component also utilizes a `WalletSelector` to select the current wallet
 * and a `ReoccuringPaymentSelector` for reoccurring expenses. Once the expense
 * is added, it navigates to the Summary screen in the BottomTabs.
 *
 * @param {object} route - The route object containing navigation parameters.
 * @param {object} navigation - The navigation object for screen transitions.
 */

function AddExpense({ route, navigation }) {
  const navigator = useNavigation();
  const { translate } = useLanguage();
  const expenseCtx = useContext(ExpenseEntriesContext);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("expense");
  const [currentWallet, setCurrentWallet] = useState();
  const [reoccuringPayment, setReoccuringPayment] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <WalletSelector
          currentWallet={currentWallet}
          setCurrentWallet={setCurrentWallet}
        />
      ),
    });
  }, [navigation]);

  /**
   * Adds a new expense to the store, either as a reoccurring or single expense.
   * It checks for empty category or amount fields and shows an alert in such case.
   * If the expense is reoccurring, it calls `addReoccuringExpense` on the context.
   * If not, it calls `addExpense` and also updates the current wallet balance.
   * Finally, it navigates to the Summary screen in the BottomTabs.
   */
  function addExpenseToStore() {
    if (reoccuringPayment) {
      if (category === "" || amount === "") {
        return alert("Please enter a category and amount");
      } else {
        expenseCtx.addReoccuringExpense(
          category,
          date,
          parseFloat(amount),
          comment,
          type,
          currentWallet
        );
      }
    } else {
      if (category === "" || amount === "") {
        return alert(translate("DataEntryError"));
      } else {
        if (type === "expense") {
          expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
        } else {
          expenseCtx.addWallet(parseFloat(amount), currentWallet);
        }
        expenseCtx.addExpense(
          category,
          date,
          parseFloat(amount),
          comment,
          type,
          currentWallet
        );
      }
    }

    // Navigate back to the BottomTabs and then to the Summary screen
    navigator.navigate("BottomTabs", { screen: "Summary" });
  }
  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <View style={styles.rootContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.amountAndCategoryContainer}>
            <AddEditAmount
              amount={amount}
              setAmount={setAmount}
              amountFocus={true}
            />

            <View style={styles.categoryContainer}>
              <CategoriesPart
                category={category}
                setCategory={setCategory}
                type={type}
                setType={setType}
              />
            </View>
          </View>
          <View style={styles.commentsAndDateContainer}>
            <DatePicker date={date} setDate={setDate} />
            <AddEditComments comment={comment} setComment={setComment} />
            <ReoccuringPaymentSelector
              reoccuringPayment={reoccuringPayment}
              setReoccuringPayment={setReoccuringPayment}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            buttonText={translate("addExpense")}
            onPress={addExpenseToStore}
            buttonColor={{ backgroundColor: GlobalStyles.colors.button }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default AddExpense;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,

    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.backgroundMain,
  },
  detailsContainer: {
    flex: 1,

    justifyContent: "space-between",
    alignItems: "center",
  },
  amountAndCategoryContainer: {
    alignItems: "center",
    width: "100%",
  },

  commentsAndDateContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: height * 0.03,
  },

  categoryContainer: {
    width: "100%",
  },
});
