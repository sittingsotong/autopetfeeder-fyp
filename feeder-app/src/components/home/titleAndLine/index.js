import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function TitleAndLine({ title }) {
  return (
    <View style={styles.containerMain}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.hairline} />
    </View>
  );
}
