import {Container, Typography, Button, Grid} from '@mui/material'
import { delPost } from '../Hooks/hooks'
import { useState } from 'react'
import Comments from '../Comments/Comments'
import React from 'react'
import { useEffect } from 'react'
import { usePosts } from '../Context/PostsContext'
import { useUsers } from '../Context/UserContext'
import Reactions from '../Reactions/Reactions'
import CommentFilterForm from '../Comments/CommentFilterForm'
import CommentForm from '../Comments/CommentForm'
import PostEditForm from './PostEditForm'
import { useComms } from '../Context/CommentContext'
import {useReactions} from '../Context/ReactionContext'

const Post = ({post, postFilter}) =>
{
    const [react, setReact] = useState([])
    const [postComms, setPostComms] = useState([])
    const [filter, setFilter] = useState({})
    const [filterBool, setFilterBool] = useState(false)
    const [addBool, setAddBool] = useState(false)
    const [editBool, setEditBool] = useState(false)

    const {currentUser} = useUsers()
    const {getPostData} = usePosts()
    const {getPostComms} = useComms()
    const {getReactPosts, addReactionPost} = useReactions()

    useEffect(() =>
        {
            setPostComms(getPostComms(post.title, [], filter))
            setReact(getReactPosts(post.title))
        }
    , [postComms, react, filter, post.title, getPostComms, getReactPosts])

    return(
        <Container sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "stretch", marginTop:'5%', marginBottom: '5%'}}>
            <Typography
               variant="h3">
                {post.title}    
            </Typography>
            <Typography variant="h4">
                {post.subject}
            </Typography>
            <Typography variant="h5">
                {post.date_posted}
            </Typography>
            <Typography variant="h5">
                {post.poster_email}
            </Typography>
            <Typography variant="p">
                {post.text}
            </Typography>
            <Grid sx={{width: '15%', display: "flex", flexDirection: "column", justifyContent: "space-around", alignSelf: "center", marginTop: '10px'}}>
                <Reactions reactions={react}></Reactions>
            </Grid>
            { editBool ? (<PostEditForm addBool={editBool} setAddBool={setEditBool} edit_post={post} postFilter={postFilter}/>) : (<></>)}
            <Grid sx={{marginTop: '10px'}}>
                { 
                    Object.keys(currentUser).length > 0 ? 
                    (<>
                        <Button onClick=
                        {
                            async() => 
                            { 
                                await addReactionPost(post.title, currentUser.email, "Like")
                                setReact(getReactPosts(post.title))
                            }
                        }>
                            Like  
                        </Button>
                        <Button onClick=
                        {
                            async()=>
                            {
                                await addReactionPost(post.title, currentUser.email, "Dislike")
                                setReact(getReactPosts(post.title))
                            }
                        }>
                            Dislike  
                        </Button>
                        <Button onClick={() => {setAddBool(!addBool)}}>
                            Add Comment
                        </Button> 
                    </>) : (<></>)
                }
                <Button onClick={() => 
                    {
                        if(Object.keys(filter).length === 0)
                        {
                            setFilterBool(!filterBool)
                        }
                        else
                        {
                            setFilter({})
                        }
                    }}>
                    {Object.keys(filter).length === 0 ? "Filter Comments" : "Reset Filter"}
                </Button>
                {
                    currentUser.email === post.poster_email ? 
                    (
                        <>
                            <Button onClick={() => {setEditBool(!editBool)}}>
                                Edit Post
                            </Button>
                            <Button onClick={async() => {
                                await delPost(post.title)
                                .catch((e) => 
                                {
                                    alert(e.message)
                                })
                                getPostData(postFilter)
                            }}>
                                Delete Post
                            </Button>
                        </>
                    ) : (<></>)
                }
            </Grid>
            { filterBool ? (<CommentFilterForm currentFilter={filter} setPostComms={setPostComms} setFilterComments={setFilter} post_title={post.title} filterBool={filterBool} setFilterBool={setFilterBool}/>) : (<></>) }
            { addBool ? (<CommentForm setPostComms={setPostComms} setAddBool={setAddBool} addBool={addBool} post_title={post.title} filter={filter}/>) : (<></>)}
            <Container>
                <Grid sx={{borderBottom: "2px solid #13206e"}}>
                    <Typography variant="h5">
                        Comments:
                    </Typography>
                </Grid>
                <Comments comments={postComms} setPostComments={setPostComms} filter={filter}/>
            </Container>
        </Container>
    )
}

export default Post