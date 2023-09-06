import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getArticle } from '../../api'
import { cleanDateTime, toTitle } from '../../utilities'
import CommentList from './CommentList'
import VoteCounter from '../VoteCounter'

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
    const {topic, title, author, created_at, article_img_url, body, votes, article_id} = article

    return (
        <main className='articlePage'>
            <article className='focusedArticle'>
                <h1>{`${toTitle(topic)} | ${title}`}</h1>
                <span>{`${author} | ${cleanDateTime(created_at)}`}</span>
                <img className="focusedArticleImg" src={article_img_url} alt="" />
                <p>{body}</p>
            </article>
            <VoteCounter startingVotes={votes} parent_id={article_id}/>
            <CommentList/>
        </main>
    )
}