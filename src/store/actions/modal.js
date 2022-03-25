import {
  SHOW_MODAL_TO_ADD_SCHEDULE,
  CLOSE_MODAL_TO_ADD_SCHEDULE,
  SET_DATE_FOR_MODAL,
} from "./types";

export const showModalToAddSchedule = () => ({
  type: SHOW_MODAL_TO_ADD_SCHEDULE,
});

export const closeModalToAddSchedule = () => ({
  type: CLOSE_MODAL_TO_ADD_SCHEDULE,
});

export const setDateForModal = (date) => ({
  type: SET_DATE_FOR_MODAL,
  date,
});
