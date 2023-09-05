import { useEffect, useState } from "react"
import { getAllArticles } from "../../api"
import ArticleCard from "./ArticleCard"

export default function ArticlesList() {
    const [articlesList, setArticlesList] = useState([])

    useEffect(() => {
        getAllArticles()
        .then(articles => {
            setArticlesList(articles)
        })
    }, [])

    return (
        <section className="articleList">
            {articlesList.map(article => <ArticleCard key={article.article_id} article={article}/>)}
        </section>
    )
}