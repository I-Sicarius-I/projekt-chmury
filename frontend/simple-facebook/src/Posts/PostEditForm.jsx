import { Container, TextField, Box, Typography, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { usePosts } from '../Context/PostsContext'
import { editPost } from '../Hooks/hooks'

const PostEditForm = ({edit_post, addBool, setAddBool, postFilter}) => 
{
    const {getPostData} = usePosts()

    const [title, setTitle] = useState(edit_post.title)
    const [subject, setSubject] = useState(edit_post.subject)
    const [text, setText] = useState(edit_post.text)


    const onSubmit = async(e) =>
    {
        e.preventDefault()

        const post = 
        {
            poster_email: edit_post.poster_email,
            title: title,
            subject: subject,
            text: text
        }

        console.log(post)

        await editPost(post, edit_post.title)
        .catch((e) =>
        {
            alert(e.message)
        })

        getPostData(postFilter)
        setAddBool(!addBool)
    }

    return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center" , marginTop: "15px"}}>
        <form onSubmit={onSubmit}>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    Title
                </Typography>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    Subject
                </Typography>
                <TextField
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    Text
                </Typography>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                />
            </Box>
            <Button type="submit">
                Submit
            </Button>
        </form>  
        </Container>
    )
}

export default PostEditForm
