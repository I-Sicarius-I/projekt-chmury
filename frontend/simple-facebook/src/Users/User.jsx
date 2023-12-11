import {Container, Typography, Button, Grid} from '@mui/material'
import React from 'react'
import { useUsers } from '../Context/UserContext'
import { delUser } from '../Hooks/hooks'
import { useState } from 'react'
import UserEditForm from './UserEditForm'

const User = ({user, userFilter}) =>
{
    const {getUserData, setCurrentUser, currentUser} = useUsers()
    const [addBool, setAddBool] = useState(false)

    return(
        <Container sx={{backgroundColor: "red", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "stretch", marginTop:'3%', marginBottom: '3%'}}>
            <Typography variant="h5">
                {user.fname + " " + user.lname}
            </Typography>
            <Typography variant="p">
                {"Email: " + user.email}
            </Typography>
            <Typography variant="p">
                {"Nationality: " + user.nationality}
            </Typography>
            <Typography>
                {"Gender: " + user.gender}
            </Typography>
            <Typography variant="p">
                {"Born: " + user.date_of_birth}
            </Typography>
            <Grid>
                <Button onClick={() => 
                    {
                        if(Object.keys(currentUser).length === 0 || currentUser.email !== user.email)
                        {
                            setCurrentUser(user);
                        }
                        else
                        {
                            setCurrentUser({})
                        }
                    }}>
                    {(Object.keys(currentUser).length === 0 || currentUser.email !== user.email) ? "Switch user" : "Reset user"}
                </Button>
                {
                    currentUser.email === user.email ? 
                    (
                        <>
                            <Button onClick={() => {setAddBool(!addBool)}}>
                                Edit User
                            </Button>
                            <Button onClick={async() =>
                                {
                                    await delUser(user.email)
                                    .catch((e) => {
                                        alert(e.message)
                                    })
                                    getUserData({userFilter})
                                }}>
                                Delete user
                            </Button>
                        </>
                    ) : (<></>)
                }       
            </Grid>
            {
                addBool ? (<UserEditForm addBool={addBool} setAddBool={setAddBool} edit_user={user} userFilter={userFilter}/>) : (<></>)
            }
        </Container>
    )
}

export default User