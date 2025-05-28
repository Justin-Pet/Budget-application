import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";
import { getFormattedDate } from "../util/date";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../store/context/LanguageContext";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");
/**
 * A component representing a single expense entry in the expense list.
 * It displays the category of the expense, the date of the expense,
 * and the amount of the expense. When pressed, it navigates to the
 * EditExpense screen with the expense data.
 *
 * @param {Object} itemData - An object containing the expense data.
 * @param {Object} style - A style object that can be used to customize the component.
 * @returns {Component} A Pressable component with a LinearGradient as its child.
 */
function ExpenseEntry({ itemData, style }) {
  const { translate } = useLanguage();
  const navigator = useNavigation();

  /**
   * Handles the press event on the expense entry.
   * Navigates to the EditExpense screen with the current expense data
   * including amount, description, comment, id, date, type, and wallet.
   */

  function onPressHandler() {
    navigator.navigate("EditExpense", {
      amount: itemData.item.amount,
      description: itemData.item.description,
      comment: itemData.item.comment,
      id: itemData.item.id,
      date: itemData.item.date.toISOString(),
      type: itemData.item.type,
      wallet: itemData.item.wallet,
    });
  }

  /**
   * Translates and returns the category name based on the expense description.
   * The function uses a switch statement to match the description of the item
   * with predefined categories such as Groceries, Bills, Car, etc., and returns
   * the translated category name. If the description does not match any of the
   * predefined categories, it returns the original description.
   *
   * @returns {string} The translated category name or the original description
   * if no predefined category matches.
   */

  function getCategoryName() {
    switch (itemData.item.description) {
      case "Groceries":
        return translate("Groceries");
      case "Bills":
        return translate("Bills");
      case "Car":
        return translate("Car");
      case "Education":
        return translate("Education");
      case "Other":
        return translate("Other");
      case "Health":
        return translate("Health");
      case "Home":
        return translate("Home");
      case "Entertainment":
        return translate("Entertainment");
      case "Family":
        return translate("Family");
      case "Salary":
        return translate("Salary");
      case "Gifts":
        return translate("Gifts");
      case "Other_income":
        return translate("Other_income");

      default:
        return itemData.item.description;
    }
  }
  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => pressed && styles.onPress}
    >
      <LinearGradient
        // Button Linear Gradient
        colors={[
          // "#0FA4AF",
          // "#4ccad3c5",
          "#1dd5cc",
          "#359a95",
        ]}
        style={[styles.gradientContainer, styles.expenseContainer, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* <View style={[styles.expenseContainer, style]}> */}
        <View style={styles.expenseDetails}>
          <Text style={styles.expense}>{getCategoryName()}</Text>
          <Text style={styles.date}>
            {getFormattedDate(itemData.item.date)}
          </Text>
        </View>
        <Text
          style={[
            styles.expenseAmount,
            itemData.item.type === "expense"
              ? styles.expenseAmountBackground
              : styles.incomeAmountBackground,
          ]}
        >
          {itemData.item.type === "expense" ? "-" : "+"}
          {"\u20AC"}
          {parseFloat(itemData.item.amount).toFixed(2)}
        </Text>
        {/* </View> */}
      </LinearGradient>
    </Pressable>
  );
}

export default ExpenseEntry;

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 12,
  },
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.005,
    paddingHorizontal: height * 0.02,
    paddingVertical: height * 0.015,
    borderRadius: 12,
  },

  expense: {
    color: GlobalStyles.colors.textColor,
    fontSize: height * 0.018,
    fontWeight: "bold",
  },
  date: {
    color: GlobalStyles.colors.textColor,
    fontSize: height * 0.015,
  },
  expenseAmount: {
    width: height * 0.15,
    color: GlobalStyles.colors.textColor,
    fontSize: height * 0.018,
    fontWeight: "bold",
    paddingVertical: height * 0.01,
    borderRadius: 12,
    textAlign: "center",
  },

  onPress: {
    opacity: 0.75,
  },
  expenseAmountBackground: {
    backgroundColor: GlobalStyles.colors.accentColor,
  },
  incomeAmountBackground: {
    backgroundColor: "green",
  },
});
