import { View, Text } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";

import styles from "./styles";
import Colors from "../../../colors";

export default function AmountSlider() {
  const [portion, setPortion] = useState(0);

  return (
    <View style={styles.containerMain}>
      <Slider
        style={{ width: 200, height: 40 }}
        value={portion}
        step={10}
        minimumTrackTintColor={Colors.secondaryColor}
        maximumValue={100}
        onValueChange={(value) => setPortion(value)}
      />
      <Text>Value: {portion}g</Text>
    </View>
  );
}
