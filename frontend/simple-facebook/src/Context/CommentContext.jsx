import React, { createContext, useContext, useState, useEffect } from 'react'
import { getComments } from '../Hooks/hooks';

const CommentContext = createContext();

export const useComms = () => 
{
    return useContext(CommentContext);
}

export const CommentProvider = (props) =>
{
    const [comms, setComms] = useState([])

    const getCommData = async() =>
    {
        const res = await getComments({})
        .catch((e) => {
            alert(e.message)
        })

        if(res)
        {
            setComms(res)
        }
    }

    const filterComments = async(filter) =>
    {
        const res = await getComments(filter)
        .catch((e) => 
        {
            alert(e.message)
        })

        return res
    }

    const getPostComms = (title, filteredComms, filter) =>
    {
        let comments

        if(typeof filter === 'undefined' || Object.keys(filter).length === 0)
        {
            comments = comms.filter((comm) => {return comm.post_title == title}) 
        }
        else
        {
            comments = filteredComms.filter((comm) => {return comm.post_title == title})
        }

        return comments
    }

    useEffect(() => 
    {
      getCommData()
    }, [])

    const value = 
    {
        comms,
        getCommData,
        filterComments,
        getPostComms
    }

    return (
        <CommentContext.Provider value={value}>{props.children}</CommentContext.Provider>
    )
}
