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
    <div className="menu-waiter">
      {employeemenu.data?.map((item: any, index: number)=>(
        <div className={`horizontal menu-waiter-dish${!item.available ? "unavailable" : ""}`} key={index}>
          <div>
            <div>
              <span className="title">{item.name}</span>
              <span className="cost">{item.cost} тг.</span>
            </div>
            <Image src={"/images/" + item.filename} alt="image" width={400} height={400} className="img-fill2"/>
          </div>
        </div>
      ))}
      {employeemenu.isFetching && <LoadingScreen />}
    </div>
  )
}