import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RegisterForm from "../../components/auth/registerForm";

import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

export default function RegisterScreen({ setIsLogin, setDetailsPage }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Sign Up</Text>
      <Text style={styles.subText}>
        Please fill in your details to create an account.
      </Text>

      <RegisterForm />

      <View style={styles.containerBottom}>
        <Text>
          <Text style={styles.subText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text style={styles.bottomButtonText}>Sign in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
