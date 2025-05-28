import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { ExpenseEntriesContext } from "../store/context/ExpenseEntriesContext";
import { useContext, useState, useEffect, use } from "react";

import { GlobalStyles } from "../constants/GlobalStyles";

import SimpleButton from "../components/SimpleButton";
import SimpleIconButton from "../components/ui/SimpleIconButton";
import PieChartElement from "../components/Charts/PieChartElement";

import BarChartElement from "../components/Charts/BarChartElement";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");

/**
 * The ExpenseStatistics component displays all relevant statistics of the user's expenses and incomes.
 * It also allows the user to switch between a bar chart and a pie chart.
 * The bar chart displays the expenses and incomes for the current month and the previous months.
 * The pie chart displays the distribution of expenses and incomes for the current month.
 * The user can navigate between the different months using the buttons in the bar chart.
 * The user can also switch between the bar chart and the pie chart by pressing the button with the circular arrow icon.
 */
function ExpenseStatistics() {
  const { translate } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [barMaxValue, setBarMaxValue] = useState(0);
  const [chartShown, setChartShown] = useState("bar");
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [averageExpenseAmount, setAverageExpenseAmount] = useState(0);
  const [averageIncomeAmount, setAverageIncomeAmount] = useState(0);

  /**
   * Runs caluculations to get the total expense and income amount and the average expense and income amount per month.
   */
  useEffect(() => {
    setTotalExpenseAmount(getTotalExpenseAmount());
    setTotalIncomeAmount(getTotalIncomeAmount());
    setAverageExpenseAmount(getExpensePerMonth());
    setAverageIncomeAmount(getIncomePerMonth());
  }, []);

  const expensesCtx = useContext(ExpenseEntriesContext);

  const navigator = useNavigation();
  /**
   * Navigates to the "AddExpense" screen when the "Add expense" button is pressed.
   */
  function addPressHandler() {
    navigator.navigate("AddExpense");
  }

  /**
   * Sets the currentDate one month back when the "Previous" button in the bar chart is pressed.
   * If the currentDate is January, it sets the year to the previous year and the month to December.
   * Otherwise it just sets the month to the previous month.
   */
  function handleBarBackPress() {
    setCurrentDate((prevDate) => {
      if (prevDate.getMonth() === 0) {
        return new Date(prevDate.getFullYear() - 1, 11, prevDate.getDate());
      } else {
        return new Date(
          prevDate.getFullYear(),
          prevDate.getMonth() - 1,
          prevDate.getDate()
        );
      }
    });
  }

  /**
   * Sets the currentDate one month forward when the "Next" button in the bar chart is pressed.
   * If the currentDate is December, it sets the year to the next year and the month to January.
   * Otherwise, it just sets the month to the next month.
   */

  function handleBarNextPress() {
    setCurrentDate((prevDate) => {
      if (prevDate.getMonth() === 11) {
        return new Date(prevDate.getFullYear() + 1, 0, prevDate.getDate());
      } else {
        return new Date(
          prevDate.getFullYear(),
          prevDate.getMonth() + 1,
          prevDate.getDate()
        );
      }
    });
  }

  /**
   * Sets the currentDate to the current date when the "Current date" button in the bar chart is pressed.
   */
  function handleBarCurrentDatePress() {
    setCurrentDate(new Date());
  }

  /**
   * Changes the type of chart shown when the "Change chart type" button is pressed.
   * If the bar chart is shown, it sets the chartShown state to "pie".
   * If the pie chart is shown, it sets the chartShown state to "bar".
   */
  function handleChartChange() {
    if (chartShown === "bar") {
      setChartShown("pie");
    } else {
      setChartShown("bar");
    }
  }

  /**
   * Calculates the total expense amount in the given expenses context.
   * Ignores income entries.
   * @returns {string} The total expense amount, rounded to two decimal places.
   */
  function getTotalExpenseAmount() {
    let sum = 0;
    expensesCtx.expenses.forEach((expense) => {
      if (expense.type == "expense") {
        sum += expense.amount;
      }
    });
    return sum.toFixed(2);
  }

  /**
   * Calculates the total income amount in the given expenses context.
   * Ignores expense entries.
   * @returns {string} The total income amount, rounded to two decimal places.
   */
  function getTotalIncomeAmount() {
    let sum = 0;
    expensesCtx.expenses.forEach((expense) => {
      if (expense.type == "income") {
        sum += expense.amount;
      }
    });
    return sum.toFixed(2);
  }

  /**
   * Calculates the average monthly expense over the past 24 months.
   * Iterates through the expenses, groups them by month, and calculates
   * the sum for each month. Ignores months with no expenses. Finally,
   * calculates the average of these monthly sums.
   *
   * @returns {string} The average monthly expense, rounded to two decimal places.
   */

  function getExpensePerMonth() {
    let currentDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      15
    );
    let monthlyExpenseArray = [];
    let monthCount = 0;
    for (let i = 0; i < 24; i++) {
      let sum = 0;
      expensesCtx.expenses.forEach((expense) => {
        if (
          expense.type == "expense" &&
          expense.date.getMonth() == currentDate.getMonth() &&
          expense.date.getFullYear() == currentDate.getFullYear()
        ) {
          sum += expense.amount;
        }
      });
      if (sum !== 0) {
        monthlyExpenseArray.push(sum.toFixed(2));
        monthCount++;
      }
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        15
      );
    }
    let sum = 0;
    monthlyExpenseArray.forEach((expense) => {
      sum += parseFloat(expense);
    });
    return (sum / monthCount).toFixed(2);
  }

  /**
   * Calculates the average monthly income over the past 24 months.
   * Iterates through the expenses, groups them by month, and calculates
   * the sum for each month. Ignores months with no income. Finally,
   * calculates the average of these monthly sums.
   *
   * @returns {string} The average monthly income, rounded to two decimal places.
   */
  function getIncomePerMonth() {
    let currentDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      15
    );
    let monthlyIncomeArray = [];
    let monthCount = 0;

    for (let i = 0; i < 24; i++) {
      let sum = 0;
      expensesCtx.expenses.forEach((expense) => {
        if (
          expense.type == "income" &&
          expense.date.getMonth() == currentDate.getMonth() &&
          expense.date.getFullYear() == currentDate.getFullYear()
        ) {
          sum += expense.amount;
        }
      });
      if (sum !== 0) {
        monthlyIncomeArray.push(sum.toFixed(2));
        monthCount++;
      }
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        15
      );
    }
    let sum = 0;
    monthlyIncomeArray.forEach((expense) => {
      sum += parseFloat(expense);
    });
    return (sum / monthCount).toFixed(2);
  }

  /**
   * Renders either a bar chart or a pie chart, depending on the state of `chartShown`.
   * The bar chart shows the income and expenses for the current month, and offers
   * buttons to navigate to the previous or next month.
   * The pie chart shows the distribution of expenses among the categories.
   * @returns {JSX.Element} The rendered chart.
   */
  function renderDiagram() {
    if (chartShown === "bar") {
      return (
        <View style={styles.barContainer}>
          <View style={styles.barChart}>
            <BarChartElement
              currentDate={currentDate}
              barMaxValue={barMaxValue}
              setBarMaxValue={setBarMaxValue}
            />
          </View>
          <View style={styles.barButtonContainer}>
            {/* <SimpleButton
            buttonText="Previous"
            onPress={handleBarBackPress}
          /> */}
            <SimpleIconButton onPress={handleBarBackPress}>
              <Ionicons
                name="arrow-back"
                size={height * 0.035}
                color={GlobalStyles.colors.accentColor}
              />
            </SimpleIconButton>
            <SimpleButton
              buttonText={translate("CurrentDate")}
              onPress={handleBarCurrentDatePress}
              style={{ fontSize: height * 0.02 }}
            />
            {/* <SimpleButton buttonText="Next" onPress={handleBarNextPress} /> */}
            <SimpleIconButton onPress={handleBarNextPress}>
              <Ionicons
                name="arrow-forward"
                size={height * 0.035}
                color={GlobalStyles.colors.accentColor}
              />
            </SimpleIconButton>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.pieContainer}>
          <View style={styles.pieChartContainer}>
            <PieChartElement />
          </View>
        </View>
      );
    }
  }

  return (
    <>
      <SafeAreaView style={styles.rootContainer}>
        <View>
          <Text style={styles.statsHeader}>Statistics</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.statsRows}>
              <Text style={styles.statsText}>
                {translate("TotalExpenseAmount")}
              </Text>
              <Text style={[styles.statsAmount, styles.expense]}>
                {"\u20AC"}
                {totalExpenseAmount}
              </Text>
            </View>
            <View style={styles.statsRows}>
              <Text style={styles.statsText}>
                {translate("TotalIncomeAmount")}
              </Text>
              <Text style={[styles.statsAmount, styles.income]}>
                {"\u20AC"}
                {totalIncomeAmount}
              </Text>
            </View>
            <View style={styles.statsRows}>
              <Text style={styles.statsText}>{translate("TotalBalance")}</Text>
              <Text
                style={[
                  styles.statsAmount,
                  totalIncomeAmount - totalExpenseAmount < 0
                    ? styles.expense
                    : styles.income,
                ]}
              >
                {"\u20AC"}
                {(totalIncomeAmount - totalExpenseAmount).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.statsRows}>
              <Text style={styles.statsText}>
                {translate("ExpenseAmountPerMonth")}
              </Text>
              <Text style={[styles.statsAmount, styles.expense]}>
                {"\u20AC"}
                {averageExpenseAmount}
              </Text>
            </View>
            <View style={styles.statsRows}>
              <Text style={styles.statsText}>
                {translate("IncomeAmountPerMonth")}
              </Text>
              <Text style={[styles.statsAmount, styles.income]}>
                {"\u20AC"}
                {averageIncomeAmount}
              </Text>
            </View>
            <View style={styles.statsRows}>
              <Text style={styles.statsText}>
                {translate("AverageMonthlyBalance")}
              </Text>
              <Text
                style={[
                  styles.statsAmount,
                  averageIncomeAmount - averageExpenseAmount < 0
                    ? styles.expense
                    : styles.income,
                ]}
              >
                {"\u20AC"}
                {(averageIncomeAmount - averageExpenseAmount).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.chartsContainer}>{renderDiagram()}</View>

        <Pressable
          style={[
            [styles.switchButton, ({ pressed }) => pressed && styles.onPress],
          ]}
          onPress={handleChartChange}
        >
          <View style={styles.buttonContainer}>
            <Ionicons
              name={"repeat"}
              size={height * 0.03}
              color={GlobalStyles.colors.iconColor}
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </>
  );
}

