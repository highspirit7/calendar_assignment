import {
  SHOW_MODAL_TO_ADD_SCHEDULE,
  CLOSE_MODAL_TO_ADD_SCHEDULE,
} from "../actions/types";

const INITIAL_STATE = {
  isAddScheduleModalVisible: false,
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
    default:
      return state;
  }
};

export default modal;
