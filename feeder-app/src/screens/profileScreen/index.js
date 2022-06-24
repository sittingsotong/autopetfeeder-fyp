import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import TitleAndLine from "../../components/home/titleAndLine";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";

import styles from "./styles";

export default function ProfileScreen() {
  const unsub = useSelector((state) => state.trend.unsub);
  const currentUserObj = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (unsub) {
      unsub();
    }
    dispatch(logout())
      .then(() => {
        console.log("logout successful");
      })
      .catch(() => {
        toggleAlert();
        setPassword("");
        console.log("logout unsuccessful");
      });
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerTop}>
        <TitleAndLine title={"Profile"} />
        <View style={styles.profileGrid}>
          <Text style={styles.titleText}>
            Username: {currentUserObj ? currentUserObj.fullName : ""}
          </Text>
        </View>
        <Text style={styles.titleText}>
          Email: {currentUserObj ? currentUserObj.email : ""}
        </Text>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleLogout()}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
