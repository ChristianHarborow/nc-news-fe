import axios from "axios";

export function getAllArticles() {
    return axios
    .get("https://nc-news-gdc6.onrender.com/api/articles")
    .then(({data}) => data.articles) 
}