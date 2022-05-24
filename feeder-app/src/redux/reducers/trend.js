import { Caption } from "react-native-paper";
import { DB_ADD, DB_DELETE, DB_MODIFY } from "../constants";

const initialState = {
  data: [],
};

/* 
data is a list of objects containing
{
  id: unique document id 
  created: date and time the feeding was done (an object of nanoseconds and seconds)
  // TODO: maybe combine created and date into 1, just call it date
  date: js Date object
  portion: portion fed in grams (int)
}
*/

export const trend = (state = initialState, action) => {
  switch (action.type) {
    case DB_ADD:
      // FIXME: need to check if the id already exists
      const index = state.data.findIndex((val) => val.id == action.id);

      if (index == -1) {
        // error, value is new
        return {
          ...state,
          data: [...state.data, action.data],
        };
      } else {
        // value already exists, replace value
        const newData = [...state.data]; // making a new array
        newData[index] = action.data; // changing value in the new array

        return {
          ...state,
          data: newData,
        };
      }

    case DB_MODIFY:
      const valIdx = state.data.findIndex((val) => val.id == action.id);

      const newData = [...state.data];
      newData[valIdx] = action.data;

      return {
        ...state,
        data: newData,
      };

    case DB_DELETE:
      return {
        ...state,
        data: state.data.filter((val) => val.id !== action.id),
      };

    default:
      return state;
  }
};
