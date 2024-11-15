import { Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import './Transaction.css'
import { User } from '../../shared/api/generated';
import { CreateItemModal } from './Modal';

type transaction = {
    id: string;
    title: string
    items: {
        id: string
        title: string
        price: number
        assigned_to: string
        username: string
    }[]
}

interface Props {
    transaction: transaction
    deleteItem: (itemId: string) => void
    eventId: string
    users: User[]
}

const Transaction = ({transaction, deleteItem, users, eventId}: Props) => {
  const [openedModal, setOpenedModal] = useState(false)
  console.log(transaction)


  return (
    <div className='transaction'>
        <h3 className='ibm-plex-sans-semibold'>Транзакция {transaction.title}</h3>
        <div className="transaction-items flex flex-col rounded-md">
            {transaction.items.length > 0 ?
            transaction.items.map((item) => (
                <div className='p-2 flex justify-between' key={item.id}>
                    <h5>{item.title}</h5>
                    <p>{item.price}</p>
                    <div className="users">
                        {item.assigned_to?.map(user => 
                            <span>{user.username}</span>
                        )}
                    </div>
                    {/* <button onClick={() => deleteItem(item.id)}>
                        <Trash2 />
                    </button> */}
                </div>
            ))
            : <div className='transaction-item'>Здесь пока нету товаров</div>}
        </div>
        <div className='transaction-item-add plus' onClick={() => setOpenedModal(true)}>
            <svg className="plus-icon" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlBase="http://www.bohemiancoding.com/sketch/ns" fill="#65558f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke-width="0.00032" fill="none" fill-rule="evenodd" type="MSPage"> <g id="Icon-Set" type="MSLayerGroup" transform="translate(-464.000000, -1087.000000)" fill="#65558f"> <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle" type="MSShapeGroup"> </path> </g> </g> </g></svg>
        </div>
        <CreateItemModal 
            isOpen={openedModal} 
            onClose={() => setOpenedModal(false)} 
            users={users} 
            transactionId={transaction.id}
            eventId={eventId}/>
    </div>
  )
}

export default Transaction