export default ExpenseStatistics;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.backgroundMain,
    justifyContent: "flex-start",
    paddingVertical: height * 0.02,
  },

  switchButton: {
    position: "absolute",
    bottom: height * 0.02,
    right: height * 0.02,
  },
  barContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",

    flex: 1,
  },
  barChart: {
    width: "100%",
    justifyContent: "center",
  },
  barButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },

  pieContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
  },
  pieChartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  pieButtonContainer: {
    marginVertical: height * 0.02,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  statsContainer: {
    flex: 1,
  },

  innerContainer: {
    marginVertical: height * 0.01,
  },
  chartsContainer: {
    flex: 2,
  },

  statsRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: height * 0.005,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.accentColor,
    borderStyle: "dotted",
  },
  statsHeader: {
    textAlign: "center",
    fontSize: height * 0.025,
    fontWeight: "bold",
    color: GlobalStyles.colors.headerColor,
    marginVertical: height * 0.01,
  },
  statsText: {
    fontSize: height * 0.018,
    color: GlobalStyles.colors.textColor,
  },
  statsAmount: {
    fontSize: height * 0.018,
    fontWeight: "bold",
  },
  income: {
    color: GlobalStyles.colors.iconColor,
  },
  expense: {
    color: GlobalStyles.colors.accentColor,
  },

  buttonContainer: {
    marginTop: height * 0.015,
    paddingVertical: height * 0.01,
    paddingHorizontal: height * 0.02,

    borderRadius: 12,
    alignSelf: "center",
  },
  onPress: {
    opacity: 0.75,
  },
});
