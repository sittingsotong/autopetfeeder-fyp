import thunk from "redux-thunk";
import Constants from "expo-constants";
import firebase from "firebase/compat/app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./src/redux/reducers";
import Route from "./src/navigation/route";

const store = createStore(rootReducer, applyMiddleware(thunk));

// only initialise if no apps have already been allocated to the project
if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.web.config.firebase);
}

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}
