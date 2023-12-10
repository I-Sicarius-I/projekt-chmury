import React from 'react'
import Reaction from './Reaction'

const Reactions = ({reactions}) => {
  return (
    reactions?.map(reaction => {return <Reaction reaction={reaction}></Reaction>})
  )
}

export default Reactions
