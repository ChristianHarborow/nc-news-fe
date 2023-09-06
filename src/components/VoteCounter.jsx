import { useState } from "react"
import { patchArticleVotes } from "../api"
import { ErrorContext } from "../ErrorContext"
import { useContext } from 'react';

export default function VoteCounter({startingVotes, parent_id}) {
    const [votes, setVotes] = useState(startingVotes)
    const [upvoted, setUpvoted] = useState(false)
    const [downvoted, setDownvoted] = useState(false)
    const {error, setError} = useContext(ErrorContext)

    function handleUpvote() {
        const originalState = {votes, upvoted, downvoted}

        let incVotes
        if (upvoted) incVotes = -1
        else if (downvoted) incVotes = 2
        else incVotes = 1

        setVotes(votes + incVotes)
        setUpvoted(!upvoted)
        setDownvoted(false)

        sendVote(originalState, incVotes)
    }

    function handleDownvote() {
        const originalState = {votes, upvoted, downvoted}

        let incVotes
        if (downvoted) incVotes = 1
        else if (upvoted) incVotes = -2
        else incVotes = -1

        setVotes(votes + incVotes)
        setDownvoted(!downvoted)
        setUpvoted(false)

        sendVote(originalState, incVotes)
    }

    function sendVote(originalState, incVotes) {
        patchArticleVotes(parent_id, incVotes)
        .catch(() => {
            setVotes(originalState.votes)
            setUpvoted(originalState.upvoted)
            setDownvoted(originalState.downvoted)
            setError(currError => {
                const newError = {...currError}
                newError.msg = "Failed to send vote try again later"
                newError.show = true
                return newError
            })
        })
    }

    return (
        <span>
            <button className={upvoted ? "upvoted" : "deselected"} onClick={handleUpvote}>+1</button>
            <span className="voteBox">{votes}</span>
            <button className={downvoted ? "downvoted" : "deselected"} onClick={handleDownvote}>-1</button>
        </span>
    )
}