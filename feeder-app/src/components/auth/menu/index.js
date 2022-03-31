import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function AuthMenu({ isLogin, setIsLogin, setDetailsPage }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      <TouchableOpacity
        style={styles.providerButton}
        onPress={() => {
          setDetailsPage(true);
          setIsLogin(false);
        }}
      >
        <Text style={styles.providerButtonText}>Get Started</Text>
      </TouchableOpacity>

      <View style={styles.containerBottom}>
        <Text>
          <Text style={styles.subText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => setDetailsPage(true)}>
            <Text style={styles.bottomButtonText}>Sign in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
