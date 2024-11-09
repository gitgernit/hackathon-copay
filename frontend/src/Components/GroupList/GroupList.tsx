import React from 'react'
import GroupItem from '../GroupItem/GroupItem'
import './GroupList.css'
import {useQuery} from "@tanstack/react-query";
import {defaultReq, eventsApi} from "../../shared/api";

const GroupList = () => {
  const {data} = useQuery({
    queryKey: ['events'],
    queryFn: () => eventsApi.listEventApiEventsGet(defaultReq)
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