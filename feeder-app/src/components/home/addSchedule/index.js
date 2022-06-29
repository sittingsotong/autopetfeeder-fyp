import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";

import DateTimePicker from "@react-native-community/datetimepicker";
import { DayPicker } from "react-native-picker-weekday";
import AmountSlider from "../slider";

import { SCHEDULE_ADD } from "../../../redux/constants";

import styles from "./styles";
import Colors from "../../../colors";
import CustomAlert from "../alert";

// TESTING
import { performance } from "universal-perf-hooks";

function roundDate() {
  var coeff = 1000 * 60 * 5;
  var date = new Date(); //or use any other date
  return new Date(Math.round(date.getTime() / coeff) * coeff);
}

export default function AddSchedule({ toggleModal }) {
  const [date, setDate] = useState(roundDate());
  const [portion, setPortion] = useState(0);
  const [weekdays, setWeekdays] = useState([]);
  // 1 = SUN, 2 = MON, 3 = TUE ...

  // For custom alert
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const toggleAlert = () => {
    setVisible(!visible);
  };

  const handleAddSchedule = () => {
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
            if (portion == 0 || weekdays.length == 0) {
              toggleAlert();
            } else {
              // var startTime = performance.now();

              handleAddSchedule();

              toggleModal();

              // var endTime = performance.now();

              // console.log(
              //   `Call to addSchedule took ${endTime - startTime} milliseconds`
              // );
            }
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
        error={true}
        visible={visible}
        toggleAlert={toggleAlert}
        text="Cannot have empty portion or days"
      />
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
