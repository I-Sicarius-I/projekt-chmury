import React, { createContext, useContext, useState, useEffect } from 'react'
import { getUsers } from '../Hooks/hooks';

const UserContext = createContext();

export const useUsers = () => 
{
    return useContext(UserContext);
}

export const UserProvider = (props) =>
{
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const getUserData = async(userFilter) =>
    {
        const res = await getUsers(userFilter)
        .catch((e) => {
            alert(e.message)
        })

        if(res)
        {
            setUsers(res)
        }
    }

    useEffect(() => 
    {
      getUserData({})
    }, [])

    const value = 
    {
        users,
        currentUser,
        setCurrentUser,
        getUserData
    }

    return (
        <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
    )
}
