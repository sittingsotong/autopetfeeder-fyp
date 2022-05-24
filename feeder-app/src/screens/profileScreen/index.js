import React from "react";
import { View } from "react-native";

import TitleAndLine from "../../components/home/titleAndLine";

import styles from "./styles";

export default function ProfileScreen() {
  return (
    <View style={styles.containerMain}>
      <TitleAndLine title={"Profile"} />
    </View>
  );
}
