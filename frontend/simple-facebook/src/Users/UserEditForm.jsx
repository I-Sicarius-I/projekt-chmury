import { Container, TextField, Box, Typography, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useUsers } from '../Context/UserContext'
import { editUser } from '../Hooks/hooks'

const UserForm = ({edit_user, addBool, setAddBool, userFilter}) => 
{
    const {getUserData} = useUsers()

    const [fname, setFname] = useState(edit_user.fname)
    const [lname, setLname] = useState(edit_user.lname) 
    const [email, setEmail] = useState(edit_user.email)
    const [date, setDate] =  useState(edit_user.date_of_birth) 
    const [nationality, setNationality] =  useState(edit_user.nationality)
    const [gender, setGender] = useState(edit_user.gender)
    
    const onSubmit = async(e) =>
    {
        e.preventDefault()

        const user = 
        {
            fname: fname,
            lname: lname,
            date_of_birth: date,
            email: email,
            gender: gender,
            nationality: nationality
        }

        const res = await editUser(user, edit_user.email)
        .catch((e) => 
        {
            alert(e.message)
        })
     

        getUserData({userFilter})
        setAddBool(!addBool)
    }

    return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center" , marginTop: "15px"}}>
        <form onSubmit={onSubmit}>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    First Name
                </Typography>
                <TextField
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    type="text"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    Last Name
                </Typography>
                <TextField
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    type="text"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    Email
                </Typography>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    Date of Birth
                </Typography>
                <TextField
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="text"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    Gender
                </Typography>
                <TextField
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    type="text"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                <Typography variant="subtitle">
                    Nationality
                </Typography>
                <TextField
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    type="text"
                />
            </Box>
            <Button type="submit">
                Submit
            </Button>
        </form>  
        </Container>
    )
}

export default UserForm
