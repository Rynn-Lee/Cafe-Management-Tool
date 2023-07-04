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
    onSuccess: (data) => {(!data && router.pathname != "/login") && router.push("/login")},
    onError: () => router.push("/login")
  })

  return (
    <>
      {!auth.data && <Login />}
      {auth.data && <Sidebar/>}
      {auth.data && children}
    </>
  );
};