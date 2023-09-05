import { cleanDateTime} from "../../utilities"
import VoteCounter from "../VoteCounter"
import CommentCounter from "../CommentCounter"

export default function ArticleCard({article}) {
    const {topic, title, author, created_at, article_img_url, votes, comment_count} = article
    
    return (
        <article className="articleCard">
            <h2>{`${topic} | ${title}`}</h2>
            <p>{`${author} | ${cleanDateTime(created_at)}`}</p>
            <img className="articleImg" src={article_img_url} alt="" />
            <div className="voteCommentBar">
                <CommentCounter comments={comment_count}/>
                <VoteCounter startingVotes={votes}/>
            </div>
        </article>
    )
}

