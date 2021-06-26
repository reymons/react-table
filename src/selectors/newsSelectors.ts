import { INewsReducerState } from "../redux/reducers/reducerInterfaces";

export const getLoadingNews = (state: INewsReducerState) => state.loadingNews;

export const getNews = (state: INewsReducerState) => state.newsData;

export const getErrorMessage = (state: INewsReducerState) => state.errorMessage;