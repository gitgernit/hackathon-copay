import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Scanner} from "@yudiel/react-qr-scanner";

export const GroupPage = () => {
  const { id } = useParams();
  const [isScanOpen, setIsScanOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["group", id],
    queryFn: async () => {
      return {
        id: id,
        name: "группа: " + id,
        members: ["member1", "member2", "member3"],
        // товары

        products: [
          {
            id: 1,
            name: "товар 1",
            price: 100,
            description: "товар 1 описание",
          },
          {
            id: 1,
            name: "товар 1",
            price: 100,
            description: "товар 1 описание",
          },
        ],
      };
    },
    enabled: id !== undefined && id !== null,
  });

  return (
    <div>
      <div className="px-2 py-4">
        <h1 className="text-2xl font-bold">{data?.name}</h1>
      </div>
      
      <div className="p-2 overflow-y-auto max-h-[80dvh] grid gap-2">
        {data?.products.map((product) => (
          <div className="p-2 bg-pink-200 rounded-lg flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-lg font-bold">{product.name}</span>
              <span>{product.description}</span>
            </div>
            <div>{product.price} руб.</div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-2 left-5 right-5">
        <div className="flex justify-center gap-2 items-center">
          <button className="bg-pink-300 text-white p-4 rounded-lg">
            Добавить
          </button>
          <button
            className="bg-pink-300 text-white p-4 rounded-lg"
            onClick={() => setIsScanOpen(!isScanOpen)}
          >
            Сканировать чек
          </button>
        </div>
      </div>
      
      {isScanOpen&& (      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsScanOpen(false)}></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg z-10 w-1/3">
          <div className="p-4">
            <Scanner onScan={d => alert(d[0].rawValue)}/>
          </div>
        </div>
      </div>)}
    </div>
  );
};
