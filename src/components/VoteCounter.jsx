import { useState } from "react"

export default function VoteCounter({startingVotes}) {
    const [votes, setVotes] = useState(startingVotes)

    return (
        <span>
            <button>+1</button>
            <span className="voteBox">{votes}</span>
            <button>-1</button>
        </span>
    )
}