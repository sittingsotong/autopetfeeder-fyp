import React, { useState } from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DayPicker } from "react-native-picker-weekday";

import styles from "./styles";
import Colors from "../../../colors";
import AmountSlider from "../slider";

export default function AddSchedule({ toggleModal }) {
  const [date, setDate] = useState(new Date());
  const [portion, setPortion] = useState(0);
  const [weekdays, setWeekdays] = useState([]);
  // 1 = SUN, 2 = MON, 3 = TUE ...

  const handleTimeChange = (event, selectedDate) => {
    // const currentDate = selectedDate;
    setDate(selectedDate);
  };

  const handleSubmit = () => {
    // TODO: Add chosen time, days and portion to db
    console.log(weekdays);
    toggleModal();
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => {
            toggleModal();
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        display="spinner"
        mode="time"
        themeVariant="light"
        onChange={handleTimeChange}
      />
      <DayPicker
        weekdays={weekdays}
        setWeekdays={setWeekdays}
        activeColor={Colors.tertiaryColor}
        itemStyles={styles.dayItem}
        textColor="black"
        inactiveColor="lightgrey"
      />
      <AmountSlider amount={portion} setAmount={setPortion} />
    </View>
  );
}
