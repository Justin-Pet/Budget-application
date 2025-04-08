import {
  View,
  Button,
  StyleSheet,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";

const { width, height } = Dimensions.get("window");
function PrimaryButton({ onPress, buttonText, buttonColor }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        buttonColor,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{buttonText}</Text>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "70%",
    padding: height * 0.015,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.accent500,
    marginTop: height * 0.02,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: height * 0.025,
    color: GlobalStyles.colors.primary700,
  },
  pressed: {
    opacity: 0.75,
  },
});
