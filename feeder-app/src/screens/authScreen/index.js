import React, { useState } from "react";
import { View } from "react-native";
import AuthDetails from "../../components/auth/details";
import AuthMenu from "../../components/auth/menu";

import styles from "./styles";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [detailsPage, setDetailsPage] = useState(false);

  return (
    <View style={styles.container}>
      {detailsPage ? (
        <AuthDetails
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setDetailsPage={setDetailsPage}
        />
      ) : (
        <AuthMenu
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setDetailsPage={setDetailsPage}
        />
      )}
    </View>
  );
}
