import React from 'react'
import './GroupLogo.css'

interface Props {
  name: string
}

const GroupLogo = ({name}: Props) => {
  return (
    <div className="avatar">{name.slice(0, 1).toUpperCase()}</div>
  )
}

export default GroupLogo