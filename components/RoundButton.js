import { View, Text, StyleSheet, Pressable,Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/GlobalStyles";

const { width, height } = Dimensions.get("window");

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
    // bottom: -65,
    // right: -175,
    bottom: height > 800 ? 20 : 10,
    right: 50,
  },
  pressed:{
    opacity: 0.75
  }
});
