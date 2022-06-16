import React from "react";
import { Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

import { useDispatch } from "react-redux";
import { SCHEDULE_DELETE } from "../../../redux/constants";

import styles from "./styles";

// TESTING
import { performance } from "universal-perf-hooks";

export default function ScheduleList({ schedule }) {
  let keyExtractor = (item, index) => index.toString();

  // Backend handling functions
  const dispatch = useDispatch();

  const handleDeleteSchedule = (index) => {
    dispatch({
      type: SCHEDULE_DELETE,
      index: index,
    });
  };

  // Helper functions for rendering time and days of repeat
  const renderTime = (hour, minute) => {
    // time is an object
    const today = new Date();
    const date = new Date(today.setHours(hour, minute));

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderDays = (days) => {
    const daysMap = {
      1: "SUN",
      2: "MON",
      3: "TUE",
      4: "WED",
      5: "THU",
      6: "FRI",
      7: "SAT",
    };

    let text = "";
    days = days.sort();
    for (let i = 0; i < days.length; i++) {
      text += daysMap[days[i]] + " ";
    }

    return text;
  };

  let renderItem = ({ item, index }) => (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title style={styles.titleString}>
          {renderTime(item.hour, item.minute)}
        </ListItem.Title>
        <ListItem.Subtitle>{renderDays(item.days)}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.portion}g</ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity
        style={styles.providerButton}
        onPress={() => {
          // var startTime = performance.now();

          handleDeleteSchedule(index);

          // var endTime = performance.now();

          // console.log(
          //   `Call to handleDeleteSchedule took ${
          //     endTime - startTime
          //   } milliseconds`
          // );
        }}
      >
        <Text>Remove</Text>
      </TouchableOpacity>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.containerMain}>
      <FlatList
        keyExtractor={keyExtractor}
        data={schedule}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
