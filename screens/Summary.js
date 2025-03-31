import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import RoundButton from "../components/RoundButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpenseEntriesContextProvider, {
  ExpenseEntriesContext,
} from "../store/context/ExpenseEntriesContext";
import { useContext, useState, useEffect } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { GlobalStyles } from "../constants/GlobalStyles";
import AmountPart from "../components/AmountPart";
import ExpenseEntry from "../components/ExpenseEntry";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DUMMY_EXPENSES } from "../util/DummyExpenses";
import { useLanguage } from "../store/context/LanguageContext";
import WalletDashboard from "../components/WalletDashboard";
import { LinearGradient } from "expo-linear-gradient";


const { width, height } = Dimensions.get("window");

function Main() {
  const { language, changeLanguage, translate } = useLanguage();
  const expensesCtx = useContext(ExpenseEntriesContext);

  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentMonthlyAverage, setCurrentMonthlyAverage] = useState(0);
  let sortArr = expensesCtx.expenses;

  useEffect(() => {
    expensesCtx.processPendingExpenses();
    setCurrentBalance(calculateCurrentMonthBalance());
    setCurrentMonthlyAverage(calculateAverageMonthlyExpense());
  });

  function addDummyData() {
    DUMMY_EXPENSES.forEach((expense) => {
      expensesCtx.addExpense(
        expense.description,
        expense.date,
        expense.amount,
        expense.comment,
        expense.type
      );
    });
  }

  const newestExpenses = [...sortArr]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const navigator = useNavigation();
  function addPressHandler() {
    navigator.navigate("AddExpense");
  }

  function calculateCurrentMonthBalance() {
    let balance = 0;
    expensesCtx.expenses.forEach((expense) => {
      if (
        expense.date.getMonth() === new Date().getMonth() &&
        expense.date.getFullYear() === new Date().getFullYear()
      ) {
        if (expense.type === "expense") {
          balance -= parseFloat(expense.amount);
        } else if (expense.type === "income") {
          balance += parseFloat(expense.amount);
        }
      }
    });
    return balance.toFixed(2);
  }

  function calculateAverageMonthlyExpense() {
    let expenses = expensesCtx.expenses;
    // 1. Group expenses by month
    const monthlyExpenses = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += expense.amount;
      return acc;
    }, {});

    // 2. Sum all monthly totals
    const totalExpense = Object.values(monthlyExpenses).reduce(
      (sum, monthTotal) => sum + monthTotal,
      0
    );

    // 3. Calculate average
    const numberOfMonths = Object.keys(monthlyExpenses).length;
    const averageMonthlyExpense = totalExpense / numberOfMonths;

    return parseFloat(averageMonthlyExpense).toFixed(2);
  }

  return (
    <>
   {/* <LinearGradient
        // Button Linear Gradient
        colors={[
          "#b8e7e4", "#c8f6c8"
        ]}
        
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      > */}
        <SafeAreaView style={styles.rootContainer}>
          <View style={styles.dataContainer}>
            <Pressable onPress={addDummyData}>
              <AmountPart
                amount={currentBalance}
                text={translate("CurrentMonthBalance")}
                containerStyle={{
                  paddingHorizontal: 40,
                  marginVertical: 15,
                  // borderWidth: 3,
                  // borderRadius: 10,
                }}
              />
            </Pressable>

            <WalletDashboard />

            <Text style={styles.lastExpensesText}>{translate("lastFive")}</Text>
            <FlatList
              data={newestExpenses}
              renderItem={(itemData) => (
                <ExpenseEntry
                  itemData={itemData}
                  style={{ marginHorizontal: 0 }}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </SafeAreaView>
        {/* </LinearGradient> */}
      <RoundButton pressHandler={addPressHandler}>
        <Ionicons name="add" size={22} color={GlobalStyles.colors.iconColor} />
      </RoundButton>
    </>
  );
}

export default Main;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  rootContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: GlobalStyles.colors.backgroundMain,
    paddingTop: height > 800 ? 10 : 0,
  },
  lastExpensesText: {
    fontSize: height > 800 ? 25 : 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.headerColor,
    textAlign: "center",
    marginVertical: height > 800 ? 3 : 0,
  },
  dataContainer: {
    width: "90%",
    paddingTop: height > 800 ? 25 : 15,
  },
});
