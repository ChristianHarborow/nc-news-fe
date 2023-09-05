import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getArticle } from '../../api'
import { cleanDateTime, toTitle } from '../../utilities'

export default function ViewArticlePage() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    
    useEffect(() => {
        getArticle(article_id)
        .then((article) => {
            setArticle(article)
        })
    }, [])

    return (
        <main className="viewArticlePage">
            {
                Object.keys(article).length ? 
                    (renderArticle(article)) : 
                    (<h1>Loading Article...</h1>)
            }
        </main>
    )
}

function renderArticle(article) {
    console.log(article);
    const {topic, title, author, created_at, article_img_url, body} = article

    return (
        <main className='articlePage'>
            <article className='focusedArticle'>
                <h1>{`${toTitle(topic)} | ${title}`}</h1>
                <span>{`${author} | ${cleanDateTime(created_at)}`}</span>
                <img className="focusedArticleImg" src={article_img_url} alt="" />
                <p>{body}</p>
            </article>
        </main>
    )
}