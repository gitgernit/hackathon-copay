import '../styles/CreateGroup.css'
import CreateGroup from '../Components/CreateGroup/CreateGroup';
import { useNavigate } from 'react-router-dom';
import { LucideArrowLeft } from 'lucide-react';
import React from 'react';

const CreateGroupPage = () => {
  const navigate = useNavigate()

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
