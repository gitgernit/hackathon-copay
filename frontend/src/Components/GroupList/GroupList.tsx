import React from 'react'
import GroupItem from '../GroupItem/GroupItem'
import './GroupList.css'
import {useQuery} from "@tanstack/react-query";
import {defaultReq, eventsApi} from "../../shared/api";

const GroupList = () => {
  const {data} = useQuery({
    queryKey: ['events'],
    queryFn: () => eventsApi.listEventsApiEventsGet(defaultReq),
  })

  console.log(data) // БЕЗ name И users
  
  return (
    <div className='groups'>
        {data?.map((group) => (
            <GroupItem key={group.id} event={group} />
        ))}
    </div>
  )
}

export default GroupList