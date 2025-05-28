import { Pressable, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";

const { width } = Dimensions.get("window");
/**
 * A simple icon button component.
 *
 * @param {React.ReactNode} children - children to display
 * @param {function} onPress - function to call when button is pressed
 * @returns {React.ReactNode}
 */
function SimpleIconButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.barButtonView, pressed && styles.pressed]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

export default SimpleIconButton;

const styles = StyleSheet.create({
  barButtonView: {
    backgroundColor: GlobalStyles.colors.primary200,
    // paddingHorizontal: 20,
    paddingVertical: width > 400 ? 5 : 2,
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 5,
    width: "8%",
    alignItems: "center",
    justifyContent: "center",
  },
  barButtonText: {
    textAlign: "center",
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.7,
  },
});
