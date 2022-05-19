import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import ScheduleList from "../../components/home/scheduleList";

export default function GraphScreen() {
  return (
    <View style={styles.containerMain}>
      <ScheduleList />
    </View>
  );
}
