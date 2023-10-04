import { Button } from "@mui/material"

export default function CommentCounter({comments}) {
    return (
        <Button className="commentButton" variant="contained" size="small">{`Comments ${comments}`}</Button>
    )
}