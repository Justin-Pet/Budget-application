import { StyleSheet, Text, View, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { PieChartColors } from "../../constants/PieChartColors";
import { useLanguage } from "../../store/context/LanguageContext";

const {  height } = Dimensions.get("window");
/**
 * Component to render a legend for the pie chart, displaying the name of each
 * category and its corresponding color.
 *
 * The legend is split into two rows to make it easier to read and understand.
 * The first row contains the following categories: Groceries, Bills, Car, Education,
 * Home.
 * The second row contains the following categories: Entertainment, Family, Health, Other.
 *
 * Each category is represented by a colored rectangle with a bold text
 * displaying the name of the category in the user's language.
 *
 * @return {ReactElement} The rendered legend component.
 */
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
    marginHorizontal: height * 0.005,
    marginVertical: height * 0.005,
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: height * 0.009,
    color: GlobalStyles.colors.text,
  },
  legend: {
    justifyContent: "center",
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "row",
  },
});
