import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { feed } from "../../redux/actions/feed";

import Modal from "react-native-modal";

import AmountSlider from "../../components/home/slider";
import ScheduleList from "../../components/home/scheduleList";

import styles from "./styles";
import AddSchedule from "../../components/home/addSchedule";
import Colors from "../../colors";

export default function HomeScreen() {
  // get current logged in user object
  const currentUserObj = useSelector((state) => state.auth);
  const currSchedule = useSelector((state) => state.schedule);

  const [portion, setPortion] = useState(0);

  const [isModalVisible, setModalVisible] = useState(false);
  const [schedule, setSchedule] = useState(currSchedule);

  const dispatch = useDispatch();

  // TODO: clear form fields on fail
  // TODO: confirm feed alert to prevent spamming
  const handleFeed = () => {
    dispatch(feed(currentUserObj.currentUser.uid, portion))
      .then(() => {
        console.log("feed successful");
      })
      .catch(() => {
        console.log("feed unsuccessful");
      });
  };

  // Display modal for choosing feeding schedule
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerTop}>
        <AmountSlider amount={portion} setAmount={setPortion} />
        <TouchableOpacity
          style={styles.feedButton}
          onPress={() => {
            handleFeed();
          }}
        >
          <Text>Feed Now</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        backdropColor={Colors.secondaryColor}
        coverScreen={true}
        backdropOpacity={0.9}
      >
        <View style={styles.modalContainer}>
          <AddSchedule toggleModal={toggleModal} />
        </View>
      </Modal>
      <View style={styles.containerBottom}>
        <ScheduleList schedule={schedule} />
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={() => {
            toggleModal();
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
