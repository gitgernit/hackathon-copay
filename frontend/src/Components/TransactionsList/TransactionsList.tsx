import React, { useEffect } from 'react'
import Transaction from '../Transaction/Transaction'
import { eventsApi, transactionsApi } from '../../shared/api'
import './TransactionsList.css'
import { useQuery } from '@tanstack/react-query'

interface Props {
    eventId: string
}

const TransactionsList = ({eventId}: Props) => {
  const [transactions, setTransactions] = React.useState<any[]>([])
  const [current, setCurrent] = React.useState<any[]>([])

  const {data} = useQuery({
    queryKey: ['events'],
    queryFn: () => eventsApi.eventByIdApiEventsEventIdGet({eventId}),
  })


  useEffect(() => {
    (async () => {
        //   const res = await transactionsApi.addItemToTransactionApiTransactionEventIdTransactionIdItemsPost()
        const res = [
            {
                id: 123,
                title: 'Поход куда-то',
                items: [
                    {
                        id: 124,
                        title: 'товар 1',
                        price: 100,
                        assigned_to: "132",
                        username: 'user3'
                    },
                    {
                        id: 125,
                        title: 'товар 2',
                        price: 40,
                        assigned_to: "130",
                        username: 'user1'
                    },
                    {
                        id: 126,
                        title: 'товар 3',
                        price: 1000,
                        assigned_to: "131",
                        username: 'user2'
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
                        assigned_to: "130",
                        username: 'user1'
                    },
                    {
                        id: 129,
                        title: 'товар',
                        price: 10,
                        assigned_to: "130",
                        username: 'user1'
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
                transaction={transaction}
                eventId={eventId}
                // users={data?.users} />
                users={[
                    {id: 130, username: 'user1'},
                    {id: 131, username: 'user2'},
                    {id: 132, username: 'user3'}
                ]} />
            )}
        </div>
        <div className='transactions-list-filters'>
            <button className={transactions !== current ? 'active' : ''} onClick={() => filerTransactions('my')}>Мои товары</button>
            <button className={transactions === current ? 'active' : ''} onClick={() => filerTransactions('all')}>Товары группы</button>
        </div>
    </>
  )
}

export default TransactionsList