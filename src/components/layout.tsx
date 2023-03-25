import React, { PropsWithChildren} from "react";
import Navbar from "./Sidebar";

export default function Layout({ children }: PropsWithChildren){
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
};