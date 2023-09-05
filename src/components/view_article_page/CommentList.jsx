import { useEffect, useState } from "react"
import { getArticleComments } from "../../api"
import {useParams} from 'react-router-dom'
import CommentCard from "./CommentCard"

export default function CommentList() {
    const {article_id} = useParams()
    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        getArticleComments(article_id)
        .then((comments) => {
            console.log(comments);
            setCommentList(comments)
        })
    }, [])

    return (
        <section className="commentList">
            {commentList ? renderCommentList(commentList) : <h3>Loading comments...</h3>}
        </section>
    )
}

function renderCommentList(commentList) {
    return (
        <>
            <h3>{`Comments: ${commentList.length}`}</h3>
            {
                commentList.map(comment => {
                    return <CommentCard key={comment.comment_id} comment={comment}/>
                })
            }
        </>
    )
}