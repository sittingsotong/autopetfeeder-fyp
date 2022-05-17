import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { SCHEDULE_ADD, SCHEDULE_UPDATE } from "../constants";

export const getCurrentSchedule = (userUid) => (dispatch) => {
  firebase
    .firestore()
    .collection("user")
    .doc(userUid)
    .onSnapshot((res) => {
      if (res.exists) {
        if (res.get("schedule")) {
          dispatch({
            type: SCHEDULE_UPDATE,
            schedule: res.get("schedule"),
          });
        } else {
          dispatch({
            type: SCHEDULE_UPDATE,
            schedule: [],
          });
        }
      }
    });
};

export const addSchedule = (userUid, schedule) => () =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("user")
      .doc(userUid)
      .update({
        schedule: schedule,
      })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
