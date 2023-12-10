import React, { useState } from 'react'
import { Container, Box, Typography, TextField, Button } from '@mui/material'
import { useUsers } from '../Context/UserContext'

const UserFilterForm = ({setUserFilter, filterBool, setFilterBool}) => {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [nationality, setNationality] = useState("")
    const [gender, setGender] = useState("")
    const [date, setDate] = useState("")

    const {getUserData} = useUsers()

    const onSubmit = async(e) => 
    {
        e.preventDefault()

        const filter = {
            fname: fname,
            lname: lname,
            nationality: nationality,
            gender: gender,
            date_of_birth: date
        }

        getUserData(filter)
        setUserFilter(filter)
        setFilterBool(!filterBool)
    }

  return (
    <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px"}}>
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
                    Nationality
                </Typography>
                <TextField
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
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
                    Date of Birth
                </Typography>
                <TextField
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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

export default UserFilterForm
