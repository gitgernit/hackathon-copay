import React, { useEffect } from 'react'
import Transaction from '../Transaction/Transaction'
import { eventsApi } from '../../shared/api'
import './TransactionsList.css'

interface Props {
    eventId: string
}

const TransactionsList = ({eventId}: Props) => {
  const [transactions, setTransactions] = React.useState<any[]>([])

  useEffect(() => {
    (async () => {
        //   const res = await GET_TRANSACTIONS(eventId)
        const res = [
            {
                id: 123,
                title: 'Поход куда-то',
                items: [
                    {
                        id: 124,
                        title: 'товар 1',
                        price: 100,
                    },
                    {
                        id: 125,
                        title: 'товар 2',
                        price: 40,
                    },
                    {
                        id: 126,
                        title: 'товар 3',
                        price: 1000,
                    }
                ]
            },
            {
                id: 127,
                title: 'Поход куда-то ещё',
                items: [
                    {
                        id: 128,
                        title: 'ещё какой-то товар',
                        price: 640,
                    },
                    {
                        id: 129,
                        title: 'товар',
                        price: 10,
                    },
                ]
            }
        ]

        setTransactions(res)
        })()
  }, [])

  const deleteItem = (itemId: string) => {
    // await DELETE_ITEM(itemId)
    const newTransactions = transactions.map(transaction => ({
        ...transaction, items: transaction.items.filter(item => item.id !== itemId)
    }))
    setTransactions(newTransactions)
  }

  return (
    <div className='transactions-list'>
        {transactions.map(transaction => 
            <Transaction 
            key={transaction.id} 
            deleteItem={deleteItem} 
            transaction={transaction} />
        )}
    </div>
  )
}

export default TransactionsList