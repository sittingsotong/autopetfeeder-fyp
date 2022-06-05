import { View, Text } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";

import styles from "./styles";
import Colors from "../../../colors";

export default function AmountSlider({ amount, setAmount }) {
  return (
    <View style={styles.containerMain}>
      <Slider
        style={{ width: 200, height: 40 }}
        value={amount}
        step={5}
        minimumTrackTintColor={Colors.tertiaryColor}
        maximumValue={100}
        onValueChange={(amount) => setAmount(amount)}
      />
      <Text>Feed Amount: {amount}g</Text>
    </View>
  );
}
