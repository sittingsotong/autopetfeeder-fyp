import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const feed = (portion, userUid) => () =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("user")
      .doc(userUid)
      .update({
        feedNow: portion,
      })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
