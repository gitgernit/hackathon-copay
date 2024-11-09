import React from 'react'
import './GroupLogo.css'

interface Props {
  name: string
}

const GroupLogo = ({name}: Props) => {
  return (
    <div className="avatar"><span>{name.slice(0, 1).toUpperCase()}</span></div>
  )
}

export default GroupLogo