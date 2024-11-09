import React, { useEffect } from 'react'
import Transaction from '../Transaction/Transaction'
import { eventsApi } from '../../shared/api'
import './TransactionsList.css'

interface Props {
    eventId: string
}

const TransactionsList = ({eventId}: Props) => {
  const [transactions, setTransactions] = React.useState<any[]>([])
  const [current, setCurrent] = React.useState<any[]>([])

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
                        assigned_to: "132"
                    },
                    {
                        id: 125,
                        title: 'товар 2',
                        price: 40,
                        assigned_to: "130"
                    },
                    {
                        id: 126,
                        title: 'товар 3',
                        price: 1000,
                        assigned_to: "131"
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
                        assigned_to: "130"
                    },
                    {
                        id: 129,
                        title: 'товар',
                        price: 10,
                        assigned_to: "130"
                    },
                ]
            }
        ]

        setTransactions(res)
        setCurrent(res)
        })()
  }, [])

  const deleteItem = (itemId: string) => {
    // await DELETE_ITEM(itemId)
    const newTransactions = transactions.map(transaction => ({
        ...transaction, items: transaction.items.filter(item => item.id !== itemId)
    }))
    setTransactions(newTransactions)
    setCurrent(newTransactions)
  }

  const filerTransactions = (filter = 'all') => {
    console.log(localStorage.getItem('userId'))
    console.log(transactions)
    if (filter === 'all') {setCurrent(transactions)}
    else {
        setCurrent(transactions.map(
            transaction => ({
                ...transaction, 
                items: transaction.items.filter(
                    item => item.assigned_to === localStorage.getItem('userId')
                )}
            )
        ))
    }
  }

  return (
    <>
        <div className='transactions-list'>
            {current.map(transaction => 
                <Transaction 
                key={transaction.id} 
                deleteItem={deleteItem} 
                transaction={transaction} />
            )}
        </div>
        <div className='transactions-list-filters'>
            <button onClick={() => filerTransactions('my')}>Мои товары</button>
            <button onClick={() => filerTransactions('all')}>Товары группы</button>
        </div>
    </>
  )
}

export default TransactionsList