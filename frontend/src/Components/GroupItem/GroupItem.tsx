import React from 'react'
import  './GroupItem.css'
import GroupLogo from '../GroupLogo/Footer'

interface Props {
    group: {
        id: number,
        name: string,
        membersCount: number,
    }
}

const GroupItem = ({group}: Props) => {
  return (
    <div className='group-item'>
        <GroupLogo name={group.name} />
        <h4>{group.name}</h4>
        <p>{group.membersCount}</p>
    </div>
  )
}

export default GroupItem