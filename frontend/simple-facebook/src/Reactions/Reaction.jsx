import { Container, Typography } from '@mui/material'
import React from 'react'

const Reaction = ({reaction}) => {
  return (
    <Container sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Typography variant="text">
            {reaction.reaction_type == null ? ("Reactions: ") : (reaction.reaction_type + ": ")}
        </Typography>
        <Typography variant="text">
            {reaction.reactionsCount}
        </Typography>
    </Container>
  )
}

export default Reaction
