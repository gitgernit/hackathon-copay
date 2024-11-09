import {useEffect} from "react"
import '../styles/Home.css'
import GroupList from "../Components/GroupList/GroupList";
import AddButton from "../Components/AddButton/AddButton";
import {authApi} from '../shared/api/';
import { useInitData } from '@vkruglikov/react-telegram-web-app';
import React from "react";

export const HomePage = () => {
  const [initDataUnsafe, initData] = useInitData() 
  console.log(initDataUnsafe, initData)
  useEffect(() => {

    // authApi.authenticateApiAuthTokenPost({})
  }, [])

  return (
    <div className="wrapper">
      <GroupList />
      <AddButton text="Создать" navigateTo="/create-group" />
    </div>
  )
}