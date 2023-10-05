import { useState, useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { postComment } from "../../api"
import { Button, FormControl, TextField, Typography } from "@mui/material"

export default function CommentPoster({article_id, setCommentList}) {
    const [comment, setComment] = useState("")
    const { user } = useContext(UserContext)
    const {error, setError} = useContext(ErrorContext)
    const [show, setShow] = useState(false)
    const maxLength = 300

    function handleChange(event) {
        if (event.target.value.length <= maxLength) {
            setComment(event.target.value)
        }
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

    function handleCancel() {
        setShow(false)
        setComment("")
    }

    return (
        show ? 
            <FormControl className="commentPoster">
                <div style={{position: "relative"}}>
                    <TextField multiline fullWidth value={comment} onChange={handleChange} className="commentInput"/>
                    <Typography className="commentCharLimit">{`${comment.length}/${maxLength}`}</Typography>
                </div>
                <div style={{display: "flex", justifyContent: "space-evenly", marginTop: 10}}>
                    <Button variant="contained" onClick={handleCancel} className="commentButton">Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit} disabled={comment.trim() === ""} className="commentButton">Submit</Button>
                </div>
            </FormControl>
        :
            <Button variant="contained" onClick={() => setShow(true)} style={{marginTop: "2rem"}} className="commentButton">Add Comment</Button>
    )
}