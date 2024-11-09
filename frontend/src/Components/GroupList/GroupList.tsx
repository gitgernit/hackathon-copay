import { useEffect, useState } from 'react'
import GroupItem from '../GroupItem/GroupItem'
import './GroupList.css'

const GroupList = () => {
    const [groups, setGroups] = useState<any[]>([])

    useEffect(() => {
        // getgroups()
        setGroups([
            {
                id: 1,
                name: 'Название 1',
                membersCount: 2,
            },
            {
                id: 2,
                name: 'Название 2',
                membersCount: 5,
            },
            {
                id: 3,
                name: 'Название 3',
                membersCount: 3,
            },
        ])
    }, [])

  return (
    <div className='groups'>
        {groups.map((group) => (
            <GroupItem key={group.id} event={group} />
        ))}
    </div>
  )
}

export default GroupList