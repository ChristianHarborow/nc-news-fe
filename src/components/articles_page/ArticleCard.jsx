import { cleanDateTime, toTitle} from "../../utilities"
import VoteCounter from "../VoteCounter"
import CommentCounter from "../CommentCounter"
import {useNavigate} from "react-router-dom"
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

export default function ArticleCard({article}) {
    const navigate = useNavigate()
    const {article_id, topic, title, author, created_at, article_img_url, votes, comment_count} = article
    
    return (
        <Card className="articleCard" >
            <CardActionArea>
            <CardContent className="cardContent">
                <div onClick={() => navigate(`/article/${article_id}`)}>
                    <Typography className="cardHeader">{`${toTitle(topic)} | ${title}`}</Typography>
                    <Typography className="cardText">{`${author} | ${cleanDateTime(created_at)}`}</Typography>
                    <CardMedia component="img" image={article_img_url} className="articleImg"></CardMedia>
                </div>
            </CardContent>
            </CardActionArea>
            <div className="voteCommentBar">
                    <CommentCounter comments={comment_count}/>
                    <VoteCounter startingVotes={votes} parent_id={article_id}/>
            </div>
            
        </Card>
    )
}

