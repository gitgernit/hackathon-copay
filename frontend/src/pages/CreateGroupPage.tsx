import React, { useEffect } from 'react'
import { useInitData } from '@vkruglikov/react-telegram-web-app';
import { AuthToken } from '../api/server';
import '../styles/CreateGroup.css'
import CreateGroup from '../Components/CreateGroup/CreateGroup';
import { Link } from 'react-router-dom';

const CreateGroupPage = () => {
  const [initDataUnsafe, initData] = useInitData() 
  console.log(initDataUnsafe, initData)
  useEffect(() => {
    const GetToken = async () => {
      const res = AuthToken.getToken(initDataUnsafe)
      console.log(res)
    }
    GetToken()
  }, [])

  return (
    <div className='wrapper'>
        <header className='create-header'>
            <h1 className='ibm-plex-sans-bold'>Создание ивента</h1>
        </header>
        <div className="line"></div>
        <main className=''>
            <CreateGroup />
        </main>
        <Link className='back' to='/'>
            <span>&larr;</span>
        </Link>
    </div>
  )
}

export default CreateGroupPage