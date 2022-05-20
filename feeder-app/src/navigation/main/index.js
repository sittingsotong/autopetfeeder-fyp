import React from "react";
import { View } from "react-native";

import HomeScreen from "../../screens/homeScreen";
import GraphScreen from "../../screens/graphScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
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
        name="Feed"
        component={GraphScreen}
        options={{
          tabBarIcon: () => <Feather name="video" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="ios-paw-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={EmptyScreen}
        options={{
          tabBarIcon: () => <Feather name="user" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}
