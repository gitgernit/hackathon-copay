import {useEffect} from "react"
import '../styles/Home.css'
import GroupList from "../Components/GroupList/GroupList";
import AddButton from "../Components/AddButton/AddButton";
import {useInitData} from '@vkruglikov/react-telegram-web-app';
import {AuthToken} from '../api/server'


export const HomePage = () => {
  const [initDataUnsafe, initData] = useInitData() 
  useEffect(() => {
    if (initDataUnsafe && initData) {
      (async () => {
        console.log(initDataUnsafe)
        const res = await AuthToken.getToken(initDataUnsafe as any)
        console.log(res)
      })()
    }
  }, [initDataUnsafe, initData])

  return (
    <div className="wrapper">
      {JSON.stringify(initDataUnsafe, null, 2)}
      {initData}
      <div className='text-lg mb-2'>События</div>
      <GroupList />
      <AddButton text="Создать" navigateTo="/create-group" />
    </div>
  )
}