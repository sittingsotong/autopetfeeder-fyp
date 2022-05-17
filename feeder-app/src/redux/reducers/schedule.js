import { SCHEDULE_ADD, SCHEDULE_UPDATE } from "../constants";

// sets initial state of authUser
const initialState = {
  count: 0,
  schedule: [],
};

/* 
schedule = 
{
  time: Date format
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
      };

    default:
      return state;
  }
};
