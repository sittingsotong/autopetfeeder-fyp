import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/actions";
import CustomAlert from "../../home/alert";

import styles from "./styles";

// TESTING
import { performance } from "universal-perf-hooks";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // For alert
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const toggleAlert = () => {
    setVisible(!visible);
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setText("Passwords don't match");
      toggleAlert();
      return;
    }

    // dispatch data to firebase for registration
    dispatch(register(name, email, password))
      .then(() => {
        console.log("register successful");
      })
      .catch(() => {
        setText("Registration Unsuccessful");
        toggleAlert();
      });
  };

  return (
    <View>
      <TextInput
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
        placeholder="Full Name"
        placeholderTextColor="darkgray"
      />
      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="darkgray"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="darkgray"
      />
      <TextInput
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.textInput}
        secureTextEntry
        placeholder="Confirm Password"
        placeholderTextColor="darkgray"
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          // var startTime = performance.now();

          handleRegister();

          // var endTime = performance.now();

          // console.log(
          //   `Call to handleRegister took ${endTime - startTime} milliseconds`
          // );
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <CustomAlert
        error={true}
        visible={visible}
        toggleAlert={toggleAlert}
        text={text}
      />
    </View>
  );
}
