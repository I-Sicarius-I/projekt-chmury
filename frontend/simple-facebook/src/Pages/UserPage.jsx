import React from 'react'
import { useState } from 'react'
import { Container, Button, TextField, Typography, Grid} from '@mui/material'
import UserFilterForm from '../Users/UserFilterForm'
import Users from '../Users/Users'
import UserForm from '../Users/UserForm'
import { useUsers } from '../Context/UserContext'

const UserPage = () => {
  const {getUserData, users, currentUser} = useUsers()
  const [addBool, setAddBool] = useState(false)
  const [userFilter, setUserFilter] = useState({})
  const [filterBool, setFilterBool] = useState(false)

  return (
    <Container sx={{display: "flex", flexDirection: "column", marginTop: "5%", alignItems: "center"}}>   
        <Grid sx={{display: "flex", flexDirection: "column", borderBottom: "2px solid"}}>
            <Typography variant="h3" sx={{marginBottom: "2%"}}>
                Current User{(Object.keys(currentUser).length > 0) ? ": " + currentUser.fname + " " + currentUser.lname : ""}
            </Typography>
            <Button onClick={() => 
            {
                setAddBool(!addBool)
            }}>
                Add User
            </Button>
            <Button onClick={() => 
                {
                    if(Object.keys(userFilter).length === 0)
                    {
                        setFilterBool(!filterBool)
                    }
                    else
                    {
                        setUserFilter({})
                        getUserData({})
                    }
                }
            }>
                {Object.keys(userFilter).length === 0 ? "Filter Users" : "Reset filter"}
            </Button>
        </Grid>
        {
            addBool ? (
                <UserForm addBool={addBool} setAddBool={setAddBool} userFilter={userFilter}/>
            ) : (<></>)
        }
        {
            filterBool ? (
                <UserFilterForm filterBool={filterBool} setFilterBool={setFilterBool} setUserFilter={setUserFilter}></UserFilterForm>
            ) : (<></>)
        }
        <Users users={users} userFilter={userFilter}></Users>
    </Container>
  )
}

export default UserPage
