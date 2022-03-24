import { all } from "redux-saga/effects";

import { watchGetHolidays } from "./holiday";

export default function* rootSaga() {
  yield all([watchGetHolidays()]);
}
