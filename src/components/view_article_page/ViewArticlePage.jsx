import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getArticle } from '../../api'
import { cleanDateTime, toTitle } from '../../utilities'
import CommentList from './CommentList'
import VoteCounter from '../VoteCounter'
import CommentPoster from './CommentPoster'

export default function ViewArticlePage() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [commentList, setCommentList] = useState([])
    
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
                    (renderArticle(article, commentList, setCommentList)) : 
                    (<h1>Loading Article...</h1>)
            }
        </main>
    )
}

function renderArticle(article, commentList, setCommentList) {
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
            <CommentPoster article_id={article_id} setCommentList={setCommentList}/>
            <CommentList article_id={article_id} commentList={commentList} setCommentList={setCommentList}/>
        </main>
    )
}