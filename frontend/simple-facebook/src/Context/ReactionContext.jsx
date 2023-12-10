import React, { createContext, useContext, useState, useEffect } from 'react'
import { addReaction, getReactions } from '../Hooks/hooks';

const ReactionContext = createContext();

export const useReactions = () => 
{
    return useContext(ReactionContext);
}

export const ReactionProvider = (props) =>
{
    const [reacts, setReacts] = useState([])
    const [reactsComm, setReactsComm] = useState([])

    const getReactPostData = async() =>
    {
        const res = await getReactions({})
        .catch((e) => {
            alert(e.message)
        })

        if(res)
        {
            setReacts(res)
        }
    }

    const getReactCommData = async() =>
    {
        const reaction = 
        {
            post_title: "",
            comm_email: "",
            react_email: "",
            reaction_type: "",
            post: false
        }

        const res = await getReactions(reaction)
        .catch((e) => {alert(e.message)})

        if(res)
        {
            setReactsComm(res)
        }
    }

    const getReactPosts = (title) =>
    {
        const reactions = reacts.filter((react) => {return react.post_title === title}) 

        return reactions
    }

    const getReactComms = (title, comm_email) =>
    {
        const reactions = reactsComm.filter((react) => {return react.post_title === title && react.user_email === comm_email})

        return reactions
    }

    const addReactionPost = async(title, react_email, reaction_type) =>
    {
        const reaction = 
        {
            post_title: title,
            react_email: react_email,
            reaction_type: reaction_type,
            comm_email: ""
        }

        await addReaction(reaction, true)
        .catch((e) => 
        {
            alert(e.message)
        })
        
        getReactPostData()
    }

    const addReactionComm = async(title, react_email, reaction_type, comm_email) =>
    {
        const reaction = 
        {
            post_title: title,
            react_email: react_email,
            reaction_type: reaction_type,
            comm_email: comm_email
        }

        await addReaction(reaction, false)
        .catch((e) => 
        {
            alert(e.message)
        })
        
        getReactCommData()
    }

    useEffect(() => 
    {
      getReactPostData()
      getReactCommData()
    }, [])

    const value = 
    {
        reacts,
        reactsComm,
        getReactPostData,
        getReactCommData,
        getReactPosts,
        getReactComms,
        addReactionPost,
        addReactionComm
    }

    return (
        <ReactionContext.Provider value={value}>{props.children}</ReactionContext.Provider>
    )
}
