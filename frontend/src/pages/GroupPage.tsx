import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Scanner} from "@yudiel/react-qr-scanner";
import {eventsApi} from "@/shared/api";

export const GroupPage = () => {
  const { id } = useParams();
  const [isScanOpen, setIsScanOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["group", id],
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
        {/*{data.map((product) => (*/}
        {/*  <div className="p-3 bg-[#F7F2FA] rounded-lg flex justify-between items-start shadow">*/}
        {/*    <div className="flex flex-col">*/}
        {/*      <span className="text-lg font-medium">{product.name}</span>*/}
        {/*      <span>{product.description}</span>*/}
        {/*    </div>*/}
        {/*    <div className='text-md'>{product.price} ₽</div>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
      
      <div className="absolute bottom-2 left-5 right-5">
        <div className="flex justify-center gap-2 items-center">
          <button className="bg-[#ece6f0] active:bg-pink-400 p-4 rounded-2xl">
            Добавить
          </button>
          <button
            className="bg-[#ece6f0] active:bg-pink-400 p-4 rounded-2xl "
            onClick={() => setIsScanOpen(!isScanOpen)}
          >
            Сканировать чек
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
    </div>
  );
};
