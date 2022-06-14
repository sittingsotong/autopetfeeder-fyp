import React, { useState } from "react";
import { View } from "react-native";

import { Dropdown } from "react-native-element-dropdown";

import styles from "./styles";

export default function GraphDropdown({ graph, setGraph, data }) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={graph}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setGraph(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
}
