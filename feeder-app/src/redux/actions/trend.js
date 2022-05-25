import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { DB_ADD, DB_DELETE, DB_MODIFY } from "../constants";

export const dataListener = (userUid) => (dispatch) => {
  firebase
    .firestore()
    .collection(userUid)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const date = data["updated"].toDate();
        date.setHours(0, 0, 0, 0);

        if (change.type === "added") {
          dispatch({
            type: DB_ADD,
            data: {
              ...data,
              date: change.doc.id,
              updated: date,
            },
            date: change.doc.id,
          });
        }
        if (change.type === "modified") {
          dispatch({
            type: DB_MODIFY,
            data: {
              ...data,
              date: change.doc.id,
              updated: date,
            },
            date: change.doc.id,
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
