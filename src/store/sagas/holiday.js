import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  GET_HOLIDAYS_REQUEST,
  GET_HOLIDAYS_SUCCESS,
  GET_HOLIDAYS_FAILURE,
} from "../actions/types";

function getHolidaysAPI(payload) {
  const { year, month } = payload;

  return axios.get(
    `/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=${process.env.REACT_APP_OPENAPI_SERVICE_KEY}&_type=json`,
  );
}

export function* getHolidays(payload) {
  try {
    const { data } = yield call(getHolidaysAPI, payload.data);

    const { items } = data.response.body;

    yield put({
      type: GET_HOLIDAYS_SUCCESS,
      // 공휴일이 없는 달의 경우 items는 빈 문자열
      payload: items ? items.item : items,
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: GET_HOLIDAYS_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchGetHolidays() {
  yield takeLatest(GET_HOLIDAYS_REQUEST, getHolidays);
}
