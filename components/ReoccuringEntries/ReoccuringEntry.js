import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { getFormatedDateYM, getFormatedDateYMD, getFormatedDay } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../store/context/LanguageContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ExpenseEntriesContext } from "../../store/context/ExpenseEntriesContext";
import { useContext } from "react";

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
      <View style={[styles.expenseContainer, style]}>
        <View style={styles.expenseDetails}>
          <Text style={styles.expense}>{getCategoryName()}</Text>
          <Text style={styles.date}>
            {translate("NextDueDate")}: {getFormatedDateYMD(itemData.item.dueDay)}
          </Text>
        </View>
        <Text style={styles.expenseAmount}>
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
    </Pressable>
  );
}

function returnPaddingVertical() {
  if (height > 950) {
    return 15;
  } else if (height > 800) {
    return 8;
  } else {
    return 5;
  }
}
export default ReoccuringEntry;

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.backGroundSecondary,
    marginVertical: height > 800 ? 5 : 3,

    paddingHorizontal: width > 400 ? 20 : 15,
    paddingVertical: returnPaddingVertical(),
    borderRadius: 12,
  },

  expense: {
    color: GlobalStyles.colors.textColor,
    fontSize: height > 800 ? 18 : 14,
    fontWeight: "bold",
  },
  date: {
    color: GlobalStyles.colors.textColor,
    fontSize: height > 800 ? 12 : 10,
  },
  expenseAmount: {
    width: width > 400 ? 130 : 100,
    color: GlobalStyles.colors.textColor,
    fontSize: height > 800 ? 18 : 15,
    fontWeight: "bold",
    backgroundColor: GlobalStyles.colors.accentColor,
    borderRadius: 12,
    paddingHorizontal: width > 400 ? 5 : 3,
    paddingVertical: height > 800 ? 5 : 3,
    textAlign: "center",
  },

  onPress: {
    opacity: 0.75,
  },
});
