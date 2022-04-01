import React, { useState } from "react";
import { View } from "react-native";
import LoginScreen from "../../screens/loginScreen";
import RegisterScreen from "../../screens/registerScreen";
import WelcomeScreen from "../../screens/welcomeScreen";

export default function AuthRoute() {
  const [isLogin, setIsLogin] = useState(true);
  const [detailsPage, setDetailsPage] = useState(false);

  return (
    <View>
      {detailsPage ? (
        isLogin ? (
          <LoginScreen
            setIsLogin={setIsLogin}
            setDetailsPage={setDetailsPage}
          />
        ) : (
          <RegisterScreen
            setIsLogin={setIsLogin}
            setDetailsPage={setDetailsPage}
          />
        )
      ) : (
        <WelcomeScreen
          setIsLogin={setIsLogin}
          setDetailsPage={setDetailsPage}
        />
      )}
    </View>
  );
}
