import React from 'react'
import GroupItem from '../GroupItem/GroupItem'
import './GroupList.css'
import {useQuery} from "@tanstack/react-query";
import {defaultReq, eventsApi} from "../../shared/api";

const GroupList = () => {
  const {data} = useQuery({
    queryKey: ['events'],
    queryFn: () => eventsApi.listEventsApiEventsGet(defaultReq),
    initialData: [{ 
      name: 'название 1',
      id: '1',
      owner: 1,
      invite: 'invite',
      users: [
        {
          id: 1,
          username: "имя1"
        },
        {
          id: 2,
          username: "имя2"
        },
        {
          id: 0,
          username: "имя3"
        }
      ]
    }]
  })
  
  return (
    <div className='groups'>
        {data?.map((group) => (
            <GroupItem key={group.id} event={group} />
        ))}
    </div>
  )
}

export default GroupList