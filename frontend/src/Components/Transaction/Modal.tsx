import { FC, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../../shared/ui/dialog";
import { Input } from "../../shared/ui/input";
import React from "react";
import { User } from "../../shared/api/generated";
import { transactionsApi } from "../../shared/api";
import { queryClient } from "../../app";
import { Button } from "../../shared/ui/button";

export interface ModalProps {
  isOpen: boolean;
  users: User[];
  eventId: string;
  transactionId: string;
  onClose: () => void;
}

export const CreateItemModal: FC<ModalProps> = ({ isOpen, onClose, users, transactionId, eventId }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [user, setUser] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await transactionsApi.addItemToTransactionApiTransactionEventIdTransactionIdItemsPost({
        eventId,
        transactionId,
        bodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPost:
        {
          title,
          price,
          addAllUsers: true,
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      queryClient.invalidateQueries({queryKey: ["transaction", eventId]})
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Добавить новый товар</DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Название</label>
            <Input id='title' value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div>
            <label htmlFor="price">Стоимость</label>
            <Input
              id='price'
              value={price}
              onChange={(e) => {
                const num = Number(e.target.value);
                if (!isNaN(num)) {
                  setPrice(num)
                }
              }}
            />
          </div>

          <div>
            <label htmlFor="user">Пользователь: </label>
            <select
              className="select-user"
              id="user"
              name="user"
              value={user}
              onChange={handleChange}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <Button className="w-full mt-2" type="submit">Создать</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
