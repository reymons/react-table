import axios from "axios"

const instance = axios.create({
  baseURL: "https://api.hnpwa.com/v0/"
})

export const newsAPI = {
  getByPage(page: number) {
    return instance.get(`/news/${page}.json`).then(res => res.data);
  }
}