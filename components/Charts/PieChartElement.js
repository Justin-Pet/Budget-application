import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { PieChart } from "react-native-gifted-charts";
import { useContext } from "react";
import { ExpenseEntriesContext } from "../../store/context/ExpenseEntriesContext";
import { PieChartColors } from "../../constants/PieChartColors";
import { useLanguage } from "../../store/context/LanguageContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleIconButton from "../ui/SimpleIconButton";
import PieChartLegend from "./PieChartLegend";
import { getFormatedDateYM } from "../../util/date";

const { height } = Dimensions.get("window");
/**
 * PieChartElement component displays a pie chart representing the distribution
 * of expenses over different categories for a specific month. It allows users
 * to navigate between months and view the percentage breakdown for each category.
 * The pie chart is updated when the month changes or when there is a change in
 * the expenses context. If no data is available for the selected month, a message
 * indicating the absence of data is displayed.
 *
 * @param {boolean} pieChartAllShown - A prop that determines if all pie chart data
 * should be initially shown.
 */

function PieChartElement({ pieChartAllShown }) {
  const { translate } = useLanguage();
  const expensesCtx = useContext(ExpenseEntriesContext);

  const [pieMonth, setPieMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 15)
  );
  const [pieShown, setPieShown] = useState(true);
  const [pieData, setPieData] = useState([]);

  /**
   * Updates the pie chart data based on the selected month.
   */
  useEffect(() => {
    getPieData();
  }, [pieMonth]);

  /**
   * Calculates the total balance from the expenses context. It takes the sum of all
   * expenses and incomes and returns the balance as a string with the currency symbol
   * and rounded to two decimal places. If the balance is negative, it returns
   * a string with a minus sign followed by the balance and currency symbol.
   * @returns {string} The total balance.
   */
  function calculateTotalBalance() {
    let balance = 0;
    expensesCtx.expenses.forEach((expense) => {
      if (expense.type == "expense") {
        balance = balance - expense.amount;
      } else {
        balance = balance + expense.amount;
      }
    });

    if (balance < 0) {
      return "-" + "\u20AC" + (balance * -1).toFixed(2);
    } else {
      return "\u20AC" + balance.toFixed(2);
    }
  }

  /**
   * Calculates the balance of the current month. It iterates through the
   * expenses in the expenses context and sums up the amounts of all expenses
   * and incomes that fall within the current month and year. The balance is
   * returned as a string with the currency symbol and rounded to two decimal
   * places. If the balance is negative, it returns a string with a minus sign
   * followed by the balance and currency symbol.
   *
   * @returns {string} The balance of the current month.
   */
  function calculateCurrentMonthBalance() {
    let balance = 0;
    expensesCtx.expenses.forEach((expense) => {
      if (
        expense.date.getMonth() === new Date(pieMonth).getMonth() &&
        expense.date.getFullYear() === new Date(pieMonth).getFullYear()
      ) {
        if (expense.type == "expense") {
          balance = balance - expense.amount;
        } else {
          balance = balance + expense.amount;
        }
      }
    });
    if (balance < 0) {
      return "-" + "\u20AC" + (balance * -1).toFixed(2);
    } else {
      return "\u20AC" + balance.toFixed(2);
    }
  }

  /**
   * Determines the radius of the pie chart based on the device's screen height.
   *
   * @returns {number} The radius of the pie chart in pixels. Returns 150 if the
   * height is greater than 950, 135 if greater than 800, otherwise 80.
   */

  function getPieRadius() {
    if (height > 950) {
      return 150;
    } else if (height > 800) {
      return 135;
    } else {
      return 80;
    }
  }

  /**
   * Iterates through the expenses context and sums up the amounts of all expenses
   * and incomes that fall within the current month and year. The function then
   * creates an array of objects with the description, amount, and color of each
   * category. The function also calculates the total amount of all expenses and
   * incomes and determines the percentage of each category. If the total amount
   * is 0, the function sets the pieShown state to false and returns 0. Otherwise,
   * it sets the pieData state to the array of objects and sets pieShown to true.
   */
  function getPieData() {
    let categories = [
      {
        description: "Groceries",
        amount: 0,
      },
      {
        description: "Bills",
        amount: 0,
      },
      {
        description: "Car",
        amount: 0,
      },
      {
        description: "Entertainment",
        amount: 0,
      },
      {
        description: "Family",
        amount: 0,
      },
      {
        description: "Health",
        amount: 0,
      },

      {
        description: "Education",
        amount: 0,
      },
      {
        description: "Home",
        amount: 0,
      },
      {
        description: "Other",
        amount: 0,
      },
    ];

    /**
     * Iterates through the expenses context and sums up the amounts of all expenses
     * and incomes that fall within the current month and year.
     */
    expensesCtx.expenses.forEach((expense) => {
      if (
        expense.type == "expense" &&
        expense.date.getMonth() === pieMonth.getMonth() &&
        expense.date.getFullYear() === pieMonth.getFullYear()
      ) {
        categories.forEach((category) => {
          if (category.description == expense.description) {
            category.amount = category.amount + expense.amount;
          }
        });
      }
    });

    let totalAmount = 0;

    categories.forEach((category) => {
      totalAmount += category.amount;
    });

    if (totalAmount == 0) {
      setPieShown(false);
      return 0;
    } else {
      setPieShown(true);
    }

    /**
     * Creates an array of objects with the description, amount, and color of each
     * category.
     */
    const pieData = [
      {
        value: categories[0].amount,
        color: PieChartColors.colors.groceries,
        text:
          totalAmount > 0 && categories[0].amount > 0
            ? ((categories[0].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
      {
        value: categories[1].amount,
        color: PieChartColors.colors.bills,
        text:
          totalAmount > 0 && categories[1].amount > 0
            ? ((categories[1].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
      {
        value: categories[2].amount,
        color: PieChartColors.colors.car,
        text:
          totalAmount > 0 && categories[2].amount > 0
            ? ((categories[2].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
      {
        value: categories[3].amount,
        color: PieChartColors.colors.entertainment,
        text:
          totalAmount > 0 && categories[3].amount > 0
            ? ((categories[3].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
      {
        value: categories[4].amount,
        color: PieChartColors.colors.family,
        text:
          totalAmount > 0 && categories[4].amount > 0
            ? ((categories[4].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
      {
        value: categories[5].amount,
        color: PieChartColors.colors.health,
        text:
          totalAmount > 0 && categories[5].amount > 0
            ? ((categories[5].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
      {
        value: categories[6].amount,
        color: PieChartColors.colors.education,
        text:
          totalAmount > 0 && categories[6].amount > 0
            ? ((categories[6].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
      {
        value: categories[7].amount,
        color: PieChartColors.colors.home,
        text:
          totalAmount > 0 && categories[7].amount > 0
            ? ((categories[7].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
      {
        value: categories[8].amount,
        color: PieChartColors.colors.other,
        text:
          totalAmount > 0 && categories[8].amount > 0
            ? ((categories[8].amount / totalAmount) * 100).toFixed(2) + "%"
            : "0%",
      },
    ];
    setPieData(pieData);
  }

  /**
   * Advances the pieMonth state to the next month while preserving the day.
   * Sets the day to the 15th to avoid month-end discrepancies.
   */

  function handleNextMonth() {
    setPieMonth(new Date(pieMonth.getFullYear(), pieMonth.getMonth() + 1, 15));
  }

  /**
   * Moves the pieMonth state to the previous month while preserving the day.
   * Sets the day to the 15th to avoid month-end discrepancies.
   */

  function handlePreviousMonth() {
    setPieMonth(new Date(pieMonth.getFullYear(), pieMonth.getMonth() - 1, 15));
  }

  /**
   * Renders a pie chart with the distribution of expenses among the categories.
   * The categories are ordered by their amount, and the pie chart is sorted by
   * value in descending order.
   * If there is no data available, a message is displayed instead.
   * @returns {JSX.Element} The rendered component.
   */
  function renderContent() {
    if (pieShown) {
      return (
        <View style={styles.pieChartContainer}>
          <PieChart
            donut
            showGradient
            sectionAutoFocus
            // radius={140}
            // innerRadius={70}
            radius={height * 0.18}
            innerRadius={height * 0.09}
            innerCircleColor={GlobalStyles.colors.backgroundMain}
            // isThreeD
            showText
            textColor="black"
            textSize={height * 0.015}
            textBackgroundRadius={height * 0.01}
            fontWeight="bold"
            // showValuesAsLabels
            data={pieData}
            // labelsPosition= "onBorder"
            innerOpacity={1}
            focusOnPress
            centerLabelComponent={() => {
              if (false) {
                return (
                  <View style={styles.centerLabelContainer}>
                    <Text style={styles.centerLabelText}>
                      {translate("TotalBalance")}
                    </Text>
                    <Text style={styles.centerLabelText}>
                      {calculateTotalBalance()}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.centerLabelContainer}>
                    <Text style={styles.centerLabelText}>
                      {translate("MonthlyBalance")}
                    </Text>
                    <Text style={styles.centerLabelText}>
                      {calculateCurrentMonthBalance()}
                    </Text>
                  </View>
                );
              }
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{translate("NoDataAvailable")}</Text>
        </View>
      );
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View>
        <View>
          <Text style={styles.barChartTitle}>
            {translate("ExpenseDistribution")}
          </Text>
        </View>
        {renderContent()}
      </View>
      <PieChartLegend />
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <SimpleIconButton onPress={handlePreviousMonth}>
            <Ionicons
              name="arrow-back"
              size={height * 0.035}
              color={GlobalStyles.colors.accentColor}
            />
          </SimpleIconButton>

          <Text style={styles.dateText}>{getFormatedDateYM(pieMonth)}</Text>

          <SimpleIconButton onPress={handleNextMonth}>
            <Ionicons
              name="arrow-forward"
              size={height * 0.035}
              color={GlobalStyles.colors.accentColor}
            />
          </SimpleIconButton>
        </View>
      </View>
    </View>
  );
}

export default PieChartElement;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",

    marginBottom: height * 0.01,
  },
  centerLabelText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: height * 0.015,
    color: GlobalStyles.colors.textColor,
  },
  barChartTitle: {
    fontWeight: "bold",
    fontSize: height * 0.02,
    textAlign: "center",
    color: GlobalStyles.colors.headerColor,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: height * 0.01,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.15,
  },
  noDataText: {
    fontWeight: "bold",
    fontSize: height * 0.025,
    color: GlobalStyles.colors.accentColor,
  },
  dateText: {
    fontWeight: "bold",
    fontSize: height * 0.025,
    textAlign: "center",
    color: GlobalStyles.colors.textColor,
  },
  pieChartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
