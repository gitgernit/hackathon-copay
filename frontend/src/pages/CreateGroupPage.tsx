import '../styles/CreateGroup.css'
import CreateGroup from '../Components/CreateGroup/CreateGroup';

const CreateGroupPage = () => {
  return (
    <div className='p-4'>
        <header className='create-header'>
            <h1 className='text-2xl'>Создание события</h1>
        </header>
        <main className=''>
            <CreateGroup />
        </main>
    </div>
  )
}

export default CreateGroupPage