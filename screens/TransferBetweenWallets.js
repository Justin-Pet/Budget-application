import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { useContext, useState } from "react";
import { ExpenseEntriesContext } from "../store/context/ExpenseEntriesContext";
import SimpleButton from "../components/SimpleButton";
import RoundButton from "../components/RoundButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../constants/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";
import { useLanguage } from "../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");

function TransferBetweenWallets({ onPress }) {
  const { translate } = useLanguage();
  const navigation = useNavigation();
  const expensesCtx = useContext(ExpenseEntriesContext);
  const [amount, setAmount] = useState("");
  const [primaryWallet, setPrimaryWallet] = useState("wallet");

  const allowedChars = /^[+]?[0-9]*(\.[0-9]*)?$/;
  function handleInput(input) {
    if (allowedChars.test(input)) {
      setAmount(input);
    }
  }
  function handleWalletChange() {
    if (primaryWallet === "wallet") {
      setPrimaryWallet("bankWallet");
    } else {
      setPrimaryWallet("wallet");
    }
  }
  function renderWalletSwap() {
    if (primaryWallet === "wallet") {
      return (
        <View style={styles.walletElementContainer}>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.transferText}>
                {translate("TransferFrom")}:{" "}
              </Text>
              <View style={styles.walletAmountContainer}>
                <Text style={styles.walletText}>{translate("wallet")}:</Text>
                <Text style={styles.amount}>
                  {"\u20AC"}
                  {expensesCtx.wallet.toFixed(2)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.transferText}>
                {translate("TransferTo")}:
              </Text>
              <View style={styles.walletAmountContainer}>
                <Text style={styles.walletText}>
                  {translate("bankWallet")}:
                </Text>
                <Text style={styles.amount}>
                  {"\u20AC"}
                  {expensesCtx.bankWallet.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.transferIconContainer}>
            <Pressable onPress={handleWalletChange}>
              <Ionicons
                name="swap-horizontal"
                size={height * 0.035}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.walletElementContainer}>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.transferText}>
                {translate("TransferFrom")}:{" "}
              </Text>
              <View style={styles.walletAmountContainer}>
                <Text style={styles.walletText}>
                  {translate("bankWallet")}:
                </Text>
                <Text style={styles.amount}>
                  {"\u20AC"}
                  {expensesCtx.bankWallet.toFixed(2)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.transferText}>
                {translate("TransferTo")}:{" "}
              </Text>
              <View style={styles.walletAmountContainer}>
                <Text style={styles.walletText}>{translate("wallet")}:</Text>
                <Text style={styles.amount}>
                  {"\u20AC"}
                  {expensesCtx.wallet.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.transferIconContainer}>
            <Pressable onPress={handleWalletChange}>
              <Ionicons
                name="swap-horizontal"
                size={height * 0.035}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      );
    }
  }

  function handleTransfer() {
    if (amount === "") {
      return alert(translate("AlertAmount"));
    }
    if (primaryWallet === "wallet") {
      expensesCtx.subtractWallet(parseFloat(amount), "wallet");
      expensesCtx.addWallet(parseFloat(amount), "bankWallet");
    } else {
      expensesCtx.subtractWallet(parseFloat(amount), "bankWallet");
      expensesCtx.addWallet(parseFloat(amount), "wallet");
    }
    // setAmount("");
    navigation.navigate("BottomTabs", { screen: "Summary" });
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.headerText}>
        {translate("TransferBetweenWallets")}
      </Text>

      <View style={styles.swapContainer}>
        <View>{renderWalletSwap()}</View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.amountContainer}
            // placeholder="Amount"
            maxLength={7}
            keyboardType="numeric"
            value={amount.toString()}
            onChangeText={handleInput}
            autoFocus={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <SimpleButton
          style={styles.buttonStyle}
          buttonStyleText={styles.buttonStyleText}
          onPress={handleTransfer}
          buttonText={translate("Transfer")}
        />
      </View>
    </View>
  );
}

export default TransferBetweenWallets;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // paddingTop: height * 0.15,
    backgroundColor: GlobalStyles.colors.backgroundMain,
  },

  swapContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: GlobalStyles.colors.backGroundSecondary,
    borderRadius: 12,
  },

  headerText: {
    fontWeight: "bold",
    fontSize: height * 0.035,
    paddingVertical: height * 0.015,
    textAlign: "center",
    color: GlobalStyles.colors.headerColor,
    width: "80%",
  },

  walletElementContainer: {
    marginVertical: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: height * 0.03,
  },
  buttonContainer: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.03,
  },

  buttonStyle: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: height * 0.01,
    borderRadius: 12,
  },
  buttonStyleText: {
    fontSize: height * 0.02,

    color: GlobalStyles.colors.headerColor,
  },

  transferText: {
    fontSize: height * 0.025,
    fontWeight: "bold",
    marginVertical: height * 0.01,
    color: GlobalStyles.colors.textColor,
  },
  walletText: {
    fontSize: height * 0.02,
    color: GlobalStyles.colors.textColor,
  },
  textContainer: {
    flex: 5,
  },
  transferIconContainer: {
    flex: 1,
    alignItems: "flex-end",
    padding: height * 0.01,
    justifyContent: "center",
  },
  amount: {
    fontWeight: "bold",
    fontSize: height * 0.025,
    color: GlobalStyles.colors.accent500,
  },
  walletAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: "40%",
    marginVertical: height * 0.02,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 0,

    backgroundColor: GlobalStyles.colors.backGroundSecondaryInactive,
  },
  amountContainer: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: height * 0.025,
    color: GlobalStyles.colors.textColor,
  },
});
