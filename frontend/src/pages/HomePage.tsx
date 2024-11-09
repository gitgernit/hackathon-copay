import {useEffect} from "react"
import '../styles/Home.css'
import GroupList from "../Components/GroupList/GroupList";
import AddButton from "../Components/AddButton/AddButton";
import {useInitData} from '@vkruglikov/react-telegram-web-app';
import {AuthToken} from '../api/server'

export const HomePage = () => {
  const [initDataUnsafe, initData] = useInitData() 
  console.log(initDataUnsafe, initData, 'tg data at home')
  useEffect(() => {
    const GetToken = async () => {
      const res = await AuthToken.getToken(initDataUnsafe)
      console.log(res)

    }
    GetToken()
  }, [])

  return (
    <div className="wrapper">
      <div className='text-lg mb-2'>События</div>
      <GroupList />
      <AddButton text="Создать" navigateTo="/create-group" />
    </div>
  )
}