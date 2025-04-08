import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { getFormatedDateYM, getFormatedDateYMD, getFormatedDay } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../store/context/LanguageContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ExpenseEntriesContext } from "../../store/context/ExpenseEntriesContext";
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
function ReoccuringEntry({ itemData, style }) {
  const { language, translate } = useLanguage();

  const expensesCtx = useContext(ExpenseEntriesContext);

function test () {
  console.log(itemData.item.dueDay.toUTCString());
}
  function onPressEditReoccuring() {}
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
        return "None";
    }
  }

  function handleRemovePress() {
    expensesCtx.removeReoccuringExpense(itemData.item.id);
  }


  return (
    <Pressable style={({ pressed }) => pressed && styles.onPress} onPress={test}>
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
      <View style={[styles.expenseContainer, style]}>
        <View style={styles.expenseDetails}>
          <Text style={styles.expense}>{getCategoryName()}</Text>
          <Text style={styles.date}>
            {translate("NextDueDate")}: {getFormatedDateYMD(itemData.item.dueDay)}
          </Text>
        </View>
        <Text style={[styles.expenseAmount, itemData.item.type === "expense" ? styles.expenseAmountBackground : styles.incomeAmountBackground]}>
          {itemData.item.type === "expense" ? "-" : "+"}
          {"\u20AC"}
          {parseFloat(itemData.item.amount).toFixed(2)}
        </Text>
        <Pressable onPress={handleRemovePress}>
          <Ionicons
            name="close"
            size={24}
            color={GlobalStyles.colors.accentColor}
          />
        </Pressable>
      </View>
      </LinearGradient>
    </Pressable>
  );
}


export default ReoccuringEntry;

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 12,
  },
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.005,
    paddingHorizontal: height * 0.01,
    paddingVertical: height * 0.01,
    borderRadius: 12,
    width: "100%",
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
    width: height* 0.15,
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