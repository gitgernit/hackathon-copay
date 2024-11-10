import '../styles/Home.css'
import GroupList from "../Components/GroupList/GroupList";
import AddButton from "../Components/AddButton/AddButton";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {defaultReq, eventsApi} from "../shared/api";
import {queryClient} from "../app";


export const HomePage = () => {
  const {tgWebAppStartParam} = useParams()
  
  useEffect(() => {
    setTimeout(async () => {
      await eventsApi.addToEventApiEventsAddEventIdPost({eventId: tgWebAppStartParam!}, defaultReq)
      await queryClient.invalidateQueries({
        queryKey: ["events"]
      })
    }, 300)
  }, [tgWebAppStartParam]);
  
  return (
    <div className="wrapper p-4">
      <h1 className='text-lg mb-2 ibm-plex-sans-bold'>Ваши события</h1>
      <GroupList />
      <AddButton text="Создать" navigateTo="/create-group" />
    </div>
  )
}