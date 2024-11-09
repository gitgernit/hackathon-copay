import React from 'react'
import  './GroupItem.css'
import GroupLogo from '../GroupLogo/GroupLogo'
import { useNavigate } from 'react-router-dom'

interface Props {
    group: {
        id: number,
        name: string,
        membersCount: number,
    }
}

const GroupItem = ({group}: Props) => {
  const navigate = useNavigate()

  return (
    <div className='group-item' onClick={() => navigate(`/group/${group.id}`)}>
        <GroupLogo name={group.name} />
        <div className="body">
          <h4 className='ibm-plex-sans-medium'>{group.name}</h4>
          <p className='ibm-plex-sans-light'>{group.membersCount} {group.membersCount % 10 < 4 ? 'участника' : 'участников'}</p>
        </div>
        <button className="arrow">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="#0F0F0F"></path> </g></svg>
        </button>
    </div>
  )
}

export default GroupItem