import { cleanDateTime } from "../../utilities"

export default function CommentCard({comment}) {
    const {author, created_at, body} = comment
    
    return (
        <article className="commentCard">
            <span>{`${author} | ${cleanDateTime(created_at)}`}</span>
            <p>{body}</p>
        </article>
    )
}