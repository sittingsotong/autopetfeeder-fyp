import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DateTimePicker from "@react-native-community/datetimepicker";
import { DayPicker } from "react-native-picker-weekday";
import AmountSlider from "../slider";

import styles from "./styles";
import Colors from "../../../colors";
import { addSchedule } from "../../../redux/actions/schedule";
import { SCHEDULE_ADD } from "../../../redux/constants";
import { createIconSetFromFontello } from "react-native-vector-icons";

export default function AddSchedule({ toggleModal }) {
  const currentUserObj = useSelector((state) => state.auth);
  const currSchedule = useSelector((state) => state.schedule);

  const [date, setDate] = useState(new Date());
  const [portion, setPortion] = useState(0);
  const [weekdays, setWeekdays] = useState([]);
  // 1 = SUN, 2 = MON, 3 = TUE ...

  const [schedule, setSchedule] = useState(null);

  const dispatch = useDispatch();

  // performs SCHEDULE_ADD action to update state
  useEffect(() => {
    if (schedule != null) {
      dispatch({
        type: SCHEDULE_ADD,
        schedule: schedule,
      });
    }
  }, [schedule]);

  // on updated state, update firestore db
  useEffect(() => {
    dispatch(addSchedule(currentUserObj.currentUser.uid, currSchedule.schedule))
      .then(() => {
        console.log("add schedule successful");
      })
      .catch(() => {
        console.log("add schedule unsuccessful");
      });
  }, [currSchedule]);

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
            setSchedule({
              time: date,
              portion: portion,
              days: weekdays,
            });

            toggleModal();
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
