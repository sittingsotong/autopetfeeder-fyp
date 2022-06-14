import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { DB_ADD, DB_DELETE, DB_MODIFY } from "../constants";
import { convertTimestamps } from "convert-firebase-timestamp";

export const dataListener = (userUid) => (dispatch) => {
  firebase
    .firestore()
    .collection(userUid)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = convertTimestamps(change.doc.data());
        // const date = data["updated"].toDate();

        var dateParts = change.doc.id.split("-");

        // month is 0-based, that's why we need dataParts[1] - 1
        var dateObj = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        if (change.type === "added") {
          dispatch({
            type: DB_ADD,
            data: {
              ...data,
              id: change.doc.id,
              date: dateObj,
            },
            id: change.doc.id,
          });
        }
        if (change.type === "modified") {
          dispatch({
            type: DB_MODIFY,
            data: {
              ...data,
              id: change.doc.id,
              date: dateObj,
            },
            id: change.doc.id,
          });
        }
        if (change.type === "removed") {
          dispatch({
            type: DB_DELETE,
            date: change.doc.id,
          });
        }
      });
    });
};
