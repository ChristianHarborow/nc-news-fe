import { useEffect, useState, useContext, useRef } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { getArticle } from '../../api'
import { cleanDateTime, toTitle } from '../../utilities'
import CommentList from './CommentList'
import VoteCounter from '../VoteCounter'
import CommentPoster from './CommentPoster'
import { ErrorContext } from '../../contexts/ErrorContext'
import { Skeleton, Typography } from '@mui/material'

export default function ViewArticlePage() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [commentList, setCommentList] = useState([])
    const {error, setError} = useContext(ErrorContext)
    const navigate = useNavigate()
    const ref = useRef(null);
    
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
        <main className='articlePage'>
            {
                Object.keys(article).length ? 
                    (renderArticle(article, commentList, setCommentList, ref)) : 
                    (
                        <article className='focusedArticle'>
                            <Skeleton width="100%" sx={{ fontSize: '10rem' }}/>
                            <Skeleton variant='rectangular' className='imageSkeleton'/>
                            <Skeleton width="100%" sx={{ fontSize: '10rem' }}/>
                        </article>
                    )
            }
        </main>
    )
}

function renderArticle(article, commentList, setCommentList, ref) {
    const {topic, title, author, created_at, article_img_url, body, votes, article_id} = article

    return (
        <>
            <article className='focusedArticle'>
                <Typography className='articleTitle' component="h2">{`${toTitle(topic)} | ${title}`}</Typography>
                <Typography className='createdInfo'>{`${author} | ${cleanDateTime(created_at)}`}</Typography>
                <img className="focusedArticleImg" src={article_img_url} alt="" />
                <Typography className='articleBody'>{body}</Typography>
            </article>
            <VoteCounter startingVotes={votes} parent_id={article_id}/>
            <CommentPoster article_id={article_id} setCommentList={setCommentList}/>
            <CommentList commentsRef={ref} article_id={article_id} commentList={commentList} setCommentList={setCommentList}/>
        </>
    )
}