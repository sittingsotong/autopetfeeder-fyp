import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions";
import CustomAlert from "../../home/alert";

import styles from "./styles";

// TESTING
import { performance } from "universal-perf-hooks";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  // TODO: clear form fields on fail
  const handleLogin = () => {
    dispatch(login(email, password))
      .then(() => {
        console.log("login successful");
      })
      .catch(() => {
        toggleAlert();
        setPassword("");
        console.log("login unsuccessful");
      });
  };

  const toggleAlert = () => {
    setVisible(!visible);
  };

  return (
    <View>
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

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          // var startTime = performance.now();

          handleLogin();

          // var endTime = performance.now();

          // console.log(
          //   `Call to handleLogin took ${endTime - startTime} milliseconds`
          // );
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <CustomAlert
        error={true}
        visible={visible}
        toggleAlert={toggleAlert}
        text={"Login Failed"}
      />
    </View>
  );
}
