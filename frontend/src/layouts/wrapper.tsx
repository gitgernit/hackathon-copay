import {Outlet, useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useInitData} from "@vkruglikov/react-telegram-web-app";
import {defaultReq, eventsApi} from "../shared/api";
import {queryClient} from "../app";

export const Wrapper = () => {
  const [initUnsafe, init] = useInitData();
  
  const [url, setUrl] = useSearchParams()
  
  useEffect(() => {
    console.log(url)
    setTimeout(async () => {
      if (url.has('tgWebAppStartParam')) {
        await eventsApi.addToEventApiEventsAddEventIdPost({eventId: url.get('tgWebAppStartParam')}, defaultReq)
        await queryClient.invalidateQueries({
          queryKey: ["events"]
        })
      } else {}
    }, 500)
  }, [url]);
  
  
  useEffect(() => {
    (async () => {
      console.log('авторизация', init, initUnsafe)
      
      if(initUnsafe || init) {
        if (initUnsafe?.user?.id) {
          localStorage.setItem('userId', initUnsafe?.user?.id.toString())
        }
        // console.log(await AuthToken.getToken(initUnsafe as any))
      }
    })()
    
  }, [initUnsafe, init]);
  
  return <Outlet />
}