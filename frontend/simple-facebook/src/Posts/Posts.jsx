import React from "react";
import Post from "./Post";

const Posts = ({posts, postFilter}) =>
{
    return(
        posts?.map(post => {return <Post post={post} postFilter={postFilter}/>})
    )
}

export default Posts