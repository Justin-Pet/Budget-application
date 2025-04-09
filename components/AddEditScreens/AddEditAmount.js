import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import { useLanguage } from "../../store/context/LanguageContext";

import { GlobalStyles } from "../../constants/GlobalStyles";

const { width, height } = Dimensions.get("window");
function AddEditAmount({ amount, setAmount, amountFocus = false }) {
  const allowedChars = /^[+]?[0-9]*(\.[0-9]*)?$/;
  const { language, translate } = useLanguage();

  function handleInput(input) {
    if (allowedChars.test(input)) {
      setAmount(input);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <TextInput
        style={styles.amountContainer}
        // placeholder="0"
        maxLength={7}
        keyboardType="numeric"
        value={amount.toString()}
        onChangeText={handleInput}
        autoFocus={amountFocus}
      />
      <Text style={[styles.amountContainer, styles.textBorder]}>
        {translate("amount")}
      </Text>
    </View>
  );
}

export default AddEditAmount;

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
  },
  amountContainer: {
    color: GlobalStyles.colors.primary500,
    fontSize: height * 0.05,
    fontWeight: "bold",
    textAlign: "center",
  },
  textBorder: {
    borderTopWidth: 2,
    fontSize: height * 0.035,
    borderColor: GlobalStyles.colors.primary500,
    width: "50%",
    alignSelf: "center",
  },
});
