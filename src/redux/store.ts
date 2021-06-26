import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { IReducers } from "../interfaces";
import newsReducer from "./reducers/newsReducer";

const reducers = combineReducers<IReducers>({
  news: newsReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;