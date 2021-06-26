import { INews } from "../../interfaces";

export interface INewsReducerState {
  newsData: Array<INews>;
  loadingNews: boolean;
  errorMessage: string;
}