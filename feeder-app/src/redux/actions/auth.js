import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { USER_STATE_CHANGE } from "../constants";

// dispatch to reducer to trigger update and UI
export const userAuthStateListener = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(getCurrentUserData());
    } else {
      dispatch({
        type: USER_STATE_CHANGE,
        currentUser: null,
        loaded: true,
      });
    }
  });
};

// query from firestore db to get user data
export const getCurrentUserData = () => (dispatch) => {
  firebase
    .firestore()
    .collection("user")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot((res) => {
      if (res.exists) {
        return dispatch({
          type: USER_STATE_CHANGE,
          currentUser: res.get("userData"),
          loaded: true,
        });
      }
    });
};

/// dispatches a promise to connect to backend
export const login = (email, password) => () =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });

export const register = (fullName, email, password) => () =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const uid = res.user.uid;
        const data = {
          uid: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("user");

        usersRef.doc(uid).set({ userData: data }, { merge: true });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });

export const logout = () => () =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
