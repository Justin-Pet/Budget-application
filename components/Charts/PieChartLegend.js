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
      </View>
      <View style={styles.legendContainer}>
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
    width: "25%",
    // backgroundColor: GlobalStyles.colors.primary200,
    marginHorizontal: height > 800 ? 5 : 3,
    marginVertical: height > 800 ? 3 : 2,
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: height > 800 ? 13 : 8,
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
