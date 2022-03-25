import {
  SHOW_MODAL_TO_ADD_SCHEDULE,
  CLOSE_MODAL_TO_ADD_SCHEDULE,
} from "./types";

export const showModalToAddSchedule = () => ({
  type: SHOW_MODAL_TO_ADD_SCHEDULE,
});

export const closeModalToAddSchedule = () => ({
  type: CLOSE_MODAL_TO_ADD_SCHEDULE,
});
