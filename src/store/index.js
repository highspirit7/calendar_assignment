import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import sagas from "./sagas";

// 사가 미들웨어를 생성해서 스토어에 연결해준다.
const sagaMiddleware = createSagaMiddleware();

// store 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// 사가 미들웨어에서 통합 사가 함수를 실행시킨다.
sagaMiddleware.run(sagas);

export default store;
