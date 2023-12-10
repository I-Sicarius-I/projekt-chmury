import React from "react";
import User from "./User";

const Users = ({users, userFilter, setCurrentUser}) =>
{
    return(
        users?.map(user => {return <User user={user} userFilter={userFilter} setCurrentUser={setCurrentUser}/>})
    )
}

export default Users