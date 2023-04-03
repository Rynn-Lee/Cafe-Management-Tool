import React, { PropsWithChildren, useEffect, useState} from "react";
import Navbar from "./Sidebar";
import { useRouter } from "next/router";
import { services } from "@/services";
import { useSelector, useDispatch } from "react-redux"
import { setInfo } from '@/reducers/auth/authSlice'
import { ServerResponse } from "http";

export default function Layout({ children }: PropsWithChildren){
  const auth = useSelector((state: any) => state.auth.info[0])
  const router = useRouter();
  const dispatch = useDispatch()

  const changeRoute = async(path: string) => {
    const login = services.account.checkLogin()
    !login && path !== "/login" && (router.push("/login"))
    !auth && dispatch(setInfo(login))
  }

  useEffect(()=>{
    const login = services.account.checkLogin()
    const path = router.pathname
    
    if(path === "/login") return
    changeRoute(path)

    router.events.on('routeChangeComplete', (url) => changeRoute(path))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      {auth && <Navbar passedName={auth}/>}
      {children}
    </>
  );
};