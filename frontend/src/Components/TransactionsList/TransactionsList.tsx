import React, { useEffect } from 'react'
import Transaction from '../Transaction/Transaction'
import { eventsApi, transactionsApi } from '../../shared/api'
import './TransactionsList.css'
import { useQuery } from '@tanstack/react-query'

interface Props {
  eventId: string
}

const TransactionsList = ({ eventId }: Props) => {
  const [transactions, setTransactions] = React.useState<any[]>([])
  const [current, setCurrent] = React.useState<any[]>([])

  const { data } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventsApi.eventByIdApiEventsEventIdGet({ eventId }),
  })


  useEffect(() => {
    (async () => {
      const res = await transactionsApi.listTransactionsApiTransactionEventIdGet({ eventId })

      setTransactions(res || [])
      setCurrent(res || [])
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

  return (
    <>
      <div className='transactions-list overflow-y-auto'>
        {current.map(transaction =>
          <Transaction
            key={transaction.id}
            deleteItem={deleteItem}
            transaction={transaction}
            eventId={eventId}
            users={data?.users || []} />
        )}
      </div>
    </>
  )
}

export default TransactionsList
