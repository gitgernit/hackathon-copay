import React from 'react'
import './AddGoodsButton.css'

interface Props {
  OnClick: () => void
}

const AddGoodsButton = ({OnClick}: Props) => {
  return (
    <button onClick={OnClick}>
      <div className="plus"></div>
      <span>Товар</span>
    </button>
  )
}

export default AddGoodsButton