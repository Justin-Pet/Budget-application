import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

const { width, height } = Dimensions.get("window");
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
