import {
  SHOW_MODAL_TO_ADD_SCHEDULE,
  CLOSE_MODAL_TO_ADD_SCHEDULE,
  SET_DATE_FOR_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  isAddScheduleModalVisible: false,
  date: "",
};

const modal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL_TO_ADD_SCHEDULE: {
      return {
        ...state,
        isAddScheduleModalVisible: true,
      };
    }
    case CLOSE_MODAL_TO_ADD_SCHEDULE: {
      return {
        ...state,
        isAddScheduleModalVisible: false,
      };
    }
    case SET_DATE_FOR_MODAL: {
      const { date } = action;

      return {
        ...state,
        date,
      };
    }
    default:
      return state;
  }
};

export default modal;
