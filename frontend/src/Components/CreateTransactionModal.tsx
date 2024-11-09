import {FC, useState} from "react";
import {Dialog, DialogContent, DialogHeader} from "../shared/ui/dialog";
import {Input} from "../shared/ui/input";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTransactionModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Добавить позицию</DialogHeader>
        
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
          <label htmlFor="assign">Заплатит:</label>
          
        </div>
      </DialogContent>
    </Dialog>
  )
}