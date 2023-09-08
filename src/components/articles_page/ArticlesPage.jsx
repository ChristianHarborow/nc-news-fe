import { useEffect, useState } from "react"
import ArticlesList from "./ArticlesList"
import { getTopics } from "../../api"
import { toTitle } from "../../utilities"
import { useSearchParams } from "react-router-dom"

export default function ArticlesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [topics, setTopics] = useState(["All Topics"])
    const [queryInputs, setQueryInputs] = useState({
        topic: searchParams.get("topic") || "All Topics",
        sort_by: searchParams.get("sort_by") || "date",
        order: searchParams.get("order") || "desc"
    })
    const {topic, sort_by, order} = queryInputs

    useEffect(() => {
        getTopics()
        .then((topics) => {
            const slugs = topics.map(topic => topic.slug)
            setTopics(["All Topics", ...slugs])
        })
    }, [])

    function handleChange(event) {
        const {id, value} = event.target

        setQueryInputs(currInputs => {
            currInputs[id] = value
            return currInputs
        })

        setSearchParams((currParams => {
            if (id === "topic" && value === "All Topics") currParams.delete("topic")
            else currParams.set(id, value)
            return currParams
        }))
    }

    function resetQueryInputs() {
        setQueryInputs({
            topic: "All Topics",
            sort_by:  "date",
            order:  "desc"
        })
    }

    return (
        <main className="articlePage">
            <div className="queryBar">
                <select id="topic" onChange={handleChange} value={topic}>
                    {topics.map(topic => <option key={topic} value={topic}>{toTitle(topic)}</option>)}
                </select>
                <select id="sort_by" onChange={handleChange} value={sort_by}>
                    <option value="created_at">Date</option>
                    <option value="comment_count">Comments</option>
                    <option value="votes">Votes</option>
                </select>
                <select id="order" onChange={handleChange} value={order}>
                    <option value="desc">Desc</option>
                    <option value="asc">Asc</option>
                </select>
            </div>
            <ArticlesList resetQueryInputs={resetQueryInputs}/>
        </main>
    )
}