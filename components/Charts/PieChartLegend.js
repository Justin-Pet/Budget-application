import { StyleSheet, Text, View, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { PieChartColors } from "../../constants/PieChartColors";
import { useLanguage } from "../../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");
function PieChartLegend() {
  const { translate } = useLanguage();
  return (
    <View style={styles.legend}>
      <View style={styles.legendContainer}>
        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.groceries },
          ]}
        >
          {translate("Groceries")}
        </Text>
        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.bills },
          ]}
        >
          {translate("Bills")}
        </Text>
        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.car },
          ]}
        >
          {translate("Car")}
        </Text>

        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.education },
          ]}
        >
          {translate("Education")}
        </Text>
        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.home },
          ]}
        >
          {translate("Home")}
        </Text>
      </View>
      <View style={styles.legendContainer}>
        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.entertainment },
          ]}
        >
          {translate("Entertainment")}
        </Text>
        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.family },
          ]}
        >
          {translate("Family")}
        </Text>
        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.health },
          ]}
        >
          {translate("Health")}
        </Text>
        <Text
          style={[
            styles.legendText,
            { backgroundColor: PieChartColors.colors.other },
          ]}
        >
          {translate("Other")}
        </Text>
      </View>
    </View>
  );
}

export default PieChartLegend;

const styles = StyleSheet.create({
  legendText: {
    width: "15%",
    // backgroundColor: GlobalStyles.colors.primary200,
    marginHorizontal: height * 0.005,
    marginVertical: height * 0.005,
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: height * 0.009,
    color: GlobalStyles.colors.text,
  },
  legend: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "row",
  },
});
