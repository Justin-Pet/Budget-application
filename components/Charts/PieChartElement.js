import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { PieChart } from "react-native-gifted-charts";
import { useContext } from "react";
import { ExpenseEntriesContext } from "../../store/context/ExpenseEntriesContext";
import { PieChartColors } from "../../constants/PieChartColors";
import { useLanguage } from "../../store/context/LanguageContext";
import SimpleButton from "../SimpleButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleIconButton from "../ui/SimpleIconButton";
import PieChartLegend from "./PieChartLegend";
import { getFormatedDateYM } from "../../util/date";

const { width, height } = Dimensions.get("window");
function PieChartElement({ pieChartAllShown }) {
  const { language, translate } = useLanguage();
  const expensesCtx = useContext(ExpenseEntriesContext);

  const [pieMonth, setPieMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 15)
  );
  const [pieShown, setPieShown] = useState(true);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    getPieData();
  }, [pieMonth]);
  function totalExpenseAmountPerCategory() {
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

    expensesCtx.expenses.forEach((expense) => {
      categories.forEach((category) => {
        if (expense.description === category.description) {
          category.amount += parseFloat(expense.amount);
        }
      });
    });

    let totalAmount = 0;

    categories.forEach((category) => {
      totalAmount += category.amount;
    });

    const pieData = [
      {
        value: categories[0].amount,
        color: PieChartColors.colors.groceries,
        text: ((categories[0].amount / totalAmount) * 100).toFixed(2) + "%",
      },
      {
        value: categories[1].amount,
        color: PieChartColors.colors.bills,
        text: ((categories[1].amount / totalAmount) * 100).toFixed(2) + "%",
      },
      {
        value: categories[2].amount,
        color: PieChartColors.colors.car,
        text: ((categories[2].amount / totalAmount) * 100).toFixed(2) + "%",
      },
      {
        value: categories[3].amount,
        color: PieChartColors.colors.entertainment,
        text: ((categories[3].amount / totalAmount) * 100).toFixed(2) + "%",
      },
      {
        value: categories[4].amount,
        color: PieChartColors.colors.family,
        text: ((categories[4].amount / totalAmount) * 100).toFixed(2) + "%",
      },
      {
        value: categories[5].amount,
        color: PieChartColors.colors.health,
        text: ((categories[5].amount / totalAmount) * 100).toFixed(2) + "%",
      },
      {
        value: categories[6].amount,
        color: PieChartColors.colors.education,
        text: ((categories[6].amount / totalAmount) * 100).toFixed(2) + "%",
      },
      {
        value: categories[7].amount,
        color: PieChartColors.colors.home,
        text: ((categories[7].amount / totalAmount) * 100).toFixed(2) + "%",
      },
      {
        value: categories[8].amount,
        color: PieChartColors.colors.other,
        text: ((categories[8].amount / totalAmount) * 100).toFixed(2) + "%",
      },
    ];
    return pieData;
  }

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

  function getPieRadius() {
    if (height > 950) {
      return 150;
    } else if (height > 800) {
      return 135;
    } else {
      return 80;
    }
  }

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

  function handleNextMonth() {
    setPieMonth(new Date(pieMonth.getFullYear(), pieMonth.getMonth() + 1, 15));
  }

  function handlePreviousMonth() {
    setPieMonth(new Date(pieMonth.getFullYear(), pieMonth.getMonth() - 1, 15));
  }

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
        <PieChartLegend />
      </View>
    </View>
  );
}

export default PieChartElement;

const styles = StyleSheet.create({
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

  rootContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",

    marginBottom: height * 0.01,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.01,
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
    backgroundColor: "red ",
  },
});
