import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Colors from "../../colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../../screens/homeScreen";
import GraphScreen from "../../screens/graphScreen";

const Tab = createMaterialBottomTabNavigator();

// temporary component
const EmptyScreen = () => {
  return <View />;
};

// TODO: make icons change between white and black to indicate currently open screen

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
            <MaterialIcons name="pets" size={20} color="black" />
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
