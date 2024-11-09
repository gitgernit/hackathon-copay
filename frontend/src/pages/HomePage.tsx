import '../styles/Home.css'
import GroupList from "../Components/GroupList/GroupList";
import AddButton from "../Components/AddButton/AddButton";


export const HomePage = () => {
  return (
    <div className="wrapper p-4">
      <div className='text-lg mb-2'>События</div>
      <GroupList />
      <AddButton text="Создать" navigateTo="/create-group" />
    </div>
  )
}