import {useEffect} from "react"
import '../styles/Home.css'
import GroupList from "../Components/GroupList/GroupList";
import AddButton from "../Components/AddButton/AddButton";
import {authApi} from '../shared/api/';
import { useInitData } from '@vkruglikov/react-telegram-web-app';
import React from "react";
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
      <GroupList />
      <AddButton text="Создать" navigateTo="/create-group" />
    </div>
  )
}