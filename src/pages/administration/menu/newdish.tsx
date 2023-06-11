import LoadingScreen from '@/components/LoadingScreen'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import UniStepper from '@/components/UniStepper'
import DishName from '@/components/menu/stepsToAdd/DishName'
import DishCost from '@/components/menu/stepsToAdd/DishCost';
import DishCategory from '@/components/menu/stepsToAdd/DishCategory';
import DishPhoto from '@/components/menu/stepsToAdd/DishPhoto';
import DishFinish from '@/components/menu/stepsToAdd/DishFinish';

export default function Add() {
  const [info, setInfo] = useState<any>({available: false, cost: 0, name: "", ingredients: "", weight: {number: 0, value: "шт"}})
  const [selectedImage, setSelectedImage] = useState("")
  const [setupStep, setSetupStep] = useState(0)
  const [defaultValue, setDefaultValue] = useState("")
  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File>()

  const menu = useQuery({
    queryKey: ["menu"],
    queryFn: () => services.menu.findMenu(),
    enabled: false
  })
  
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => services.category.list(),
    enabled: false
  })

  useEffect(()=>{
    !categories.isFetched && categories.refetch()
  }, [categories])

  const handleUpload = async() => {
    if(!selectedFile) return;
    const data = {
      name: info.name,
      cost: info.cost,
      category: info.category,
      ingredients: info.ingredients,
      available: info.available,
      fileName,
      weight: info.weight
    }
    await services.menu.add(data)
    await services.images.add(selectedFile)
    menu.refetch()
    setInfo({...info, name: "", ingredients: "", cost: 0, weight: {number: 0, value: "шт."}})
    setSelectedImage("")
    setDefaultValue("none")
    setSetupStep(0)
  }

  return (
    <>
      <PageLayout title={"Меню > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <UniStepper setupStep={setupStep} setSetupStep={setSetupStep} dish>
            <DishName
              setSetupStep={setSetupStep}
              setupStep={setupStep}
              info={info}
              setInfo={setInfo}/>
            <DishCost
              setSetupStep={setSetupStep}
              setupStep={setupStep}
              info={info}
              setInfo={setInfo}
              setDefaultValue={setDefaultValue}
              defaultValue={defaultValue}/>
            <DishCategory
              setSetupStep={setSetupStep}
              setupStep={setupStep}
              info={info}
              setInfo={setInfo}
              setDefaultValue={setDefaultValue}
              defaultValue={defaultValue}
              categories={categories}/>
            <DishPhoto
              setSetupStep={setSetupStep}
              setupStep={setupStep}
              info={info}
              setSelectedImage={setSelectedImage}
              setSelectedFile={setSelectedFile}
              setFileName={setFileName}
              selectedImage={selectedImage}/>
            <DishFinish
              info={info}
              setInfo={setInfo}
              handleUpload={handleUpload}/>
          </UniStepper>
        </PageLayout>
      </PageLayout>
      {menu.isFetching && <LoadingScreen />}
    </>
  )
}