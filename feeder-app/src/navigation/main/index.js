import React from "react";
import { View } from "react-native";

import GraphScreen from "../../screens/graphScreen";
import HomeScreen from "../../screens/homeScreen";
import ProfileScreen from "../../screens/profileScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "../../colors";

const Tab = createMaterialBottomTabNavigator();

// temporary component
const EmptyScreen = () => {
  return <View />;
};

export default function MainRoute() {
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
