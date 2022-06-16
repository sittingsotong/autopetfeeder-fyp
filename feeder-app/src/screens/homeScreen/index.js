import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { feed } from "../../redux/actions/feed";
import {
  getCurrentSchedule,
  updateSchedule,
} from "../../redux/actions/schedule";

import Modal from "react-native-modal";
import AmountSlider from "../../components/home/slider";
import AddSchedule from "../../components/home/addSchedule";
import CustomAlert from "../../components/home/alert";
import ScheduleList from "../../components/home/scheduleList";
import TitleAndLine from "../../components/home/titleAndLine";

import styles from "./styles";
import Colors from "../../colors";

export default function HomeScreen() {
  // get current logged in user object
  const currentUserObj = useSelector((state) => state.auth);
  const currSchedule = useSelector((state) => state.schedule);

  const [portion, setPortion] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  // upon login, update schdule for the user
  useEffect(() => {
    if (currentUserObj.currentUser != null) {
      dispatch(getCurrentSchedule(currentUserObj.currentUser.uid));
    }
  }, [currentUserObj]);

  // on every update of schedule, update firestore db
  useEffect(() => {
    if (currSchedule.loaded == true) {
      dispatch(
        updateSchedule(currentUserObj.currentUser.uid, currSchedule.schedule)
      )
        .then(() => {
          console.log("update schedule successful");
        })
        .catch(() => {
          console.log("update schedule unsuccessful");
        });
    }
  }, [currSchedule.count]);

  // trigger a feed by updating firestore db
  const handleFeed = () => {
    if (portion == 0) {
      setError(true);
      toggleAlert();
    } else {
      dispatch(feed(currentUserObj.currentUser.uid, portion))
        .then(() => {
          console.log("feed successful");
        })
        .catch(() => {
          console.log("feed unsuccessful");
        });

      setError(false);
      toggleAlert();
    }
  };

  // Display modal for choosing feeding schedule
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleAlert = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerTop}>
        <TitleAndLine title="Manual Feeding" />
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
      <CustomAlert
        error={error}
        visible={visible}
        toggleAlert={toggleAlert}
        text={error ? "Cannot feed 0g" : "Feed successful"}
      />
      <Modal
        isVisible={isModalVisible}
        backdropColor={Colors.secondaryColor}
        coverScreen={true}
        backdropOpacity={0.95}
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <AddSchedule toggleModal={toggleModal} />
        </View>
      </Modal>
      <View style={styles.containerBottom}>
        <TitleAndLine title={"Scheduled Feeding"} />
        <ScheduleList schedule={currSchedule.schedule} />
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
