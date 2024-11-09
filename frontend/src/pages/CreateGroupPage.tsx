import '../styles/CreateGroup.css'
import CreateGroup from '../Components/CreateGroup/CreateGroup';
import { useNavigate } from 'react-router-dom';
import { LucideArrowLeft } from 'lucide-react';

const CreateGroupPage = () => {
  const navigate = useNavigate()

  return (
    <div className='p-4'>
        <header className='create-header'>
            <h1 className='text-2xl'>Создание события</h1>
        </header>
        <main className=''>
            <CreateGroup />
            <button className='shadow-[1px_3px_7px_1px_rgba(34,_60,_80,_0.2)] absolute bottom-[40px] left-[40px] bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl' onClick={() => navigate('/')}>
              <LucideArrowLeft />
          </button>
        </main>
    </div>
  )
}

export default CreateGroupPage