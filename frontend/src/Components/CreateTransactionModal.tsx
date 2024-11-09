import {FC, useState} from "react";
import {Dialog, DialogContent, DialogHeader} from "../shared/ui/dialog";
import {Input} from "../shared/ui/input";
import React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTransactionModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [user, setUser] = useState('')
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Добавить позицию</DialogHeader>
        <form>
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
            <label htmlFor="user">Пользователь:</label>
            <Input
              id='user'
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>

          <button type="submit">Создать</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}