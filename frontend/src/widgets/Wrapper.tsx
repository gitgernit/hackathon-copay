import {FC, useEffect} from "react";
import {Outlet} from "react-router-dom";

export const Wrapper: FC = () => {
  useEffect(() => {
    fetch('').then(res => res.ok).then(ok => ok)
  }, []);
  
  return <Outlet />
}