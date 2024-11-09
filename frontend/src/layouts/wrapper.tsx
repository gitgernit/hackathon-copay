import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import { AuthToken } from "@/api/server";
import {useInitData} from "@vkruglikov/react-telegram-web-app";

export const Wrapper = () => {
  const [initUnsafe, init] = useInitData();
  
  useEffect(() => {
    (async () => {
      console.log('авторизация', init, initUnsafe)
      
      if(initUnsafe || init) {
        console.log(await AuthToken.getToken(initUnsafe as any))
      }
    })()
  }, [initUnsafe, init]);
  
  return <Outlet />
}