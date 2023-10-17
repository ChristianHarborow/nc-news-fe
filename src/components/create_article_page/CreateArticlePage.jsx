import { FormControl, TextField, Select, MenuItem, Button, Typography, InputLabel } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import { toTitle } from '../../utilities'
import { getTopics, postArticle } from '../../api'
import { UserContext } from '../../contexts/UserContext'

export default function CreateArticlePage() {
    const { user } = useContext(UserContext)
    const [title, setTitle] = useState(undefined)
    const [topics, setTopics] = useState([])
    const [selection, setSelection] = useState("")
    const [imgUrl, setImgUrl] = useState(undefined)
    const [body, setBody] = useState(undefined)

    useEffect(() => {
        getTopics()
        .then((topics) => {
            const slugs = topics.map(topic => topic.slug)
            setTopics(slugs)
        })
    }, [])

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleTopicChange(event) {
        setSelection(event.target.value)
    }

    function handleUrlChange(event) {
        setImgUrl(event.target.value)
    }

    function handleBodyChange(event) {
        setBody(event.target.value)
    }

    const selectStyle = {
        color: "white",
        '.MuiOutlinedInput-notchedOutline': { borderColor: '#e4dbe940' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e4dbe940' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e4dbe940' },
        '.MuiSvgIcon-root ': { fill: "white !important" }
    }

    const inputStyle = {
        '.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: 'white' },
        '.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e4dbe940' }
    }

    const multilineStyle = {
        '.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: 'white' },
        '.css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e4dbe940' }
    }

    function handleSubmit(event) {
        event.preventDefault()

        const newArticle = {
            author: user.username,
            title: title,
            body: body,
            topic: selection,
            article_img_url: imgUrl
        }

        console.log("SUBMIT")
        console.log(newArticle);

        postArticle(newArticle)
        .then(() => {
            console.log("Posted");
        })
    }

    return (
        <main style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", height: "80vh", width: "60%", padding: 15, backgroundColor: "#465062", borderRadius: 10}}>
                <Typography id="formTitle" variant='h2'>New Article</Typography>
                
                <FormControl style={{marginBottom: 10}} className='formInput'>
                    <TextField required fullWidth value={title} label="Title" onChange={handleTitleChange} sx={inputStyle}/>
                </FormControl>

                <FormControl required style={{marginBottom: 10}} className='formSelect'>
                    <InputLabel id="topic-select-label" style={{color: "white"}}>Topic</InputLabel>
                    
                    <Select value={selection} onChange={handleTopicChange} label="Topic" labelId='topic-select-label' sx={selectStyle}>
                        {topics.map(topic => <MenuItem value={topic} key={topic}>{toTitle(topic)}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl style={{marginBottom: 10}}  className='formInput'> 
                    <TextField required fullWidth value={imgUrl} label="Image URL" onChange={handleUrlChange}  sx={inputStyle}/>
                </FormControl>

                <FormControl style={{flex: 1, marginBottom: 10}}>
                    <TextField required multiline fullWidth rows={1} value={body} label="Body" onChange={handleBodyChange} className='multilineInput' sx={multilineStyle}/>
                </FormControl>

                <Button type='submit' variant="contained" className='buttonColor'>Submit Article</Button>
            </form>
        </main>
    )
}