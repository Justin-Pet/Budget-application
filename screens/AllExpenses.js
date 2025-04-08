import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RoundButton from "../components/RoundButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { useContext, useEffect } from "react";

import ExpenseEntry from "../components/ExpenseEntry";
import { ExpenseEntriesContext } from "../store/context/ExpenseEntriesContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getFormatedDateYMD, getFormattedDate } from "../util/date";
import { getFormatedDateYM } from "../util/date";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { useLanguage } from "../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");
function AllExpenses() {
  const { language, translate } = useLanguage();

  const [selectedYear, setSelectedYear] = useState(
    language == "en" ? "All" : "Visi"
  );
  const [selectedMonth, setSelectedMonth] = useState(
    language == "en" ? "All" : "Visi"
  );

  const [currentWallet, setCurrentWallet] = useState("eWallet");
  let currentDate = new Date();
  let monthShown = false;

  useEffect(() => {
    if (language == "en") {
      setSelectedMonth("All");
    } else {
      setSelectedMonth("Visi");
    }
    monthShown = false;
  }, [selectedYear]);

  useEffect(() => {
    monthShown = false;
  }, [selectedMonth]);

  function getSelectedMonth() {
    switch (selectedMonth) {
      case "January":
        return 0;
      case "Sausis":
        return 0;
      case "February":
        return 1;
      case "Vasaris":
        return 1;
      case "March":
        return 2;
      case "Kovas":
        return 2;
      case "April":
        return 3;
      case "Balandis":
        return 3;
      case "May":
        return 4;
      case "Gegužė":
        return 4;
      case "June":
        return 5;
      case "Birželis":
        return 5;
      case "July":
        return 6;
      case "Liepa":
        return 6;
      case "August":
        return 7;
      case "Rugpjūtis":
        return 7;
      case "September":
        return 8;
      case "Rugsėjis":
        return 8;
      case "October":
        return 9;
      case "Spalis":
        return 9;
      case "November":
        return 10;
      case "Lapkritis":
        return 10;
      case "December":
        return 11;
      case "Gruodis":
        return 11;
      default:
        return new Date().getMonth();
    }
  }

  const yearData = [
    { key: "All", value: translate("All") },
    { key: "1", value: new Date().getFullYear() },
    { key: "2", value: new Date().getFullYear() - 1 },
    { key: "3", value: new Date().getFullYear() - 2 },
  ];

  const monthData = [
    { key: "All", value: translate("All") },
    { key: "0", value: translate("January") },
    { key: "1", value: translate("February") },
    { key: "2", value: translate("March") },
    { key: "3", value: translate("April") },
    { key: "4", value: translate("May") },
    { key: "5", value: translate("June") },
    { key: "6", value: translate("July") },
    { key: "7", value: translate("August") },
    { key: "8", value: translate("September") },
    { key: "09", value: translate("October") },
    { key: "10", value: translate("November") },
    { key: "11", value: translate("December") },
  ];

  const expensesCtx = useContext(ExpenseEntriesContext);

  const sortedExpenses = expensesCtx.expenses.slice().sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const navigator = useNavigation();
  function addPressHandler() {
    navigator.navigate("AddExpense");
  }

  function filterExpenses() {
    const filteredExpenses = sortedExpenses.filter((expense) => {
      if (
        (selectedYear == "All" && selectedMonth == "All") ||
        (selectedYear == "Visi" && selectedMonth == "Visi")
      ) {
        return true;
      } else if (
        (selectedYear != "All" && selectedMonth == "All") ||
        (selectedYear != "Visi" && selectedMonth == "Visi")
      ) {
        return expense.date.getFullYear() == selectedYear;
      } else if (
        (selectedYear != "All" && selectedMonth != "All") ||
        (selectedYear != "Visi" && selectedMonth != "Visi")
      ) {
        return (
          expense.date.getFullYear() == selectedYear &&
          expense.date.getMonth() == getSelectedMonth()
        );
      }
    });
    return filteredExpenses;
  }

  // function renderExpense(itemData) {
  //   if (currentDate.getMonth() != itemData.item.date.getMonth()) {
  //     currentDate = new Date(itemData.item.date);
  //     monthShown = false;
  //   }

  //   if (
  //     monthShown == false &&
  //     (selectedMonth == "All" || selectedMonth == "Visi") &&
  //     (selectedYear == "All" || selectedYear == "Visi")
  //   ) {
  //     monthShown = true;
  //     return (
  //       <>
  //         <View style={styles.dateHeaderContainer}>
  //           <Text style={styles.dateHeaderText}>
  //             {getFormatedDateYM(itemData.item.date)}
  //           </Text>
  //         </View>
  //         <ExpenseEntry itemData={itemData} />
  //       </>
  //     );
  //   } else if (
  //     monthShown == true &&
  //     currentDate.getMonth() == itemData.item.date.getMonth()
  //   ) {
  //     return <ExpenseEntry itemData={itemData} />;
  //   } else if (monthShown == false) {
  //     monthShown = true;
  //     return (
  //       <>
  //         <View style={styles.dateHeaderContainer}>
  //           <Text style={styles.dateHeaderText}>
  //             {getFormatedDateYM(itemData.item.date)}
  //           </Text>
  //         </View>
  //         <ExpenseEntry itemData={itemData} />
  //       </>
  //     );
  //   }
  // }

  function renderExpense(itemData) {
    if (currentDate.getDate() != itemData.item.date.getDate()) {
      currentDate = new Date(itemData.item.date);
      monthShown = false;
    }

    if (
      monthShown == false &&
      (selectedMonth == "All" || selectedMonth == "Visi") &&
      (selectedYear == "All" || selectedYear == "Visi")
    ) {
      monthShown = true;
      return (
        <>
          <View style={styles.dateHeaderContainer}>
            <Text style={styles.dateHeaderText}>
              {getFormatedDateYMD(itemData.item.date)}
            </Text>
          </View>
          <ExpenseEntry itemData={itemData} />
        </>
      );
    } else if (
      monthShown == true &&
      currentDate.getDate() == itemData.item.date.getDate()
    ) {
      return <ExpenseEntry itemData={itemData} />;
    } else if (monthShown == false) {
      monthShown = true;
      return (
        <>
          <View style={styles.dateHeaderContainer}>
            <Text style={styles.dateHeaderText}>
              {getFormatedDateYMD(itemData.item.date)}
            </Text>
          </View>
          <ExpenseEntry itemData={itemData} />
        </>
      );
    }
  }

  function calculateExpensesAmount() {
    let sum = 0;
    const filteredExpenses = filterExpenses();

    filteredExpenses.forEach((expense) => {
      if (expense.type == "expense") {
        sum -= parseFloat(expense.amount);
      } else {
        sum += parseFloat(expense.amount);
      }
    });

    return sum.toFixed(2);
  }

  return (
    <>
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.filterContainer}>
          <View style={styles.filterYear}>
            <SelectList
              setSelected={(val) => setSelectedYear(val)}
              data={yearData}
              save="value"
              // defaultOption={{ key: "All", value: "All" }}
              inputStyles={{
                fontSize: height * 0.02,
                fontWeight: "bold",
                color: GlobalStyles.colors.headerColor,
              }}
              boxStyles={{ backgroundColor: GlobalStyles.colors.backGroundSecondary }}
              dropdownTextStyles={{
                fontSize: height * 0.02,
                fontWeight: "bold",
                color: GlobalStyles.colors.headerColor,
              }}
              dropdownStyles={{
                backgroundColor: GlobalStyles.colors.backGroundSecondaryInactive,
              }}
              search={false}
              placeholder={translate("Select_year")}
            />
          </View>

          <View
            style={[
              styles.filterMonth,
              {
                display:
                  selectedYear === "All" || selectedYear === "Visi"
                    ? "none"
                    : "flex",
              },
            ]}
          >
            <SelectList
              setSelected={(val) => setSelectedMonth(val)}
              data={monthData}
              save="value"
              inputStyles={{
                fontSize: height * 0.02,
                fontWeight: "bold",
                color: GlobalStyles.colors.headerColor,
              }}
              boxStyles={{ backgroundColor: GlobalStyles.colors.backGroundSecondary }}
              dropdownTextStyles={{
                fontSize: height * 0.02,
                fontWeight: "bold",
                color: GlobalStyles.colors.headerColor,
              }}
              dropdownStyles={{
                backgroundColor: GlobalStyles.colors.backGroundSecondaryInactive,
              }}
              search={false}
              placeholder={translate("Select_month")}
            />
          </View>
        </View>
        <View style={styles.expensesAmountContainer}>
          <Text style={styles.expensesAmountText}>
            {translate("Total")}: {"\u20AC"}
            {calculateExpensesAmount()}
          </Text>
        </View>
        <View style={styles.expensesContainer}>
          <FlatList
            data={filterExpenses()}
            renderItem={renderExpense}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
      <RoundButton pressHandler={addPressHandler}>
        <Ionicons name="add" size={height * 0.03} color= {GlobalStyles.colors.iconColor} />
      </RoundButton>
    </>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: height * 0.02,
    paddingHorizontal: height * 0.02,
    justifyContent: "flex-start",
    backgroundColor: GlobalStyles.colors.backgroundMain,
  },
  dateHeaderContainer: {
    paddingVertical: height * 0.01,
    paddingHorizontal: height * 0.01,
  },
  dateHeaderText: {
    fontSize: height * 0.02,
    fontWeight: "bold",
    color: GlobalStyles.colors.headerColor,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  expensesContainer: {
    // marginBottom: 120,
  },

  filterYear: {
    width: "45%",
  },

  filterMonth: {
    width: "45%",
  },
  expensesAmountContainer: {
    justifyContent: "center",
    paddingVertical: height * 0.015,
    paddingHorizontal: height * 0.02,
  },
  expensesAmountText: {
    fontSize: height * 0.03,
    fontWeight: "bold",

    textDecorationLine: "underline",

    color: GlobalStyles.colors.headerColor,
  },
});
