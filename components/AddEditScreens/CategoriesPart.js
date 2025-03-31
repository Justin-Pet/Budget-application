import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";
import CategoryItem from "./CategoryItem";

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


const { width, height } = Dimensions.get("window");

function CategoriesPart({ category, setCategory, type, setType }) {
  const { translate } = useLanguage();
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentCatType, setCurrentCatType] = useState(type);

  function sendToParent(cat, itemType) {
    setCurrentCategory(cat);
    setCategory(cat);
    setType(itemType);
  }

  function changeTypeToExpense() {
    setCurrentCatType("expense");
  }

  function changeTypeToIncome() {
    setCurrentCatType("income");
  }

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

  return currentCatType === "expense"
    ? showExpenseCategories()
    : showIncomeCategories();
}

export default CategoriesPart;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: height > 800 ? 20 : 15,

  },

  categoriesList: {
    flexDirection: "row",
    justifyContent: "center",
  },

  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: width > 400 ? 50 : 20,
    marginBottom: height > 800 ? 15 : 10,
  },

  activeType: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.backGroundSecondary,
    paddingVertical: height > 800 ? 10 : 5,
    paddingHorizontal: width > 400 ? 20 : 10,
  },
  inactiveType: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.backGroundSecondaryInactive,
    paddingVertical: height > 800 ? 10 : 5,
    paddingHorizontal: width > 400 ? 20 : 10,
  },
  typeText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: height > 800 ? 15 : 12,
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
