import { DB_ADD, DB_DELETE, DB_MODIFY } from "../constants";

const initialState = {
  data: [],
};

/* 
data is a list of objects containing
{
  date: dd-mm-yy string (unique identifier)
  day: date object

  feeding: arr of feeding objects
    portion: int 
    feedTime: date obj (not parsed)

  sumPortions: total portion fed in grams (int)

  remaining: arr of prediction objects
    prediction: int
    predTime: date obj (not parsed)
  
  updated: date obj of last update time
}
*/

export const trend = (state = initialState, action) => {
  switch (action.type) {
    case DB_ADD:
      const index = state.data.findIndex((val) => val.id == action.id);

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
