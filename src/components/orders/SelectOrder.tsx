import { services } from "@/services"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useEffect } from "react"
import LoadingScreen from "../LoadingScreen"


export default function SelectOrder() {
  const employeemenu = useQuery({
    queryKey: ["employeemenu"],
    queryFn: () => services.menu.findMenu({available: true}),
    onSuccess: (data) => console.log(data),
    enabled: false
  })

  useEffect(()=>{
    !employeemenu.data && employeemenu.refetch()
  }, [employeemenu])
  

  return (
    <div className="menu-body menu-waiter">
      {employeemenu.data?.map((item: any, index: number)=>(
        <div className={`horizontal menu-card ${!item.available ? "unavailable" : ""}`} key={index}>
          <Image src={"/images/" + item.filename} alt="image" width={300} height={300} className="img-fill"/>
        </div>
      ))}
      {employeemenu.isFetching && <LoadingScreen />}
    </div>
  )
}