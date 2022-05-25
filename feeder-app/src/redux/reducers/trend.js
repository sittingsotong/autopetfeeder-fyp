import { Caption } from "react-native-paper";
import { DB_ADD, DB_DELETE, DB_MODIFY } from "../constants";

const initialState = {
  data: [],
};

/* 
data is a list of objects containing
{
  date: date string in dd-mm-yy format (unique)
  times: arr of time objects 
  portions: arr of portion (ints)
  sumPortions: total portion fed in grams (int)
}
*/

export const trend = (state = initialState, action) => {
  switch (action.type) {
    case DB_ADD:
      const index = state.data.findIndex((val) => val.date == action.date);

      if (index == -1) {
        // error, data is new
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
      const valIdx = state.data.findIndex((val) => val.date == action.date);

      const newData = [...state.data];
      newData[valIdx] = action.data;

      return {
        ...state,
        data: newData,
      };

    case DB_DELETE:
      return {
        ...state,
        data: state.data.filter((val) => val.date !== action.date),
      };

    default:
      return state;
  }
};
