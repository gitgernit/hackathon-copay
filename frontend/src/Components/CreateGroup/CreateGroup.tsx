import React from 'react'
import './CreateGroup.css'
import { eventsApi } from '../../shared/api'
import { AuthToken } from '../../api/server'
import { useInitData } from '@vkruglikov/react-telegram-web-app'

const CreateGroup = () => {
    const [name, setName] = React.useState('')
    const [initDataUnsafe, initData] = useInitData() 
    console.log(initDataUnsafe, initData, 'tg data')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const token = await AuthToken.getToken(initDataUnsafe) 
        
        eventsApi.createEventApiEventsPost({baseEvent:{name}}, {headers: {
            authorization: `BEARER ${localStorage.getItem('token')}`
        }})
    }

    return (
        <form className='create-group-form' onSubmit={handleSubmit}>
            <input 
            required
            type="text" 
            placeholder='Название' 
            value={name} 
            onChange={handleChange}/>
            <button type='submit' className='submit-button' disabled={!name}>
                <svg className='plus-icon' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlBase="http://www.bohemiancoding.com/sketch/ns" fill="#65558f"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" strokeWidth="0.00032" fill="none" fillRule="evenodd" type="MSPage"> <g id="Icon-Set" type="MSLayerGroup" transform="translate(-464.000000, -1087.000000)" fill="#65558f"> <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle" type="MSShapeGroup"> </path> </g> </g> </g></svg>
                <span>Создать</span>
            </button>
        </form>
    )
}

export default CreateGroup