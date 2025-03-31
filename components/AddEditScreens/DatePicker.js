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
    paddingHorizontal: width > 400 ? 20 : 10,
    paddingVertical: height > 800 ? 10 : 5,
    marginVertical: height > 800 ? 10 : 7,
    borderRadius: 5,
    alignItems: "center",

    backgroundColor: GlobalStyles.colors.backGroundSecondaryInactive,
  },
  dateText: {
    fontSize: height > 800 ? 15 : 12,
    color: GlobalStyles.colors.textColor,
  },
});
