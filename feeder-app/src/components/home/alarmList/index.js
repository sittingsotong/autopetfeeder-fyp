import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { Button, ListItem } from "react-native-elements";
import styles from "./styles";
import { List } from "react-native-paper";

/*

TODO: decide what information to show between 
days it's repeating, time and portion

TODO: make it such that touching the listitem will toggle 
between these information

TODO: better name for AlarmList?

TODO: add new schedule function

TODO: how to store the information, in the database?
but how to keep local copy

 */

const list = [
  {
    time: "1:00PM",
    portion: "40g",
  },
  {
    time: "7:00PM",
    portion: "70g",
  },
];

export default function AlarmList() {
  let keyExtractor = (item, index) => index.toString();

  let renderItem = ({ item }) => (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>{item.time}</ListItem.Title>
        <ListItem.Subtitle>{item.portion}</ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity style={styles.providerButton}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.containerMain}>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
