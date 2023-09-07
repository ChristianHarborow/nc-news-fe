import { useEffect, useState } from "react"
import { getArticles } from "../../api"
import ArticleCard from "./ArticleCard"
import { useSearchParams } from "react-router-dom"

export default function ArticlesList({topic}) {
    const [articlesList, setArticlesList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getArticles(searchParams)
        .then(articles => {
            setArticlesList(articles)
        })
    }, [topic])

    return (
        <section className="articleList">
            {articlesList.map(article => <ArticleCard key={article.article_id} article={article}/>)}
        </section>
    )
}