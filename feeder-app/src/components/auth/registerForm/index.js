import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/actions";

import styles from "./styles";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("passwords don't match");
      // TODO: make alert look better
      return;
    }

    // dispatch data to firebase for registration
    dispatch(register(name, email, password))
      .then(() => {
        console.log("register successful");
      })
      .catch(() => {
        console.log("register unsuccessful");
      });
  };

  return (
    <View>
      <TextInput
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
        placeholder="Full Name"
      />
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
      <TextInput
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.textInput}
        secureTextEntry
        placeholder="Confirm Password"
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          handleRegister();
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
