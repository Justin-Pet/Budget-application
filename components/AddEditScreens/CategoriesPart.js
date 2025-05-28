import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";
import CategoryItem from "./CategoryItem";

/**
 * Importing category images
 */
const Groceries = require("../../assets/categories/grocery-cart.png");
const Entertainment = require("../../assets/categories/Entertainment.png");
const Family = require("../../assets/categories/family.png");
const Other = require("../../assets/categories/Other.png");
const Home = require("../../assets/categories/home.png");
const Health = require("../../assets/categories/Health.png");
const Car = require("../../assets/categories/car.png");
const Education = require("../../assets/categories/Education.png");
const Bills = require("../../assets/categories/Bills.png");
const Salary = require("../../assets/categories/Salary.png");
const Gift = require("../../assets/categories/Gift.png");
const OtherIncome = require("../../assets/categories/Other-income.png");

const { height } = Dimensions.get("window");

/**
 * A component for selecting categories for expenses and income.
 *
 * This component displays a list of categories for expenses and income, and
 * allows the user to select a category. It also allows the user to switch
 * between expense and income categories.
 *
 * @param {string} category - The currently selected category.
 * @param {function} setCategory - A function to set the selected category.
 * @param {string} type - The currently selected type, either "expense" or
 * "income".
 * @param {function} setType - A function to set the selected type.
 *
 * @returns {JSX.Element} - A JSX element representing the categories list.
 */
function CategoriesPart({ category, setCategory, type, setType }) {
  const { translate } = useLanguage();
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentCatType, setCurrentCatType] = useState(type);

  /**
   * Function to send the currently selected category and type to the parent
   * component. This function is called when a category is selected.
   * @param {string} cat - The currently selected category.
   * @param {string} itemType - The type of the currently selected category,
   * either "expense" or "income".
   */
  function sendToParent(cat, itemType) {
    setCurrentCategory(cat);
    setCategory(cat);
    setType(itemType);
  }

  /**
   * Changes the currently selected category type to "expense".
   */
  function changeTypeToExpense() {
    setCurrentCatType("expense");
  }

  /**
   * Changes the currently selected category type to "income".
   */
  function changeTypeToIncome() {
    setCurrentCatType("income");
  }

  /**
   * Shows the list of categories for expenses. This list is displayed when the
   * currently selected category type is "expense".
   *
   * @returns {JSX.Element} - A JSX element representing the list of categories
   * for expenses.
   */
  function showExpenseCategories() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.typeContainer}>
          <Pressable
            onPress={changeTypeToExpense}
            style={[
              styles.expenseItem,
              currentCatType === "expense"
                ? styles.activeType
                : styles.inactiveType,
            ]}
          >
            <View>
              <Text style={styles.typeText}>{translate("expense")}</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={changeTypeToIncome}
            style={[
              styles.incomeItem,
              currentCatType === "income"
                ? styles.activeType
                : styles.inactiveType,
            ]}
          >
            <View>
              <Text style={styles.typeText}>{translate("income")}</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.categoriesList}>
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Groceries}
            cat="Groceries"
            itemType="expense"
          />
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Bills}
            cat="Bills"
            itemType="expense"
          />
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Car}
            cat="Car"
            itemType="expense"
          />
        </View>
        <View style={styles.categoriesList}>
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Entertainment}
            cat="Entertainment"
            itemType="expense"
          />
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Family}
            cat="Family"
            itemType="expense"
          />
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Health}
            cat="Health"
            itemType="expense"
          />
        </View>
        <View style={styles.categoriesList}>
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Education}
            cat="Education"
            itemType="expense"
          />
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Home}
            cat="Home"
            itemType="expense"
          />
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Other}
            cat="Other"
            itemType="expense"
          />
        </View>
      </View>
    );
  }

  /**
   * Displays the categories for income type, and switches between expense and
   * income type when the respective buttons are pressed.
   *
   * @returns {JSX.Element} A JSX element displaying the categories for income
   * type.
   */
  function showIncomeCategories() {
    return (
      <View style={[styles.rootContainer]}>
        <View style={styles.typeContainer}>
          <Pressable
            onPress={changeTypeToExpense}
            style={[
              styles.expenseItem,
              currentCatType === "expense"
                ? styles.activeType
                : styles.inactiveType,
            ]}
          >
            <View>
              <Text style={styles.typeText}>{translate("expense")}</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={changeTypeToIncome}
            style={[
              styles.incomeItem,
              currentCatType === "income"
                ? styles.activeType
                : styles.inactiveType,
            ]}
          >
            <View>
              <Text style={styles.typeText}>{translate("income")}</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.categoriesList}>
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Salary}
            cat="Salary"
            itemType="income"
          />
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={Gift}
            cat="Gifts"
            itemType="income"
          />
          <CategoryItem
            currentCategory={currentCategory}
            sendToParent={sendToParent}
            imageUrl={OtherIncome}
            cat="Other_income"
            itemType="income"
          />
        </View>
      </View>
    );
  }

  /**
   * Displays the categories for expense type, and switches between expense and
   * income type when the respective buttons are pressed.
   */
  return currentCatType === "expense"
    ? showExpenseCategories()
    : showIncomeCategories();
}

export default CategoriesPart;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: height * 0.025,
  },

  categoriesList: {
    flexDirection: "row",
    justifyContent: "center",
  },

  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: height * 0.05,
    marginBottom: height * 0.02,
  },

  activeType: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.backGroundSecondary,
    paddingVertical: height * 0.015,
    paddingHorizontal: height * 0.02,
  },
  inactiveType: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.backGroundSecondaryInactive,
    paddingVertical: height * 0.015,
    paddingHorizontal: height * 0.02,
  },
  typeText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: height * 0.02,
  },
  expenseItem: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  incomeItem: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
