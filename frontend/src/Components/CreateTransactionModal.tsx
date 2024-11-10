import { FC, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../shared/ui/dialog";
import { Input } from "../shared/ui/input";
import React from "react";
import { User } from "../shared/api/generated";
import { transactionsApi } from "../shared/api";
import { Button } from "../shared/ui/button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

export const CreateTransactionModal: FC<ModalProps> = ({ isOpen, onClose, eventId }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(title)

    try {
      transactionsApi.createTransactionApiTransactionEventIdPost({
        eventId,
        body: title
      })
    } catch (error) {
      console.error(error)
    } finally {
      isOpen = false
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Создать новую транзакцию</DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Название</label>
            <Input id='title' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <Button className="w-full mt-2" type="submit">Создать</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
