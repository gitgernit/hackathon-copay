import React, { useEffect } from 'react'
import '../styles/CreateGroup.css'
import GoodsList from '../Components/GoodsList/GoodsList'
import AddCheckButton from '../Components/AddCheckButton/AddCheckButton'
import AddGoodsButton from '../Components/AddGoodsButton/AddGoodsButton'

const EditGroupPage = () => {
  const [goods, setGoods] = React.useState<string[]>([])

  useEffect(() => {
    setGoods([
        'Товар 1',
        'Товар 2',
        'Товар 3',
        'Товар 4',
    ])
  }, [])

  const adder = () => {
    setGoods([...goods, 'Новый товар'])
  }

  const changer = (idx: number, newValue: string) => {
    let newGoods = goods
    newGoods[idx] = newValue
    setGoods(newGoods)
    console.log(goods, 'c')
  }

  return (
    <main className='create-group-wrapper'>
        <form>
          <input type='text' placeholder='Название группы' />
        </form>
        <div className="line"></div>
        <GoodsList goods={goods} change={changer}/>
        <AddCheckButton />
        <AddGoodsButton OnClick={adder} />
    </main>
  )
}

export default EditGroupPage