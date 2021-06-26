import { INewsReducerState } from "./redux/reducers/reducerInterfaces";

export interface INews {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}

export interface IReducers {
  news: INewsReducerState
}