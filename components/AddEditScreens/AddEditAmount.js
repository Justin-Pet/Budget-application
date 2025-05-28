import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { useLanguage } from "../../store/context/LanguageContext";
import { GlobalStyles } from "../../constants/GlobalStyles";

const { height } = Dimensions.get("window");
/**
 * Component for adding or editing an amount.
 *
 * @param {Object} props - The component props.
 * @param {number|string} props.amount - The current amount to display in the input field.
 * @param {function} props.setAmount - Function to update the amount based on user input.
 * @param {boolean} [props.amountFocus=false] - If true, the input field will automatically focus when the component mounts.
 *
 * @returns {JSX.Element} A view containing a text input for the amount and a translated label.
 */

function AddEditAmount({ amount, setAmount, amountFocus = false }) {
  const allowedChars = /^[+]?[0-9]*(\.[0-9]*)?$/;
  const { translate } = useLanguage();

  /**
   * Handles user input for the amount.
   *
   * If the input is valid according to the allowedChars regex, then the setAmount function is called with the input.
   *
   * @param {string} input - The user's input for the amount.
   */
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
