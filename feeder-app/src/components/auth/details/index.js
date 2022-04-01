import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { login, register } from "../../../redux/actions";

import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

export default function AuthDetails({ isLogin, setIsLogin, setDetailsPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(email, password))
      .then(() => {
        console.log("login successful");
      })
      .catch(() => {
        console.log("login unsuccessful");
      });
  };

  const handleRegister = () => {
    // dispatch
    dispatch(register(email, password))
      .then(() => {
        console.log("register successful");
      })
      .catch(() => {
        console.log("register unsuccessful");
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{isLogin ? "Log In" : "Sign Up"}</Text>
      <Text style={styles.subText}>
        {isLogin
          ? "Please login to continue using our app."
          : "Please fill in your details to create an account."}
      </Text>
      {isLogin ? (
        <></>
      ) : (
        <TextInput
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
          placeholder="Full Name"
        />
      )}
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
      {/* TODO: add re-enter password */}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          isLogin ? handleLogin() : handleRegister();
        }}
      >
        <Text style={styles.buttonText}>{isLogin ? "Sign In" : "Sign Up"}</Text>
      </TouchableOpacity>

      <View style={styles.containerBottom}>
        <Text>
          {isLogin ? (
            <Text style={styles.subText}>Don't have an account? </Text>
          ) : (
            <Text style={styles.subText}>Already have an account? </Text>
          )}
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? (
              <Text style={styles.bottomButtonText}>Sign up</Text>
            ) : (
              <Text style={styles.bottomButtonText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
