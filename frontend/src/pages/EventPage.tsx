import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { calculateDebitsApi, defaultReq, eventsApi } from "../shared/api";
import { CreateTransactionModal } from "../Components/CreateTransactionModal";
import { BackButton } from "@vkruglikov/react-telegram-web-app";
import { LucideArrowLeft, Share } from "lucide-react";
import TransactionsList from "../Components/TransactionsList/TransactionsList";
import { Dialog, DialogContent } from "../shared/ui/dialog";
import QRCode from 'qrcode'
import { Input } from "../shared/ui/input";
import { Button } from "../shared/ui/button";
import '../styles/EventPage.css'
import React from "react";
import { ScannerModal } from "../Components/ScannerModal";

export const EventPage = () => {
  const { id } = useParams();
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [share, setShare] = useState(false);
  const [showDebt, setShowDebt] = useState(false);
  const navigate = useNavigate()

  const { data, refetch } = useQuery({
    queryKey: ["event", id],
    queryFn: () => eventsApi.eventByIdApiEventsEventIdGet({
      eventId: id!,
    }),
    enabled: id !== undefined && id !== null,
  });

  useEffect(() => {
    (async () => {
      // if (isNaN(Number(id))) navigate('/', {replace: true})
    })()
  }, [])

  const calculateDebt = async () => {
    await calculateDebitsApi.calculateEventDebtsApiCalculateDebitsEventsEventIdPost({
      eventId: id!,
    }, defaultReq).catch();

    setShowDebt(true)
  }


  return (
    <div>
      <div className="px-2 py-4 mb-2 flex justify-between items-center">
        <h1 className="text-4xl font-bold">{data?.name}</h1>
        <button className="p-2 rounded-2xl bg-red-100" onClick={calculateDebt}>Посчитать долги</button>
      </div>
      <div className="w-full border ml-auto mr-auto border-#e3e3e3"></div>
      <div className="p-2 overflow-y-auto max-h-[80dvh] grid gap-2">
        <TransactionsList eventId={id!} />
      </div>

      <div className="absolute bottom-2 left-5 right-5">
        <div className="flex justify-center gap-2 items-center">
          <button className='bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl' onClick={() => navigate('/')}>
            <LucideArrowLeft />
          </button>
          <button className="bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl" onClick={() => setIsOpenModal(true)}>
            Добавить транзакцию
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
              QRCode.toCanvas(document.querySelector('#goida'), data?.invite || '')
            }, 300)
          }}>
            <Share />
          </button>
        </div>
      </div>

      <ScannerModal isOpen={isScanOpen} onClose={() => setIsScanOpen(false)} onHandle={() => {
        refetch()
      }} eventId={id!} />

      <CreateTransactionModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        eventId={id!} />

      <BackButton onClick={() => navigate('/')}></BackButton>

      <Dialog open={showDebt} onOpenChange={() => setShowDebt(!showDebt)}>
        <DialogContent>
          <span className="text-xl">Долги посчитаны, коллекторы отправлены</span>
        </DialogContent>
      </Dialog>

      <Dialog open={share} onOpenChange={() => setShare(!share)}>
        <DialogContent>
          <canvas id="goida" className='min-w-64 min-h-64 mx-auto' />
          <div className='flex items-center gap-1'>
            <Input disabled value={data?.invite || ''} />
            <Button onClick={() => {
              navigator.clipboard.writeText(data?.invite || '')
            }}>Копировать</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
