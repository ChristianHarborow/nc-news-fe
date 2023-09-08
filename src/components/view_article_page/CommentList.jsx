import { useEffect } from "react"
import { getArticleComments } from "../../api"
import CommentCard from "./CommentCard"

export default function CommentList({article_id, commentList, setCommentList}) {
    useEffect(() => {
        getArticleComments(article_id)
        .then((comments) => {
            setCommentList(comments.reverse())
        })
    }, [])

    function renderCommentList() {
        return (
            <>
                <h3>{`Comments: ${commentList.length}`}</h3>
                {
                    commentList.map(comment => {
                        return <CommentCard key={comment.comment_id} comment={comment} setCommentList={setCommentList}/>
                    })
                }
            </>
        )
    }

    return (
        <section className="commentList">
            {commentList ? renderCommentList(commentList) : <h3>Loading comments...</h3>}
        </section>
    )
}