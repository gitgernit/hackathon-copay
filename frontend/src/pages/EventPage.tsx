import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {eventsApi} from "../shared/api";
import {CreateTransactionModal} from "../Components/CreateTransactionModal";
import {BackButton} from "@vkruglikov/react-telegram-web-app";
import {LucideArrowLeft} from "lucide-react";
import {ScannerModal} from "../Components/ScannerModal";

export const EventPage = () => {
  const { id } = useParams();
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ["event", id],
    queryFn: () => eventsApi.eventByIdApiEventsEventIdGet({
      eventId: id!,
    }),
    enabled: id !== undefined && id !== null,
  });

  return (
    <div>
      <div className="px-2 py-4">
        <h1 className="text-2xl font-bold">{data?.name}</h1>
      </div>
      
      <div className='mt-10'>
        {data?.name}
      </div>
      
      <div className="p-2 overflow-y-auto max-h-[80dvh] grid gap-2">
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
        </div>
      </div>
      
      <ScannerModal isOpen={isOpenModal} onClose={() => setIsScanOpen(false)} onHandle={(d) => {
      
      }} />
      
      <CreateTransactionModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
      
      <BackButton onClick={() => navigate('/')}></BackButton>
    </div>
  );
};
