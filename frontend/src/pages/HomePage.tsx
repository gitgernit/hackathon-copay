import React, { useEffect } from "react"
import Test from './../api/server';
import '../styles/Home.css'
import GroupList from "../Components/GroupList/GroupList";
import AddButton from "../Components/AddButton/AddButton";

export const HomePage = () => {
  useEffect(() => {
    Test.test_api()
  }, [])

  return (
    <div className="wrapper">
      <GroupList />
      <AddButton text="Создать" navigateTo="/create-group" />
    </div>
  )
}