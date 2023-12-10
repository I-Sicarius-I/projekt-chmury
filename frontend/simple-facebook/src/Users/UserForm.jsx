import { Container, TextField, Box, Typography, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useUsers } from '../Context/UserContext'
import { addUser } from '../Hooks/hooks'

const UserForm = ({addBool, setAddBool, userFilter}) => 
{
    const {getUserData} = useUsers()

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("") 
    const [email, setEmail] = useState("")
    const [date, setDate] =  useState("") 
    const [nationality, setNationality] =  useState("")
    const [gender, setGender] = useState("")
    
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


        const res = await addUser(user)
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
