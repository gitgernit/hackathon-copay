import React, { useEffect, useState } from 'react'
import './GoodsList.css'

interface Props {
    goods: string[]
}

const GoodsList = ({goods}: Props) => {
  const [unselected, setUnselected] = useState<boolean[]>([])


  const handleChange = (idx: number) => {
    const newUnselected = [...unselected]
    newUnselected[idx] = !newUnselected[idx]
    // fetch('unselect')
    setUnselected(newUnselected)
  }

  return (
    <div className='goods-list'>
        {goods.map((good, idx) => 
            <div key={idx} className='goods-list-item'>
                <p className='ibm-plex-sans-regular'>{good}</p>
                <input type="checkbox" checked={!unselected[idx]} onChange={() => handleChange(idx)}/>
            </div>
        )}
    </div>
  )
}

export default GoodsList