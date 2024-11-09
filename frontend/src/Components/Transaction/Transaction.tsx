import { Trash2 } from 'lucide-react';
import React from 'react'
import './Transaction.css'

type transaction = {
    id: string;
    title: string
    items: {
        id: string
        title: string
        price: number
        assigned_to: string
    }[]
}

interface Props {
    transaction: transaction
    deleteItem: (itemId: string) => void
}

const Transaction = ({transaction, deleteItem}: Props) => {
  return (
    <div className='transaction'>
        <h3 className='ibm-plex-sans-semibold'>Транзакция {transaction.title}</h3>
        <div className="transaction-items">
            {transaction.items.length > 0 ?
            transaction.items.map((item) => (
                <div className='transaction-item' key={item.id}>
                    <h5>{item.title}</h5>
                    <p>{item.price}</p>
                    <button onClick={() => deleteItem(item.id)}>
                        <Trash2 />
                    </button>
                </div>
            ))
            : <div className='transaction-item'>Здесь пока нету товаров</div>}
        </div>
    </div>
  )
}

export default Transaction