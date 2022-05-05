import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import AmountSlider from "../../components/home/slider";

export default function HomeScreen() {
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerBottom}>
        <TouchableOpacity style={styles.providerButton}>
          <Text>Feed Now</Text>
        </TouchableOpacity>
        <AmountSlider />
      </View>
    </View>
  );
}
