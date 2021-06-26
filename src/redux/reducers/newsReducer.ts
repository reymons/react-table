import { AxiosError } from "axios";
import { newsAPI } from "../../api";
import { INews } from "../../interfaces";
import { INewsReducerState } from "./reducerInterfaces";

const initState: INewsReducerState = {
  newsData: [],
  loadingNews: false,
  errorMessage: ""
}

const SET_NEWS = "SET_NEWS";
const SET_LOADING_NEWS = "SET_LOADING_NEWS";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";

const newsReducer = (state: INewsReducerState = initState, action: any): INewsReducerState => {
  switch(action.type) {
    case SET_NEWS:
      return { ...state, newsData: [...state.newsData, ...action.newsData] }

    case SET_LOADING_NEWS:
      return { ...state, loadingNews: action.isLoadingNews }

    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMsg }

    default:
      return { ...state }
  }
}

const setNews = (newsData: Array<INews>) => ({ type: SET_NEWS, newsData })
const setLoadingNews = (isLoadingNews: boolean) => ({ type: SET_LOADING_NEWS, isLoadingNews })
const setErrorMessage = (message: string) => ({ type: SET_ERROR_MESSAGE, errorMsg: message })

export const fetchNews = (page: number) => (dispatch: any) => {
  dispatch(setLoadingNews(true));

  newsAPI.getByPage(page)
    .then((data: Array<INews>) => {
      dispatch(setNews(data));
      dispatch(setErrorMessage(""));
    })
    .catch((err: AxiosError) => dispatch(setErrorMessage(err.message)))
    .finally(() => dispatch(setLoadingNews(false)))
}

export default newsReducer;