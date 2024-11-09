import React, { useState } from 'react'
import './GoodsList.css'

interface Props {
    goods: string[];
    change: (idx: number, newValue: string) => void
}

const GoodsList = ({goods, change}: Props) => {
  const [unselected, setUnselected] = useState<boolean[]>([])
  const [Goods, setGoods] = useState<string[]>([])


  const handleChange = (idx: number) => {
    const newUnselected = [...unselected]
    newUnselected[idx] = !newUnselected[idx]
    // fetch('unselect')
    setUnselected(newUnselected)
  }

  const handleChangeName = (idx: number, newValue: string) => {
    change(idx, newValue)
    // let newGoods = Goods
    // newGoods[idx] = newValue
    // setGoods(newGoods)
  }

  return (
    <div className='goods-list'>
        {goods.map((good, idx) => 
            <div key={idx} className='goods-list-item'>
                <input 
                  type="text" 
                  className='ibm-plex-sans-regular' 
                  placeholder="Название товара" 
                  value={goods[idx] || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeName(idx, event.target.value)}/>
                <input type="checkbox" checked={!unselected[idx]} onChange={() => handleChange(idx)}/>
            </div>
        )}
    </div>
  )
}

export default GoodsList