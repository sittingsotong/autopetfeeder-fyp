import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import LoginForm from "../../components/auth/loginForm";

import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

export default function LoginScreen({ setIsLogin, setDetailsPage }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Log In</Text>
      <Text style={styles.subText}>
        Please login to continue using our app.
      </Text>

      <LoginForm />

      <View style={styles.containerBottom}>
        <Text>
          <Text style={styles.subText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text style={styles.bottomButtonText}>Sign up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
