import React, { createContext, useContext, useState, useEffect } from 'react'
import { getPosts } from '../Hooks/hooks';

const PostContext = createContext();

export const usePosts = () => 
{
    return useContext(PostContext);
}

export const PostProvider = (props) =>
{
    const [posts, setPosts] = useState([])

    const getPostData = async(postFilter) =>
    {
        const res = await getPosts(postFilter)
        .catch((e) => {
            alert(e.message)
        })

        if(res)
        {
            setPosts(res)
        }
    }

    useEffect(() => 
    {
      getPostData({})
    }, [])

    const value = 
    {
        posts,
        getPostData
    }

    return (
        <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
    )
}
