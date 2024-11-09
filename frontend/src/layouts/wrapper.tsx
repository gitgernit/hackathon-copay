import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import { AuthToken } from "@/api/server";
import {useInitData} from "@vkruglikov/react-telegram-web-app";

export const Wrapper = () => {
  const [initUnsafe] = useInitData();
  
  useEffect(() => {
    (async () => {
      if(initUnsafe) {
        await AuthToken.getToken(initUnsafe as any)
      }
    })()
  }, [initUnsafe]);
  
  return <Outlet />
}