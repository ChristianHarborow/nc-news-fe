import axios from "axios";

export function getAllArticles() {
    return axios
    .get("https://nc-news-gdc6.onrender.com/api/articles")
    .then(({data}) => data.articles) 
}

export function getArticle(article_id) {
    return axios
    .get(`https://nc-news-gdc6.onrender.com/api/articles/${article_id}`)
    .then(({data}) => data.article) 
}

export function getArticleComments(article_id) {
    return axios
    .get(`https://nc-news-gdc6.onrender.com/api/articles/${article_id}/comments`)
    .then(({data}) => data.comments) 
}

export function patchArticleVotes(article_id, incVotes) {
    return axios
    .patch(`https://nc-news-gdc6.onrender.com/api/articles/${article_id}`, {inc_votes: incVotes})
}

export function postComment(article_id, author, body) {
    return axios
    .post(`https://nc-news-gdc6.onrender.com/api/articles/${article_id}/comments`, {author, body})
    .then(({data}) => data.comment)
}