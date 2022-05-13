import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { ListItem } from "react-native-elements";
import styles from "./styles";

/*

TODO: decide what information to show between 
days it's repeating, time and portion

TODO: make it such that touching the listitem will toggle 
between these information

TODO: add new schedule function

TODO: how to store the information, in the database?
but how to keep local copy

*/

export default function ScheduleList({ schedule }) {
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
        data={schedule}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
