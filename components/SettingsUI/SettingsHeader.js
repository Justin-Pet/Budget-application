import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
const { width, height } = Dimensions.get("window");
function SettingsHeader({ headerText }) {
  return <Text style={styles.headerText}>{headerText}</Text>;
}

export default SettingsHeader;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: width > 400 ? 30 : 23,
    textDecorationLine: "underline",
    color: GlobalStyles.colors.headerColor,
  },
});
