import React from 'react'
import Posts from '../Posts/Posts'
import { useState } from 'react'
import { usePosts } from '../Context/PostsContext'
import { Container, Grid, Button,  Typography} from '@mui/material'
import PostForm from '../Posts/PostForm'
import PostFilterForm from '../Posts/PostFilterForm'
import { useUsers } from '../Context/UserContext'

const PostPage = () => {
    const {posts, getPostData} = usePosts()
    const [addBool, setAddBool] = useState(false)
    const [filterBool, setFilterBool] = useState(false)
    const [postFilter, setPostFilter] = useState({})
    const {currentUser} = useUsers()

  return (
        <Container sx={{backgroundColor: "#aedbff", display: "flex", flexDirection: "column", marginTop: "5%", alignItems: "center"}}>
            <Grid sx={{display: "flex", flexDirection: "column", borderBottom: "2px solid"}}>
                <Typography variant="h3" sx={{marginBottom: "2%"}}>
                    Frontpage
                </Typography>
                {
                Object.keys(currentUser).length > 0 ? 

                    (<Button onClick={() => 
                    {
                        setAddBool(!addBool)
                    }}>
                        Add Post
                    </Button>) : (<></>)
                }
                {
                    addBool ? (
                    <PostForm addBool={addBool} setAddBool={setAddBool} postFilter={postFilter}/>
                    ) : (<></>)
                }
                <Button onClick={() => 
                {
                    if(Object.keys(postFilter).length === 0)
                    {
                        setFilterBool(!filterBool)
                    }
                    else
                    {
                        setPostFilter({})
                        getPostData({})
                    }
                }}>
                {Object.keys(postFilter).length === 0 ? "Filter Posts" : "Reset Filter"}
                </Button>
                {
                    filterBool ? (
                        <PostFilterForm filterBool={filterBool} setFilterBool={setFilterBool} setPostFilter={setPostFilter}></PostFilterForm>
                    ) : (<></>)
                }
            </Grid>
            <Posts posts={posts} postFilter={postFilter}></Posts>
        </Container>
  )
}

export default PostPage
