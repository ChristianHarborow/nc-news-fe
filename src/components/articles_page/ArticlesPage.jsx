import { useEffect, useState } from "react"
import ArticlesList from "./ArticlesList"
import { getTopics } from "../../api"
import { toTitle } from "../../utilities"
import { useSearchParams } from "react-router-dom"

export default function ArticlesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [topics, setTopics] = useState(["All Topics"])
    const [topic, setTopic] = useState(searchParams.get("topic") ? toTitle(searchParams.get("topic")) : "All Topics")

    useEffect(() => {
        getTopics()
        .then((topics) => {
            const slugs = topics.map(topic => toTitle(topic.slug))
            setTopics(["All Topics", ...slugs])
        })
    }, [])

    function handleChange(event) {
        if (event.target.value === "All Topics") setSearchParams()
        else setSearchParams({topic: event.target.value.toLowerCase()})
        setTopic(event.target.value)
    }

    return (
        <main className="articlePage">
            <select onChange={handleChange} value={topic}>
                {topics.map(topic => <option key={topic} value={topic}>{topic}</option>)}
            </select>
            <ArticlesList topic={topic}/>
        </main>
    )
}