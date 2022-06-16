import React, { useEffect } from "react";

import { getCurrentSchedule } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import GraphScreen from "../../screens/graphScreen";
import HomeScreen from "../../screens/homeScreen";
import ProfileScreen from "../../screens/profileScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Colors from "../../colors";

const Tab = createMaterialBottomTabNavigator();

export default function MainRoute() {
  const dispatch = useDispatch();

  const currentUserObj = useSelector((state) => state.auth);

  // upon login, update schedule for the user
  useEffect(() => {
    if (currentUserObj.currentUser != null) {
      dispatch(getCurrentSchedule(currentUserObj.currentUser.uid));
    }
  }, [currentUserObj]);

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: Colors.primaryColor }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="History"
        component={GraphScreen}
        options={{
          tabBarIcon: () => (
            <Entypo name="line-graph" size={22} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="ios-paw-outline" size={22} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Feather name="user" size={22} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}
