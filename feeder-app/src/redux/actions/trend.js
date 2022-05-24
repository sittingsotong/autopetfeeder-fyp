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
        const date = data["created"].toDate();

        if (change.type === "added") {
          dispatch({
            type: DB_ADD,
            data: {
              ...data,
              id: change.doc.id,
              date: date,
              portion: parseInt(data["portion"]),
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
              date: date,
              portion: parseInt(data["portion"]),
            },
            id: change.doc.id,
          });
        }
        if (change.type === "removed") {
          dispatch({
            type: DB_DELETE,
            id: change.doc.id,
          });
        }
      });
    });
};
