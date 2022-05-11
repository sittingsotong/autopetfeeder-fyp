import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import AlarmList from "../../components/home/alarmList";

export default function GraphScreen() {
  return (
    <View style={styles.containerMain}>
      <AlarmList />
    </View>
  );
}
