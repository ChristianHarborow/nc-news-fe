import { useEffect, useState } from "react"
import ArticlesList from "./ArticlesList"
import { getTopics } from "../../api"
import { toTitle } from "../../utilities"
import { useSearchParams } from "react-router-dom"

export default function ArticlesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [topics, setTopics] = useState(["All Topics"])
    const [topic, setTopic] = useState(searchParams.get("topic") || "All Topics")
    const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "date")
    const [order, setOrder] = useState(searchParams.get("order") || "desc")

    useEffect(() => {
        getTopics()
        .then((topics) => {
            const slugs = topics.map(topic => topic.slug)
            setTopics(["All Topics", ...slugs])
        })
    }, [])

    function handleChange(event) {
        const {id, value} = event.target

        if (id === "topic") setTopic(value)
        else if (id === "sort_by") setSortBy(value)
        else setOrder(value)

        setSearchParams((currParams => {
            if (id === "topic" && value === "All Topics") currParams.delete("topic")
            else currParams.set(id, value)
            return currParams
        }))
    }

    return (
        <main className="articlePage">
            <div className="queryBar">
                <select id="topic" onChange={handleChange} value={topic}>
                    {topics.map(topic => <option key={topic} value={topic}>{toTitle(topic)}</option>)}
                </select>
                <select id="sort_by" onChange={handleChange} value={sortBy}>
                    <option value="created_at">Date</option>
                    <option value="comment_count">Comments</option>
                    <option value="votes">Votes</option>
                </select>
                <select id="order" onChange={handleChange} value={order}>
                    <option value="desc">Desc</option>
                    <option value="asc">Asc</option>
                </select>
            </div>
            <ArticlesList topic={topic} sortBy={sortBy} order={order}/>
        </main>
    )
}