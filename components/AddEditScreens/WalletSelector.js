import { SelectList } from "react-native-dropdown-select-list";
import { View, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";

const { height } = Dimensions.get("window");
/**
 * A component that allows user to select the wallet to use for a particular
 * expense. The component displays a dropdown list of the two available
 * wallets: Cash wallet and Bank wallet. The user can select one of them and
 * the component will call the `setCurrentWallet` function with the selected
 * wallet type.
 *
 * The component will display the currently selected wallet in the dropdown
 * list. If the currently selected wallet is undefined, the component will
 * default to displaying the Cash wallet.
 *
 * The component will display the options in the language selected by the user.
 *
 * @param {string} currentWallet The currently selected wallet.
 * @param {function} setCurrentWallet A function that will be called with the
 * selected wallet type.
 *
 * @returns {JSX.Element} The WalletSelector component.
 */
function WalletSelector({ currentWallet, setCurrentWallet }) {
  const { translate } = useLanguage();

  /**
   * Calls the `setCurrentWallet` function with the selected wallet type.
   * The function determines the wallet type based on the selected value
   * from the dropdown list. If the selected value is "1" or "Cash wallet",
   * the function calls `setCurrentWallet` with "wallet". Otherwise, it calls
   * it with "bankWallet".
   *
   * @param {string} wallet The selected value from the dropdown list.
   */
  function changeCurrentWallet(wallet) {
    if (wallet == "1" || wallet == "Cash wallet") {
      setCurrentWallet("wallet");
    } else {
      setCurrentWallet("bankWallet");
    }
  }

  /**
   * Returns the default value to be displayed in the dropdown list based on
   * the value of `currentWallet`. If `currentWallet` is undefined, the default
   * value is the Cash wallet. If `currentWallet` is "wallet", the default value
   * is the Cash wallet. Otherwise, the default value is the Bank wallet.
   *
   * The function returns an object with two properties: `key` and `value`. The
   * `key` property is the key of the default value in the dropdown list and the
   * `value` property is the translated string for the default value.
   */
  function getDefaultValue() {
    if (currentWallet == undefined) {
      return { key: "1", value: translate("CashWallet") };
    } else {
      if (currentWallet == "wallet") {
        return { key: "1", value: translate("CashWallet") };
      } else {
        return { key: "2", value: translate("BankWallet") };
      }
    }
  }
  return (
    <View style={styles.rootContainer}>
      <SelectList
        setSelected={(val) => changeCurrentWallet(val)}
        data={[
          { key: "1", value: translate("CashWallet") },
          { key: "2", value: translate("BankWallet") },
        ]}
        boxStyles={{
          justifyContent: "center",
          alignContent: "center",
          // backgroundColor: GlobalStyles.colors.backGroundSecondary,
          borderWidth: 0,
        }}
        inputStyles={{
          fontSize: height * 0.017,
          fontWeight: "bold",
        }}
        alignItems="center"
        dropdownStyles={{
          position: "absolute",
          backgroundColor: GlobalStyles.colors.backGroundSecondary,
          alignItems: "center",
          width: "100%",
          zIndex: 999,
          borderWidth: 1,
          borderColor: GlobalStyles.colors.headerColor,
        }}
        save="value"
        // defaultOption={{ key: "1", value: "Cash wallet" }}
        // defaultOption={currentWallet == undefined ? { key: "1", value: "Cash wallet" } : { key: "2", value: "Bank wallet" }}
        defaultOption={getDefaultValue()}
      />
    </View>
  );
}

export default WalletSelector;

const styles = StyleSheet.create({
  rootContainer: {
    width: "50%",
    marginTop: height * 0.02,
  },
});
