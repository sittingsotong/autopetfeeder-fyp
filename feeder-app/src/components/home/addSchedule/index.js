import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";

import DateTimePicker from "@react-native-community/datetimepicker";
import { DayPicker } from "react-native-picker-weekday";
import AmountSlider from "../slider";

import { SCHEDULE_ADD } from "../../../redux/constants";

import styles from "./styles";
import Colors from "../../../colors";

export default function AddSchedule({ toggleModal }) {
  const [date, setDate] = useState(new Date());
  const [portion, setPortion] = useState(0);
  const [weekdays, setWeekdays] = useState([]);
  // 1 = SUN, 2 = MON, 3 = TUE ...

  const dispatch = useDispatch();

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
            toggleModal();

            // sends SCHEDULE_ADD message to add schedule to state
            dispatch({
              type: SCHEDULE_ADD,
              schedule: {
                hour: date.getHours(),
                minute: date.getMinutes(),
                portion: portion,
                days: weekdays,
              },
            });
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        // TODO: fix bug where not changing the value doesnt update time to intervals of 5min
        display="spinner"
        mode="time"
        themeVariant="light"
        minuteInterval={5}
        onChange={(e, newDate) => {
          setDate(newDate);
        }}
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
