import { FormControl, TextField, Select, MenuItem, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { toTitle } from '../../utilities'
import { getTopics } from '../../api'

export default function CreateArticlePage() {
    const [title, setTitle] = useState("")
    const [topics, setTopics] = useState([])
    const [selection, setSelection] = useState("Topic")
    const [imgUrl, setImgUrl] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        getTopics()
        .then((topics) => {
            const slugs = topics.map(topic => topic.slug)
            setTopics(["Topic", ...slugs])
        })
    }, [])

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleUrlChange(event) {
        setImgUrl(event.target.value)
    }

    function handleBodyChange(event) {
        setBody(event.target.value)
    }

    return (
        <main style={{display: "flex", flexDirection: "column"}}>
            <FormControl>
                <TextField fullWidth value={title} label="Title" onChange={handleTitleChange} className='textInput'/>
            </FormControl>
            <FormControl>
                <Select value={selection} label="Topic">
                    {topics.map(topic => <MenuItem value={topic} key={topic}>{toTitle(topic)}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <TextField fullWidth value={imgUrl} label="Image URL" onChange={handleUrlChange} className='textInput'/>
            </FormControl>
            <FormControl>
                <TextField multiline fullWidth value={body} label="Body" onChange={handleBodyChange} className='textInput'/>
            </FormControl>
            <Button variant="contained" className='buttonColor'>Submit Article</Button>
        </main>
    )
}