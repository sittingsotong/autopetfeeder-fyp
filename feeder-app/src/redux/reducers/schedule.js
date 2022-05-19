import { SCHEDULE_ADD, SCHEDULE_DELETE, SCHEDULE_UPDATE } from "../constants";

// sets initial state of authUser
const initialState = {
  count: 0,
  schedule: [],
  loaded: false,
};

/* 
schedule = 
{
  hour: int
  minute: int
  portion: int
  days: [1, 2]
}

*/
export const schedule = (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULE_ADD:
      return {
        ...state,
        count: state.count + 1,
        schedule: [...state.schedule, action.schedule],
      };

    // action.schedule must be an array
    case SCHEDULE_UPDATE:
      return {
        ...state,
        count: action.schedule.length,
        schedule: action.schedule,
        loaded: action.loaded,
      };

    case SCHEDULE_DELETE:
      // action.index is the index of element to be removed
      return {
        ...state,
        count: state.count - 1,
        schedule: [
          ...state.schedule.slice(0, action.index),
          ...state.schedule.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
};
