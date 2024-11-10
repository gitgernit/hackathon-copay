import {IDetectedBarcode, Scanner} from "@yudiel/react-qr-scanner";
import {FC, useState} from "react";
import {ModalProps} from "./CreateTransactionModal";
import {defaultReq, utilsApi} from "../shared/api";
import {Transaction} from "../shared/api/generated";
import {Button} from "../shared/ui/button";

export const ScannerModal: FC<ModalProps & {
  onHandle: (trx: Transaction) => void,
  eventId: string,
}> = ({onHandle, isOpen,onClose, eventId}) => {
  const [tab, setTab] = useState(0)
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  
  const onSubmit = async (barcode: IDetectedBarcode) => {
    const raw = barcode.rawValue;
    
    const ofd = await utilsApi.ofdApiUtilsOfdPost({
      ofdRequest: {eventId, ofdString: raw},
    }, defaultReq)
    
    setTransaction(transaction)
    
    onHandle(ofd)
    
    setTab(1)
  }
  
  if (!isOpen) return
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg z-10 w-full h-80">
        <div className="p-4">
          {tab == 0 && (
            <div className='min-h-[500px]'>
              <Scanner onScan={(d) => onSubmit(d[0])} />
            </div>
          )}
          
          {tab == 1 && (
            <div className='flex flex-col gap-2'>
              <span className='text-xl font-bold'>Продукты из чека заимпортированы</span>
              
              <Button className='w-full' onClick={onClose}>Окей, спасибо</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}