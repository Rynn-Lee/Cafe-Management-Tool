import { useState } from "react"
import Dialog from "@/components/modal/Dialog"

export default function useDialog(){
  const [isShown, setIsShown] = useState(false)
  const [funcToCall, setFuncToCall] = useState<any>()
  const [message, setMessage] = useState<any>()

  const confirmDialog = (choice: boolean) =>{
    if(!choice){
      setIsShown(false)
      return
    }
    funcToCall()
    setIsShown(false)
    return choice
  }
  
  function ask(text: string, onSucces: any, options?: any){
    !isShown && setIsShown(true)
    setFuncToCall(() => onSucces)
    setMessage(text)
  }


  function DialogWindow({children}: any){
    return(
      <>
        {isShown && <Dialog message={message} confirmDialog={confirmDialog}/>}
        {children}
      </>
    )
  }

  return {DialogWindow, ask}
}