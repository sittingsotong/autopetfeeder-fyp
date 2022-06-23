import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import TitleAndLine from "../../components/home/titleAndLine";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

import styles from "./styles";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const handleLogout = () => {
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
