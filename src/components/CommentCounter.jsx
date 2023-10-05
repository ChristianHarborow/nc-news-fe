import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function CommentCounter({comments, articleId}) {
    const navigate = useNavigate()
    return (
        <Button className="commentButton" variant="contained" size="small" onClick={() => navigate(`/article/${articleId}#comments`)}>
            {`Comments ${comments}`}
        </Button>
    )
}