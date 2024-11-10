import {IDetectedBarcode, Scanner} from "@yudiel/react-qr-scanner";
import {FC, useState} from "react";
import {ModalProps} from "./CreateTransactionModal";
import {defaultReq, utilsApi} from "../shared/api";
import {Transaction} from "../shared/api/generated";

export const ScannerModal: FC<ModalProps & {
  onHandle: (trx: Transaction) => void,
  eventId: string,
}> = ({onHandle, isOpen,onClose, eventId}) => {
  const [tab, setTab] = useState(0)
  
  const onSubmit = async (barcode: IDetectedBarcode) => {
    const raw = barcode.rawValue;
    
    const ofd = await utilsApi.ofdApiUtilsOfdPost({
      ofdRequest: {eventId, ofdString: raw},
    }, defaultReq)
    
    onHandle(ofd)
    
    setTab(1)
  }
  
  if (!isOpen) return
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg z-10 w-full h-80">
        <div className="p-4 min-h-[500px]">
          {tab == 0 && (
            <Scanner onScan={(d) => onSubmit(d[0])} />
          )}
          
          {tab == 1 && (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}