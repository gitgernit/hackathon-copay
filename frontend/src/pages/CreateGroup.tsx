import React, { useEffect } from 'react'
import '../styles/CreateGroup.css'
import GoodsList from '../Components/GoodsList/GoodsList'
import AddCheckButton from '../Components/AddCheckButton/AddCheckButton'
import AddGoodsButton from '../Components/AddGoodsButton/AddGoodsButton'

const CreateGroup = () => {
  const [goods, setGoods] = React.useState<string[]>([])

  useEffect(() => {
    setGoods([
        'Товар 1',
        'Товар 2',
        'Товар 3',
        'Товар 4',
    ])
  }, [])

  return (
    <main className='create-group-wrapper'>
        <form>
            <input type='text' placeholder='Название группы' />
            <div className="line"></div>
            <GoodsList goods={goods}/>
            <AddCheckButton />
            <AddGoodsButton />
        </form>
    </main>
  )
}

export default CreateGroup