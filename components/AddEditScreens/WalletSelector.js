import { SelectList } from "react-native-dropdown-select-list";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useEffect, useState } from "react";
import { useLanguage } from "../../store/context/LanguageContext";

function WalletSelector({ currentWallet, setCurrentWallet }) {

  const { translate } = useLanguage();


  function changeCurrentWallet(wallet) {
    if (wallet == "1" || wallet == "Cash wallet") {
      setCurrentWallet("wallet");
    } else {
      setCurrentWallet("bankWallet");
    }
  }

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
          backgroundColor: GlobalStyles.colors.backGroundSecondary,
          borderWidth: 0,
        }}
        inputStyles={{
          fontSize: 15,
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
          borderColor: GlobalStyles.colors.headerColor
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
    width: "40%",
  },
});
