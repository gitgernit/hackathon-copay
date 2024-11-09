import '../styles/Home.css'
import GroupList from "../Components/GroupList/GroupList";
import AddButton from "../Components/AddButton/AddButton";


export const HomePage = () => {
  return (
    <div className="wrapper p-4">
      <h1 className='text-lg mb-2 ibm-plex-sans-bold'>Ваши события</h1>
      <GroupList />
      <AddButton text="Создать" navigateTo="/create-group" />
    </div>
  )
}