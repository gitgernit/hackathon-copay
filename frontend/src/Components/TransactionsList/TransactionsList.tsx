import React, { useEffect } from 'react'
import Transaction from '../Transaction/Transaction'
import { defaultReq, eventsApi, transactionsApi } from '../../shared/api'
import './TransactionsList.css'
import { useQuery } from '@tanstack/react-query'
import { OutputTransaction, User } from '../../shared/api/generated'

interface Props {
  eventId: string
  users: User[]
}

const TransactionsList = ({ eventId, users }: Props) => {
  const [transactions, setTransactions] = React.useState<any[]>([])

  const { data, refetch } = useQuery({
    queryKey: ['transaction', eventId],
    queryFn: () => transactionsApi.listTransactionsApiTransactionEventIdGet({ eventId }, defaultReq),
  })

  useEffect(() => {
    setTransactions(data || [])
  }, [data])

  const deleteItem = (itemId: string) => {
    // await DELETE_ITEM(itemId)
    const newTransactions = transactions.map(transaction => ({
      ...transaction, items: transaction.items.filter(item => item.id !== itemId)
    }))
    setTransactions(newTransactions)
  }

  return (
    <>
      <div className='transactions-list overflow-y-auto'>
        {transactions.map(transaction =>
          <Transaction
            key={transaction.id}
            deleteItem={deleteItem}
            transaction={transaction!}
            eventId={eventId}
            users={users || []} />
        )}
      </div>
    </>
  )
}

export default TransactionsList
