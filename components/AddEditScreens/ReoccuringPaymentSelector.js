import { View, Text, StyleSheet, Dimensions } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");
function ReoccuringPaymentSelector({
  reoccuringPayment,
  setReoccuringPayment,
}) {
  const { translate } = useLanguage();
  function handleCheckBoxChange(isChecked) {
    if (isChecked) {
      setReoccuringPayment(true);
    } else {
      setReoccuringPayment(false);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textContainer}>
        {translate("ReoccuringPayment")}?
      </Text>
      <View>
        <BouncyCheckbox
          fillColor={GlobalStyles.colors.accentColor}
          onPress={(isChecked: boolean) => {
            handleCheckBoxChange(isChecked);
          }}
        />
      </View>
    </View>
  );
}

export default ReoccuringPaymentSelector;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "center",

    alignContent: "center",
    width: "60%",
  },
  textContainer: {
    color: GlobalStyles.colors.tabBarActive,
    fontSize: height * 0.015,

    fontWeight: "bold",
    marginHorizontal: height * 0.015,
  },
});
