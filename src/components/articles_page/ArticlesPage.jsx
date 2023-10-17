import { useEffect, useState } from "react"
import ArticlesList from "./ArticlesList"
import { getTopics } from "../../api"
import { useSearchParams } from "react-router-dom"
import QueryBar from "./QueryBar"

export default function ArticlesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [topics, setTopics] = useState(["All Topics"])
    const [queryInputs, setQueryInputs] = useState({
        topic: searchParams.get("topic") || "All Topics",
        sort_by: searchParams.get("sort_by") || "created_at",
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
        console.log(event);
        const {name, value} = event.target
        console.log(event.target);

        setQueryInputs(currInputs => {
            currInputs[name] = value
            return currInputs
        })

        setSearchParams((currParams => {
            if (name === "topic" && value === "All Topics") currParams.delete("topic")
            else currParams.set(name, value)
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
            <QueryBar handleChange={handleChange} topics={topics} topic={topic} sort_by={sort_by} order={order}/>
            <ArticlesList resetQueryInputs={resetQueryInputs}/>
        </main>
    )
}