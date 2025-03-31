import PrimaryButton from "../components/AddEditScreens/PrimaryButton";
import AddEditAmount from "../components/AddEditScreens/AddEditAmount";
import AddEditComments from "../components/AddEditScreens/AddEditComments";
import CategoriesPart from "../components/AddEditScreens/CategoriesPart";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { GlobalStyles } from "../constants/GlobalStyles";
import { ExpenseEntriesContext } from "../store/context/ExpenseEntriesContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLanguage } from "../store/context/LanguageContext";
import DatePicker from "../components/AddEditScreens/DatePicker";
import WalletSelector from "../components/AddEditScreens/WalletSelector";

const { width, height } = Dimensions.get("window");
function EditExpense({ route, navigation }) {
  const { translate } = useLanguage();
  const expenseCtx = useContext(ExpenseEntriesContext);
  const navigator = useNavigation();


  const id = route.params.id;
  // const itemData = route.params.itemData;
  const [amount, setAmount] = useState(route.params.amount);
  const [category, setCategory] = useState(route.params.description);
  const [comment, setComment] = useState(route.params.comment);

  const [date, setDate] = useState(new Date(route.params.date));
  const [type, setType] = useState(route.params.type);
  const [currentWallet, setCurrentWallet] = useState(route.params.wallet);

  const originalAmount = route.params.amount;
  const originalType = route.params.type;

  function updateExpense() {
    if (amount === "" || category === "") {
      return alert("Please enter a category and amount");
    } else {
      if (originalType === type) {
        if (type === "expense") {
          expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
          expenseCtx.addWallet(parseFloat(originalAmount), currentWallet);
    
        } else {
          expenseCtx.addWallet(parseFloat(amount), currentWallet);
          expenseCtx.subtractWallet(parseFloat(originalAmount), currentWallet);
    
        }
      } else if (originalType !== type) {
        if (type === "expense") {
          expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
          expenseCtx.subtractWallet(parseFloat(originalAmount), currentWallet);
        
        } else {
          expenseCtx.addWallet(parseFloat(amount), currentWallet);
          expenseCtx.addWallet(parseFloat(originalAmount), currentWallet);
 
        }
      }

      expenseCtx.updateExpense(id, amount, category, date, comment, type, currentWallet);
      navigator.navigate("BottomTabs", { screen: "Summary" });
    }
  }

  function deleteExpense() {
    if (type === "expense") {
      expenseCtx.addWallet(parseFloat(amount), currentWallet);
    } else {
      expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
    }
    expenseCtx.deleteExpense(id);
    navigator.navigate("BottomTabs", { screen: "Summary" });
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={updateExpense}
          style={({ pressed }) => pressed && styles.onPress}
        >
          <Text style={styles.headerText}>{translate("save")}</Text>
        </Pressable>
      ),
    });
  }, [navigation, updateExpense]);
  function getCurrentWallet() {
    if (currentWallet == "wallet" || currentWallet == 1) {
      return translate("Cash");
    }
    else {
      return translate("Bank");
    }
  }
  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <View style={styles.rootContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.amountAndCategoryContainer}>
            <AddEditAmount amount={amount} setAmount={setAmount} />
            <View style={styles.walletContainer}>
              <Text style={styles.walletText}>{translate("WalletUsed")}</Text>
              <Text style={styles.walletText}>{getCurrentWallet()}</Text>
            </View>
            <CategoriesPart
              category={category}
              setCategory={setCategory}
              type={type}
              setType={setType}
            />
          </View>
          <View style={styles.commentsAndDateContainer}>
            <DatePicker date={date} setDate={setDate} />
            <AddEditComments comment={comment} setComment={setComment} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            buttonText={translate("delete")}
            onPress={deleteExpense}
            buttonColor={{ backgroundColor: GlobalStyles.colors.error }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default EditExpense;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,

    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.backgroundMain,
  },
  detailsContainer: {
    flex: 1,

    justifyContent: "space-between",
    alignItems: "center",
  },
  amountAndCategoryContainer: {
    // alignItems: "center",
    width: "100%",
  },

  commentsAndDateContainer: {
    width: "100%",
    alignItems: "center",
  },
  dateContainer: {
    width: width > 400 ? "50%" : "75%",
    paddingHorizontal: width > 400 ? 20 : 10,
    paddingVertical: height > 800 ? 10 : 5,
    borderRadius: 5,
    alignItems: "center",

    borderBottomColor: GlobalStyles.colors.backGroundSecondary,
    backgroundColor: GlobalStyles.colors.backGroundSecondary,
  },
  dateText: {
    fontSize: height > 800 ? 15 : 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.accentColor,
  },
  headerText: {
    color: GlobalStyles.colors.headerColor,
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 30,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: height > 800 ? 30 : 20,
  },
  walletContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  }
  ,
  walletText: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 10,
    color: GlobalStyles.colors.textColor
  },
});
