import React from 'react'

interface Props {
    group: {
        id: number,
        name: string,
        membersCount: number,
    }
}

const GroupItem = ({group}: Props) => {
  return (
    <div>
        <h4>{group.name}</h4>
        <p>{group.membersCount}</p>
    </div>
  )
}

export default GroupItem