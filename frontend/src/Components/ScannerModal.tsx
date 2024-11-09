import {IDetectedBarcode, Scanner} from "@yudiel/react-qr-scanner";
import {FC} from "react";
import {ModalProps} from "./CreateTransactionModal";
import {defaultReq, utilsApi} from "../shared/api";
import {AppModelsOfdItem} from "../shared/api/generated";

export const ScannerModal: FC<ModalProps & {
  onHandle: (items: AppModelsOfdItem[]) => void
}> = ({onHandle, isOpen,onClose}) => {
  const onSubmit = async (barcode: IDetectedBarcode) => {
    const raw = barcode.rawValue;
    
    const ofd = await utilsApi.ofdApiUtilsOfdPost({
      ofdString: raw,
    }, defaultReq)
    
    alert(JSON.stringify(ofd, null, 2))
    
    onHandle(ofd)
    
    onClose();
  }
  
  if (!isOpen) return
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg z-10 w-full h-80">
        <div className="p-4 min-h-[500px]">
          <Scanner onScan={(d) => onSubmit(d[0])} />
        </div>
      </div>
    </div>
  )
}