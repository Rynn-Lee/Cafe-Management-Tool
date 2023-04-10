import React, { PropsWithChildren, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { services } from "@/services";
import { useSelector, useDispatch } from "react-redux"
import { setInfo } from '@/reducers/authSlice'

export default function Layout({ children }: PropsWithChildren){
  const auth = useSelector((state: any) => state.auth.info[0])
  const router = useRouter();
  const dispatch = useDispatch()

  const changeRoute = (path: string) => {
    path !== "/login" && (router.push("/login"))
  }

  useEffect(()=>{
    const userData = services.account.checkLogin()
    const path = router.pathname
    if(path === "/login") return
    !auth && userData ? dispatch(setInfo(userData)) : changeRoute(path)

      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      {auth && <Sidebar/>}
      {children}
    </>
  );
};