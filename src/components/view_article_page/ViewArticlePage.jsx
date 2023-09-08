import { useEffect, useState, useContext } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { getArticle } from '../../api'
import { cleanDateTime, toTitle } from '../../utilities'
import CommentList from './CommentList'
import VoteCounter from '../VoteCounter'
import CommentPoster from './CommentPoster'
import { ErrorContext } from '../../contexts/ErrorContext'

export default function ViewArticlePage() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [commentList, setCommentList] = useState([])
    const {error, setError} = useContext(ErrorContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        getArticle(article_id)
        .then((article) => {
            setArticle(article)
        })
        .catch((err) => {
            if (err.response.status === 404) {
                setError(currError => {
                    const newError = {...currError}
                    newError.msg = `Article ${article_id} not found`
                    newError.show = true
                    return newError
                })
                navigate(`/articles`)
            }
            else if (err.response.status === 400) {
                setError(currError => {
                    const newError = {...currError}
                    newError.msg = `Invalid article ID`
                    newError.show = true
                    return newError
                })
                navigate(`/articles`)
            }
        })
        .catch((err) => {
            setError(currError => {
                const newError = {...currError}
                newError.msg = `Article failed to load try again later`
                newError.show = true
                return newError
            })
        })
    }, [])

    return (
        <>
            {
                Object.keys(article).length ? 
                    (renderArticle(article, commentList, setCommentList)) : 
                    (<h1>Loading Article...</h1>)
            }
        </>
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