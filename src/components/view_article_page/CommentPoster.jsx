import { useState, useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { postComment } from "../../api"

export default function CommentPoster({article_id, setCommentList}) {
    const [comment, setComment] = useState("")
    const { user } = useContext(UserContext)
    const {error, setError} = useContext(ErrorContext)

    function handleChange(event) {
        setComment(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        const body = comment.trim()
        setComment("")

        postComment(article_id, user.username, body)
        .then((newComment) => {
            setCommentList((commentList) => {
                return [newComment, ...commentList]
            })
        })
        .catch(() => {
            setError(currError => {
                const newError = {...currError}
                newError.msg = "Failed to post comment try again later"
                newError.show = true
                return newError
            })
        })
        
    }

    return (
        <form className="commentPoster" onSubmit={handleSubmit}>
            <textarea maxLength="400" cols="999" value={comment} onChange={handleChange}/>
            <div>
                <button disabled={comment.trim() === ""}>Post Comment</button>
                <p className="charCounter">{`${comment.length}/400`}</p>
            </div>
        </form>
    )
}