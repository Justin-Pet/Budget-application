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
    padding: height > 800 ? 15 : 7,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.accent500,
    marginTop: height > 800 ? 25 : 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: width > 400 ? 25 : 20,
    color: GlobalStyles.colors.primary700,
  },
  pressed: {
    opacity: 0.75,
  },
});
