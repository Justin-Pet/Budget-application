import { View, StyleSheet, Pressable,Dimensions } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

const {  height } = Dimensions.get("window");

/**
 * A component that renders a round button.
 *
 * @param {{ pressHandler: () => void, children: React.ReactNode, style?: ViewStyle }} props
 * @returns {JSX.Element}
 */
function RoundButton({ pressHandler, children, style }) {
  return (
    <Pressable style={({pressed}) => pressed && styles.pressed} onPressOut={pressHandler}>
      <View style={[styles.rootContainer, style]}>{children}</View>
    </Pressable>
  );
}

export default RoundButton;

const styles = StyleSheet.create({
  rootContainer: {
    width: height > 800 ? 60 : 50,
    height: height > 800 ? 60 : 50,
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.button,

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: height > 800 ? 20 : 10,
    right: 25,
  },
  pressed:{
    opacity: 0.75
  }
});
