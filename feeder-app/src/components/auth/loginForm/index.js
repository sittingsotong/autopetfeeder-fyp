import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions";

import styles from "./styles";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // TODO: clear form fields on fail
  const handleLogin = () => {
    dispatch(login(email, password))
      .then(() => {
        console.log("login successful");
      })
      .catch(() => {
        console.log("login unsuccessful");
      });
  };

  return (
    <View>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholder="Email"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          handleLogin();
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
