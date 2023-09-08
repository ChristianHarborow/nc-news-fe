import { cleanDateTime } from "../../utilities"
import { UserContext } from "../../contexts/UserContext"
import { useContext, useState } from "react"
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, colors} from "@mui/material"
import {deleteComment} from "../../api"
import { ErrorContext } from "../../contexts/ErrorContext"

export default function CommentCard({comment, setCommentList}) {
    const {comment_id, author, created_at, body} = comment
    const { user } = useContext(UserContext)
    const [open, setOpen] = useState(false)
    const {error, setError} = useContext(ErrorContext)
    
    function removeComment() {
        setOpen(false)

        setCommentList(currList => {
            const index = currList.indexOf(comment)
            return currList.toSpliced(index, 1)
        })

        deleteComment(comment_id)
        .catch(() => {
            setError(currError => {
                const newError = {...currError}
                newError.msg = "Failed to delete comment try again later"
                newError.show = true
                return newError
            })
        })
    }
    
    function renderDelete() {
        return (
            <>
                <button onClick={() => setOpen(true)}>Delete</button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Delete this comment?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>This cannot be undone</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} autoFocus>Cancel</Button>
                        <Button sx={{color: "#DA0000"}} onClick={removeComment}>DELETE</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
    
    return (
        <article className="commentCard">
            <span>
                {`${author} | ${cleanDateTime(created_at)}`}
                {author === user.username ? renderDelete() : undefined}
            </span>
            <p>{body}</p>
        </article>
    )
}

