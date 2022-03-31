import { StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/redux/reducers";
import AuthScreen from "./src/screens/auth";

import Constants from "expo-constants";
import firebase from "firebase/compat/app";

const store = createStore(rootReducer, applyMiddleware(thunk));

// only initialise if no apps have already been allocated to the project
if (firebase.apps.length == 0) {
  firebase.initializeApp(Constants.manifest.web.config.firebase);
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
