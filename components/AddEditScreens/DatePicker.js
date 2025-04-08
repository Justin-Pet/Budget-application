import { Text, Pressable, View, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");
function DatePicker({ date, setDate }) {
  const [showDate, setShowDate] = useState(false);

  const { translate } = useLanguage();

  function showDatePicker() {
    setShowDate(true);
  }

  function onChangeDatePicker(event, selectedDate) {
    const currentDate = selectedDate;
    setDate(currentDate);

    setShowDate(false);
  }
  return (
    <Pressable style={styles.dateContainer} onPress={showDatePicker}>
      <View>
        <Text style={styles.dateText}>
          {translate("ExpenseDate")} {getFormattedDate(date)}
        </Text>
        {showDate && (
          <DateTimePicker
            mode="date"
            value={date}
            onChange={onChangeDatePicker}
            display="spinner"
          />
        )}
      </View>
    </Pressable>
  );
}

export default DatePicker;

const styles = StyleSheet.create({
  dateContainer: {
    width: "60%",
    paddingHorizontal: height * 0.02,
    paddingVertical: height * 0.01,
    borderRadius: 5,
    alignItems: "center",

    backgroundColor: GlobalStyles.colors.backGroundSecondaryInactive,
  },
  dateText: {
    fontSize: height * 0.015,
    color: GlobalStyles.colors.textColor,
  },
});
