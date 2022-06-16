import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/actions/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/analytics";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "expo-status-bar";

import MainRoute from "../main";
import AuthRoute from "../auth";

const Stack = createStackNavigator();

export default function Route() {
  // lets us access values in reductor, and updates value of state whenever update occurs
  const currentUserObj = useSelector((state) => state.auth);
  const analytics = firebase.analytics();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  // useEffect(() => {
  //   if (perf != null) {
  //     dispatch(addPerf(perf));
  //   }
  // });

  if (!currentUserObj.loaded) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        {currentUserObj.currentUser == null ? (
          <Stack.Screen
            name="Login"
            component={AuthRoute}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={MainRoute}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
