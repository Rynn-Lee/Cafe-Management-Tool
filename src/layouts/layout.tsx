import React, { PropsWithChildren, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import { services } from "@/services";
import { useQuery } from '@tanstack/react-query';
import Login from "@/pages/login";

export default function Layout({ children }: PropsWithChildren){
  const router = useRouter();

  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.checkLogin(),
    onError: () => router.push("/login")
  })

  useEffect(()=>{
    const userData = services.account.checkLogin()
    const path = router.pathname
    if(path === "/login") return
    !userData && router.push("/login")
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      {!auth.data && <Login />}
      {auth.data && <Sidebar/>}
      {auth.data && children}
    </>
  );
};