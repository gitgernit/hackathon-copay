import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Scanner} from "@yudiel/react-qr-scanner";
import {eventsApi} from "../shared/api";
import {CreateTransactionModal} from "../Components/CreateTransactionModal";
import {BackButton} from "@vkruglikov/react-telegram-web-app";
import {LucideArrowLeft, Share} from "lucide-react";
import TransactionsList from "../Components/TransactionsList/TransactionsList";
import {Dialog, DialogContent} from "../shared/ui/dialog";
import QRCode from 'qrcode'
import {Input} from "../shared/ui/input";
import {Button} from "../shared/ui/button";

export const EventPage = () => {
  const { id } = useParams();
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [share, setShare] = useState(false);
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ["event", id],
    queryFn: () => eventsApi.eventByIdApiEventsEventIdGet({
      eventId: id!,
    }),
    initialData: () => ({
      name: 'Название',
      id: '1',
      owner: '123',
      users: [],
      invite: "goida",
      
    }),
    enabled: id !== undefined && id !== null,
  });

  useEffect(() => {
    (async () => {
        if (isNaN(Number(id))) navigate('/', {replace: true})
    })()
  }, [])
  
  
  return (
    <div>
      <div className="px-2 py-4 mb-2">
        <h1 className="text-4xl font-bold">{data.name}</h1>
      </div>
      <div className="w-[360px] border ml-auto mr-auto border-#e3e3e3"></div>
      <div className="p-2 overflow-y-auto max-h-[80dvh] grid gap-2">
        <TransactionsList eventId={id!} />
        {/* {data?.map((product) => (
         <div className="p-3 bg-[#F7F2FA] rounded-lg flex justify-between items-start shadow">
           <div className="flex flex-col">
             <span className="text-lg font-medium">{product.name}</span>
             <span>{product.description}</span>
           </div>
           <div className='text-md'>{product.price} ₽</div>
         </div>
        ))} */}
      </div>
      
      <div className="absolute bottom-2 left-5 right-5">
        <div className="flex justify-center gap-2 items-center">
          <button className='bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl' onClick={() => navigate('/')}>
            <LucideArrowLeft />
          </button>
          <button className="bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl" onClick={() => setIsOpenModal(true)}>
            Добавить
          </button>
          <button
            className="bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl"
            onClick={() => setIsScanOpen(!isScanOpen)}
          >
            Сканировать чек
          </button>
          
          <button className="bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl" onClick={async () => {
            setShare(!share)
            setTimeout(() => {
              QRCode.toCanvas(document.querySelector('#goida'), data?.invite)
            }, 300)
          }}>
            <Share />
          </button>
        </div>
      </div>
      
      {isScanOpen&& (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsScanOpen(false)}></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg z-10 w-full h-80">
            <div className="p-4 min-h-[500px]">
              <Scanner onScan={d => alert(d[0].rawValue)} />
            </div>
          </div>
        </div>
      )}
      
      <CreateTransactionModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
      
      <BackButton onClick={() => navigate('/')}></BackButton>
      
      <Dialog open={share} onOpenChange={() => setShare(!share)}>
        <DialogContent>
          <canvas id="goida" className='min-w-64 min-h-64 mx-auto' />
          <div className='flex items-center gap-1'>
            <Input disabled value={data.invite} />
            <Button onClick={() => {
              navigator.clipboard.writeText(data.invite)
            }}>Копировать</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
