import {  Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

const { width } = Dimensions.get("window");
/**
 * SimpleButton - A simple button that can be used in various parts of the app.
 *               It is a Pressable component with a Text inside.
 *               The button's style can be customized with the 'style' prop.
 *               The button's text style can be customized with the 'buttonStyleText' prop.
 *               The button's text can be customized with the 'buttonText' prop.
 *               The button's onPress function can be customized with the 'onPress' prop.
 *
 * @param {Object} props - The props to be passed to the component.
 * @param {function} [props.onPress] - The function to be called when the button is pressed.
 * @param {string} [props.buttonText] - The button's text.
 * @param {Object} [props.style] - The style object to be used for the button.
 * @param {Object} [props.buttonStyleText] - The style object to be used for the button's text.
 */
function SimpleButton({
  children,
  onPress,
  buttonText,
  style,
  buttonStyleText,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.barButtonView,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.barButtonText, buttonStyleText, style]}>
        {buttonText}
      </Text>
    </Pressable>
  );
}

export default SimpleButton;

const styles = StyleSheet.create({
  barButtonView: {
    backgroundColor: GlobalStyles.colors.button,
    // paddingHorizontal: 20,
    paddingVertical: width > 400 ? 5 : 2,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    width: "25%",

    justifyContent: "center",
  },
  barButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: width > 400 ? 15 : 10,
    color: GlobalStyles.colors.textColor,
  },

  pressed: {
    opacity: 0.7,
  },
});
