import { View, StyleSheet, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useContext, useEffect, useState } from "react";
import { ExpenseEntriesContext } from "../../store/context/ExpenseEntriesContext";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");

function BarChartElement({ currentDate }) {
  const { translate } = useLanguage();
  const expensesCtx = useContext(ExpenseEntriesContext);

  const [barMaxValue, setBarMaxValue] = useState(0);

  function getLastSixMonths() {
    let monthlyData = [
      {
        month: (currentDate.getMonth() - 5 + 12) % 12,
        year:
          currentDate.getMonth() < 5
            ? currentDate.getFullYear() - 1
            : currentDate.getFullYear(),
        income: 0,
        expenses: 0,
      },
      {
        month: (currentDate.getMonth() - 4 + 12) % 12,
        year:
          currentDate.getMonth() < 4
            ? currentDate.getFullYear() - 1
            : currentDate.getFullYear(),
        income: 0,
        expenses: 0,
      },
      {
        month: (currentDate.getMonth() - 3 + 12) % 12,
        year:
          currentDate.getMonth() < 3
            ? currentDate.getFullYear() - 1
            : currentDate.getFullYear(),
        income: 0,
        expenses: 0,
      },
      {
        month: (currentDate.getMonth() - 2 + 12) % 12,
        year:
          currentDate.getMonth() == 1
            ? currentDate.getFullYear() - 1
            : currentDate.getFullYear(),
        income: 0,
        expenses: 0,
      },
      {
        month: (currentDate.getMonth() - 1 + 12) % 12,
        year:
          currentDate.getMonth() == 0
            ? currentDate.getFullYear() - 1
            : currentDate.getFullYear(),
        income: 0,
        expenses: 0,
      },
      {
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        income: 0,
        expenses: 0,
      },
    ];

    expensesCtx.expenses.forEach((expense) => {
      for (let i = 0; i < monthlyData.length; i++) {
        if (
          expense.date.getMonth() === monthlyData[i].month &&
          expense.date.getFullYear() === monthlyData[i].year
        ) {
          if (expense.type === "expense") {
            monthlyData[i].expenses += parseFloat(expense.amount);
          } else if (expense.type === "income") {
            monthlyData[i].income += parseFloat(expense.amount);
          }
        }
      }
    });

    monthlyData.forEach((month) => {
      if (month.income > barMaxValue || month.expenses > barMaxValue) {
        setBarMaxValue(Math.max(month.income, month.expenses));
      }
    });

    const data = [
      {
        value: monthlyData[0].income,
        frontColor: "green",
        label: `${getMonthName(monthlyData[0].month)} \n ${
          monthlyData[0].year
        }`,
      },
      { value: monthlyData[0].expenses, frontColor: "red" },
      {
        value: monthlyData[1].income,
        frontColor: "green",
        label: `${getMonthName(monthlyData[1].month)} \n ${
          monthlyData[1].year
        }`,
      },
      { value: monthlyData[1].expenses, frontColor: "red" },
      {
        value: monthlyData[2].income,
        frontColor: "green",
        label: `${getMonthName(monthlyData[2].month)} \n ${
          monthlyData[2].year
        }`,
      },
      { value: monthlyData[2].expenses, frontColor: "red" },
      {
        value: monthlyData[3].income,
        frontColor: "green",
        label: `${getMonthName(monthlyData[3].month)} \n ${
          monthlyData[3].year
        }`,

        // getMonthName(monthlyData[3].month),
      },
      { value: monthlyData[3].expenses, frontColor: "red" },
      {
        value: monthlyData[4].income,
        frontColor: "green",
        label: `${getMonthName(monthlyData[4].month)} \n ${
          monthlyData[4].year
        }`,
      },
      { value: monthlyData[4].expenses, frontColor: "red" },
      {
        value: monthlyData[5].income,
        frontColor: "green",
        label: `${getMonthName(monthlyData[5].month)} \n ${
          monthlyData[5].year
        }`,
      },
      { value: monthlyData[5].expenses, frontColor: "red" },
    ];

    return data;
  }

  function returnBarUpperScale() {
    if (barMaxValue < 1000) {
      return 1000;
    } else if (barMaxValue < 10000) {
      return 10000;
    } else if (barMaxValue < 20000) {
      return 20000;
    } else if (barMaxValue < 50000) {
      return 50000;
    } else if (barMaxValue < 100000) {
      return 100000;
    } else if (barMaxValue < 250000) {
      return 200000;
    } else if (barMaxValue < 500000) {
      return 500000;
    } else {
      return 1000000;
    }
  }

  function getMonthName(number) {
    switch (number) {
      case 0:
        return translate("Jan");
      case 1:
        return translate("Feb");
      case 2:
        return translate("Mar");
      case 3:
        return translate("Apr");
      case 4:
        return translate("May");
      case 5:
        return translate("Jun");
      case 6:
        return translate("Jul");
      case 7:
        return translate("Aug");
      case 8:
        return translate("Sep");
      case 9:
        return translate("Oct");
      case 10:
        return translate("Nov");
      case 11:
        return translate("Dec");
    }
  }

  function getSpacing() {
    if (height > 950) {
      return 12;
    } else if (height > 800) {
      return 10;
    } else {
      return 11;
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View>
        <Text style={styles.barChartTitle}>
          {translate("ExpenseIncomeTrend")}
        </Text>
      </View>
      <View style={styles.barChartContainer}>
        <BarChart
          data={getLastSixMonths()}
          xAxisLabelTextStyle={{
            color: GlobalStyles.colors.textColor,
            textAlign: "center",
            fontSize: height > 800 ? 15 : 10,
          }}
          barWidth={height > 800 ? 15 : 10}
          spacing={getSpacing()}
          roundedTop
          roundedBottom
          noOfSections={4}
          maxValue={returnBarUpperScale()}
          labelWidth={width > 400 ? 50 : 40}
          width={width * 0.9}
          height={height * 0.18}
          xAxisTextNumberOfLines={2}
          isAnimated
          xAxisLength={width * 0.8}
          endSpacing={0}
          yAxisLabelWidth={50}
        />
      </View>
      <View style={styles.barChartLegend}>
        <View
          style={[{ backgroundColor: "green" }, styles.legendItemContainer]}
        >
          <Text style={styles.legentText}>{translate("income")}</Text>
        </View>
        <View style={[{ backgroundColor: "red" }, styles.legendItemContainer]}>
          <Text style={styles.legentText}>{translate("expense")}</Text>
        </View>
      </View>
    </View>
  );
}

export default BarChartElement;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height > 800 ? 20 : 10,
  },
  barChartTitle: {
    fontWeight: "bold",
    fontSize: width > 400 ? 20 : 17,
    marginBottom: height > 800 ? 15 : 10,
    textAlign: "center",
    color: GlobalStyles.colors.headerColor,
  },
  barChartContainer: {
    marginBottom: height > 800 ? 20 : 5,
  },
  barChartLegend: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  legentText: {
    fontWeight: "bold",
    fontSize: width > 400 ? 15 : 12,
    borderRadius: 50,
    color: GlobalStyles.colors.textColor,
  },
  legendItemContainer: {
    borderRadius: 200,
    width: width > 400 ? 100 : 80,
    height: width > 400 ? 25 : 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width > 400 ? 20 : 10,
  },
});
