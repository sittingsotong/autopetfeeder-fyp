import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import Colors from "../../../colors";

export default function CustomAlert({ error, visible, toggleAlert, text }) {
  return (
    <FancyAlert
      style={styles.alert}
      icon={
        <View
          style={[
            styles.icon,
            {
              backgroundColor: error
                ? Colors.highlightColor
                : Colors.primaryColor,
            },
          ]}
        >
          {error ? (
            <Ionicons name="ios-close" size={36} color="white" />
          ) : (
            <Ionicons name="ios-checkmark" size={36} color="white" />
          )}
        </View>
      }
      visible={visible}
    >
      <View style={styles.content}>
        <Text style={styles.contentText}>{text}</Text>

        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: error
                ? Colors.highlightColor
                : Colors.primaryColor,
            },
          ]}
          onPress={toggleAlert}
        >
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </FancyAlert>
  );
}
