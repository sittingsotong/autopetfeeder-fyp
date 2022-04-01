import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function WelcomeScreen({ setIsLogin, setDetailsPage }) {
  return (
    <View>
      <View style={styles.containerMain}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>

      <View style={styles.containerBottom}>
        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => {
            setDetailsPage(true);
            setIsLogin(false);
          }}
        >
          <Text style={styles.providerButtonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.containerBottomText}>
          <Text>
            <Text style={styles.subText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                setDetailsPage(true);
                setIsLogin(true);
              }}
            >
              <Text style={styles.bottomButtonText}>Sign in</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}
