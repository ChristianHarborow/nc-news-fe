import { useEffect, useState, useContext } from "react"
import { getArticles } from "../../api"
import ArticleCard from "./ArticleCard"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { ErrorContext } from '../../contexts/ErrorContext'

export default function ArticlesList({resetQueryInputs}) {
    const [articlesList, setArticlesList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const {error, setError} = useContext(ErrorContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        getArticles(searchParams)
        .then(articles => {
            setArticlesList(articles)
        })
        .catch((err) => {
            if (err.response.status === 404) {
                setError(currError => {
                    const newError = {...currError}
                    newError.msg = `Topic: "${searchParams.get("topic")}" not found`
                    newError.show = true
                    return newError
                })
                navigate(`/articles`)
                resetQueryInputs()
            }
            else if (err.response.status === 400) {
                setError(currError => {
                    const newError = {...currError}
                    newError.msg = `Invalid sort query`
                    newError.show = true
                    return newError
                })
                navigate(`/articles`)
                resetQueryInputs()
            }
        })
        .catch((err) => {
            setError(currError => {
                const newError = {...currError}
                newError.msg = `Failed to load articles, try again later`
                newError.show = true
                return newError
            })
        })
    }, [location])

    return (
        <section className="articleList">
            {
                articlesList.length ? 
                articlesList.map(article => <ArticleCard key={article.article_id} article={article}/>) :
                <h1>Loading Articles...</h1>
            }
        </section>
    )
}