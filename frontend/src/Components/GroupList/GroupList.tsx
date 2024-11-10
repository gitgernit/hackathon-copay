import React, {useEffect} from 'react'
import GroupItem from '../GroupItem/GroupItem'
import './GroupList.css'
import {useQuery} from "@tanstack/react-query";
import {defaultReq, eventsApi} from "../../shared/api";
import {useLocation} from 'react-router-dom';

const GroupList = () => {
  const location = useLocation()

  const {data, refetch} = useQuery({
    queryKey: ['events'],
    queryFn: () => eventsApi.listEventsApiEventsGet(defaultReq),
    initialData: []
  })

  useEffect(() => {
    refetch()
  }, [location])

  console.log('data', data)
  
  return (
    <div className='groups'>
        {data?.length ? (data?.map((group) => (
            <GroupItem key={group.id} event={group} />
        ))) : (<GroupItem key={data?.id} event={data} />)
      }
    </div>
  )
}

export default GroupList