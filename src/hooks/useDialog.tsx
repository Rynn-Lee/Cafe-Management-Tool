import { useEffect, useState } from "react"
import Dialog from "@/components/modal/Dialog"

export default function useDialog(){
  const [isShown, setIsShown] = useState(false)
  const [funcToCall, setFuncToCall] = useState<any>()
  const [window, setWindow] = useState<any>()
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
  
  function ask(text: string, onSucces: any = false, options?: any, windowMethod: any = ""){
    setWindow(windowMethod)
    !isShown && setIsShown(true)
    onSucces && setFuncToCall(() => onSucces)
    setMessage(text)
    console.log(text)
  }


  function DialogWindow(){
    return(
      <>
        {isShown && <Dialog message={message} confirmDialog={confirmDialog} window={window}/>}
      </>
    )
  }

  return {DialogWindow, ask}
}