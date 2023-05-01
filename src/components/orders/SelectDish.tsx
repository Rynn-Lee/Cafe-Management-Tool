import { services } from "@/services"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"


export default function SelectDish() {
  const menu = useQuery({
    queryKey: ["menu"],
    queryFn: () => services.menu.findMenu(),
    onSuccess: (data) => console.log(data),
    enabled: false
  })

  useEffect(()=>{
    !menu.data && menu.refetch()
  }, [menu])
  

  return (
    <div>
      <ul>
        {menu?.data?.map((dish: any) => (
          <li key={dish._id}>{dish.name}</li>
        ))}
      </ul>
    </div>
  )
}