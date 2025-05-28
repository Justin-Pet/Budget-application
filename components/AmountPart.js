import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

const {  height } = Dimensions.get("window");
/**
 * Component that displays an amount and some text in a stylized way.
 *
 * @param {number} amount - the amount to display
 * @param {string} text - the text to display
 * @param {object} containerStyle - styles for the container
 * @returns {JSX.Element}
 */
function AmountPart({ amount, text, containerStyle }) {
  return (
    <View style={[styles.rootContainer, containerStyle]}>
      <Pressable>
        <Text style={styles.amountContainer}>{"\u20AC"}{amount}</Text>
      </Pressable>
      <Text style={[styles.amountContainer, styles.textStyle]}>{text}</Text>
    </View>
  );
}


export default AmountPart;

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.accentColor2,
    padding: height * 0.015,

  },
  amountContainer: {
    color: GlobalStyles.colors.headerColor,
    fontSize: height * 0.05,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle: { 
    fontSize: height * 0.020,
    marginVertical: height * 0.01,},

});
