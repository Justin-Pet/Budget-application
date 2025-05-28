import { View, Text, StyleSheet, Dimensions } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";

const { height } = Dimensions.get("window");
/**
 * A component to select whether a payment is reoccuring or not.
 *
 * It renders a BouncyCheckbox with a label next to it.
 * The label is translated based on the selected language.
 *
 * The component accepts two props:
 * @prop {boolean} reoccuringPayment - A boolean indicating whether the payment is reoccuring or not.
 * @prop {function} setReoccuringPayment - A function to set the reoccuringPayment state.
 *
 * When the checkbox is pressed, the handleCheckBoxChange function is called,
 * which sets the reoccuringPayment state to true or false based on the checkbox state.
 *
 * @returns {Component} A component with a BouncyCheckbox and a label.
 */
function ReoccuringPaymentSelector({
  reoccuringPayment,
  setReoccuringPayment,
}) {
  const { translate } = useLanguage();
  /**
   * Sets the reoccuringPayment state to true or false based on the checkbox state.
   * @param {boolean} isChecked - The state of the checkbox.
   */
  function handleCheckBoxChange(isChecked) {
    if (isChecked) {
      setReoccuringPayment(true);
    } else {
      setReoccuringPayment(false);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textContainer}>
        {translate("ReoccuringPayment")}?
      </Text>
      <View>
        <BouncyCheckbox
          fillColor={GlobalStyles.colors.accentColor}
          onPress={(isChecked: boolean) => {
            handleCheckBoxChange(isChecked);
          }}
        />
      </View>
    </View>
  );
}

export default ReoccuringPaymentSelector;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "center",

    alignContent: "center",
    width: "60%",
  },
  textContainer: {
    color: GlobalStyles.colors.tabBarActive,
    fontSize: height * 0.015,

    fontWeight: "bold",
    marginHorizontal: height * 0.015,
  },
});
