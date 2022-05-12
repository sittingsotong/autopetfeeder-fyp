import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { feed } from "../../redux/actions/feed";

import AmountSlider from "../../components/home/slider";
import AlarmList from "../../components/home/alarmList";

import styles from "./styles";

export default function HomeScreen() {
  // get current logged in user object
  const currentUserObj = useSelector((state) => state.auth);
  const [portion, setPortion] = useState(0);

  const dispatch = useDispatch();

  // TODO: clear form fields on fail
  // TODO: confirm feed alert to prevent spamming
  const handleFeed = () => {
    dispatch(feed(portion, currentUserObj.currentUser.uid))
      .then(() => {
        console.log("feed successful");
      })
      .catch(() => {
        console.log("feed unsuccessful");
      });
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerTop}>
        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => {
            handleFeed();
          }}
        >
          <Text>Feed Now</Text>
        </TouchableOpacity>
        <AmountSlider amount={portion} setAmount={setPortion} />
      </View>
      <View style={styles.containerBottom}>
        <AlarmList />
      </View>
    </View>
  );
}
