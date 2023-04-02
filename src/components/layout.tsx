import React, { PropsWithChildren, useEffect, useState} from "react";
import Navbar from "./Sidebar";
import { useRouter } from "next/router";
import { services } from "@/services";
import { useSelector, useDispatch } from "react-redux"
import { setInfo } from '@/reducers/auth/authSlice'

export default function Layout({ children }: PropsWithChildren){
  const auth = useSelector((state: any) => state.auth.info)
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(()=>{
    let response = services.account.checkLogin()
    const path = router.pathname
    response && dispatch(setInfo(response))

    if(path !== "/login" && !response){
      router.push("/login");
      return
    }
    router.events.on('routeChangeComplete', () => {
      response = services.account.checkLogin()
      if(!response){
        router.push("/login");
        return
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <Navbar passedName={auth}/>
      {children}
    </>
  );
};