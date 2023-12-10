import React from "react";
import {Button, Typography, AppBar, Box, Toolbar} from "@mui/material"
import { NavLink} from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{display: 'flex'}}>
        <AppBar sx={{display: 'flex', flexDirection: 'column', backgroundColor: '#66b7ed', alignItems: 'center', px: { xs: 0, sm: 0, md: 0, lg: '5%', xl: '10%' }}}>
            <Toolbar>
                <NavLink to="/" style={{display: "inline-block"}}>
                    <Button>
                        Posts
                    </Button>
                </NavLink>
                <NavLink to="/users" style={{display: "inline-block"}}>
                    <Button>
                        Users
                    </Button>
                </NavLink>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Navbar
