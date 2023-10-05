import { useEffect } from "react"
import { getArticleComments } from "../../api"
import CommentCard from "./CommentCard"
import { Typography } from "@mui/material"
import { useLocation } from "react-router-dom";

export default function CommentList({article_id, commentList, setCommentList, commentsRef}) {
    const {hash} = useLocation()

    function scrollToComments() {
        commentsRef.current?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
    }

    useEffect(() => {
        getArticleComments(article_id)
        .then((comments) => {
            setCommentList(comments.reverse())
        })
        .then(() => {
            if (hash === "#comments") {
                scrollToComments()
            }
        })
    }, [])

    function renderCommentList() {
        return (
            <>
                <Typography component="h3">{`Comments: ${commentList.length}`}</Typography>
                {
                    commentList.map(comment => {
                        return <CommentCard key={comment.comment_id} comment={comment} setCommentList={setCommentList}/>
                    })
                }
            </>
        )
    }

    return (
        <section ref={commentsRef} id="comments" className="commentList">
            {commentList ? renderCommentList(commentList) : <h3>Loading comments...</h3>}
        </section>
    )
}