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
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../constants/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../store/context/LanguageContext";
const { height } = Dimensions.get("window");

function TransferBetweenWallets({ onPress }) {
  const { translate } = useLanguage();
  const navigation = useNavigation();
  const expensesCtx = useContext(ExpenseEntriesContext);
  const [amount, setAmount] = useState("");
  const [primaryWallet, setPrimaryWallet] = useState("wallet");

  /**
   * Checks if the input is a valid number
   */
  const allowedChars = /^[+]?[0-9]*(\.[0-9]*)?$/;
  /**
   * Validates the input string against allowed characters and updates
   * the amount state if valid.
   *
   * @param {string} input - The input string to validate and set as the amount.
   */
  function handleInput(input) {
    if (allowedChars.test(input)) {
      setAmount(input);
    }
  }
  /**
   * Handles the wallet change event by switching the primary wallet
   * between the two available wallets, i.e. "wallet" and "bankWallet".
   */
  function handleWalletChange() {
    if (primaryWallet === "wallet") {
      setPrimaryWallet("bankWallet");
    } else {
      setPrimaryWallet("wallet");
    }
  }
  /**
   * Renders the wallet swap section of the "Transfer between wallets" screen.
   * Depending on the current primary wallet, it displays the wallet amounts
   * of the primary and secondary wallet, with the option to swap the primary
   * wallet on press.
   *
   * @returns {JSX.Element} The rendered wallet swap section.
   */
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

  /**
   * Handles the transfer between wallets by first checking if the amount
   * is empty. If not, it transfers the amount from the primary wallet to
   * the secondary wallet by subtracting the amount from the primary wallet
   * and adding it to the secondary wallet. Finally, it navigates to the
   * "Summary" screen.
   */
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
