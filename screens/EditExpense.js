import PrimaryButton from "../components/AddEditScreens/PrimaryButton";
import AddEditAmount from "../components/AddEditScreens/AddEditAmount";
import AddEditComments from "../components/AddEditScreens/AddEditComments";
import CategoriesPart from "../components/AddEditScreens/CategoriesPart";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { GlobalStyles } from "../constants/GlobalStyles";
import { ExpenseEntriesContext } from "../store/context/ExpenseEntriesContext";
import { useLanguage } from "../store/context/LanguageContext";
import DatePicker from "../components/AddEditScreens/DatePicker";

const { width, height } = Dimensions.get("window");
/**
 * Component responsible for editing an expense. It allows users to input
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
function EditExpense({ route, navigation }) {
  const { translate } = useLanguage();
  const expenseCtx = useContext(ExpenseEntriesContext);
  const navigator = useNavigation();

  const id = route.params.id;
  // const itemData = route.params.itemData;
  const [amount, setAmount] = useState(route.params.amount);
  const [category, setCategory] = useState(route.params.description);
  const [comment, setComment] = useState(route.params.comment);

  const [date, setDate] = useState(new Date(route.params.date));
  const [type, setType] = useState(route.params.type);
  const [currentWallet, setCurrentWallet] = useState(route.params.wallet);

  const originalAmount = route.params.amount;
  const originalType = route.params.type;

  /**
   * Updates an expense in the list of expenses based on the given ID.
   * If the validation passes, it will update the expense's data and update
   * the current wallet balance accordingly. If the expense type changes,
   * it will do the type change accordingly. If the expense is reoccurring,
   * it will call `updateReoccuringExpense` on the context.
   * Finally, it navigates to the Summary screen in the BottomTabs.
   */
  function updateExpense() {
    if (amount === "" || category === "") {
      return alert("Please enter a category and amount");
    } else {
      if (originalType === type) {
        if (type === "expense") {
          expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
          expenseCtx.addWallet(parseFloat(originalAmount), currentWallet);
        } else {
          expenseCtx.addWallet(parseFloat(amount), currentWallet);
          expenseCtx.subtractWallet(parseFloat(originalAmount), currentWallet);
        }
      } else if (originalType !== type) {
        if (type === "expense") {
          expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
          expenseCtx.subtractWallet(parseFloat(originalAmount), currentWallet);
        } else {
          expenseCtx.addWallet(parseFloat(amount), currentWallet);
          expenseCtx.addWallet(parseFloat(originalAmount), currentWallet);
        }
      }

      expenseCtx.updateExpense(
        id,
        amount,
        category,
        date,
        comment,
        type,
        currentWallet
      );
      navigator.navigate("BottomTabs", { screen: "Summary" });
    }
  }

  /**
   * Deletes an expense from the store. If the type is "expense", it adds the amount
   * back to the current wallet. If the type is "income", it subtracts the amount
   * from the current wallet. It then calls `deleteExpense` on the context and
   * navigates to the Summary screen in the BottomTabs.
   */

  /**
   * Deletes an expense from the store. If the type is "expense", it adds the amount
   * back to the current wallet. If the type is "income", it subtracts the amount
   * from the current wallet. It then calls `deleteExpense` on the context and
   * navigates to the Summary screen in the BottomTabs.
   */
  function deleteExpense() {
    if (type === "expense") {
      expenseCtx.addWallet(parseFloat(amount), currentWallet);
    } else {
      expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
    }
    expenseCtx.deleteExpense(id);
    navigator.navigate("BottomTabs", { screen: "Summary" });
  }

  /**
   * Updates the header of the screen with a "Save" button that calls the
   * `updateExpense` function when pressed.
   */
  useEffect(() => {
    navigation.setOptions({
      /**
       * Returns a Pressable component that serves as a "Save" button in the header.
       * When pressed, it triggers the `updateExpense` function. The button text is
       * displayed using the translated string for "save". The button's appearance
       * changes when pressed, applying the `onPress` style.
       */

      headerRight: () => (
        <Pressable
          onPress={updateExpense}
          style={({ pressed }) => pressed && styles.onPress}
        >
          <Text style={styles.headerText}>{translate("save")}</Text>
        </Pressable>
      ),
    });
  }, [navigation, updateExpense]);
  /**
   * Returns the translated string of the current wallet. If the current wallet is
   * "wallet" or 1, it returns the translated string for "Cash". Otherwise, it
   * returns the translated string for "Bank".
   *
   * @returns {string} The translated string of the current wallet.
   */
  function getCurrentWallet() {
    if (currentWallet == "wallet" || currentWallet == 1) {
      return translate("Cash");
    } else {
      return translate("Bank");
    }
  }
  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <View style={styles.rootContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.amountAndCategoryContainer}>
            <AddEditAmount amount={amount} setAmount={setAmount} />
            <View style={styles.walletContainer}>
              <Text style={styles.walletText}>{translate("WalletUsed")}</Text>
              <Text style={styles.walletText}>{getCurrentWallet()}</Text>
            </View>
            <CategoriesPart
              category={category}
              setCategory={setCategory}
              type={type}
              setType={setType}
            />
          </View>
          <View style={styles.commentsAndDateContainer}>
            <DatePicker date={date} setDate={setDate} />
            <AddEditComments comment={comment} setComment={setComment} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            buttonText={translate("delete")}
            onPress={deleteExpense}
            buttonColor={{ backgroundColor: GlobalStyles.colors.error }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default EditExpense;

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
    width: "100%",
  },

  commentsAndDateContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  headerText: {
    color: GlobalStyles.colors.headerColor,
    fontWeight: "bold",
    fontSize: height * 0.02,
    marginRight: height * 0.02,
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  walletContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  walletText: {
    fontWeight: "bold",
    fontSize: height * 0.013,
    marginRight: height * 0.015,
    color: GlobalStyles.colors.textColor,
  },
});
