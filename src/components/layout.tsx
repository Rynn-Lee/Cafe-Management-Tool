import React, { PropsWithChildren, useEffect } from "react";
import Navbar from "./Sidebar";
import { useRouter } from "next/router";
import { services } from "@/services";
import { useSelector, useDispatch } from "react-redux"
import { setInfo } from '@/reducers/auth/authSlice'

export default function Layout({ children }: PropsWithChildren){
  const auth = useSelector((state: any) => state.auth.info[0])
  const router = useRouter();
  const dispatch = useDispatch()
  
  const changeRoute = async(userData: string, path: string) => {
    !userData && path !== "/login" && (router.push("/login"))
    dispatch(setInfo(userData))
  }

  useEffect(()=>{
    const userData = services.account.checkLogin()
    const path = router.pathname
    if(path === "/login") return
    changeRoute(userData, path)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      {auth && <Navbar passedName={auth}/>}
      {children}
    </>
  );
};