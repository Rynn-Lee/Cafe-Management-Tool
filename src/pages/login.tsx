import { services } from '@/services';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PageLayout } from '@/layouts/PageLayout';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/LoadingScreen';
import { Input } from "@styles/input"
import { Label } from "@styles/label"
import { Button } from "@styles/button"
let md5 = require('md5');

export default function Login() {
  const [authFields, setAuthFields] = useState<any>({})
  const router = useRouter();

  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.findUsers(authFields.name,false,authFields.password,true),
    onSuccess: (data) => data && router.push("/"),
    enabled: false,
  })


  const handleLoginForm = (e: any) => {
    e.preventDefault()
    auth.refetch()
  }

  return (
    <>
      <PageLayout noContent>
        <div className='login-content items-center gap-1.5'>
          <form onSubmit={handleLoginForm}>
            <Label>{`${auth.isError ? auth.error : "Cafe Management tool"}`}</Label><br/>
            <Label htmlFor="name">ФИО</Label>
            <Input id="name" placeholder="ФИО" onChange={(e) => setAuthFields({...authFields, name: e.target.value})}/>
            <Label htmlFor="password">Пароль</Label>
            <Input type="password" id="password" placeholder="Пароль" onChange={(e) => setAuthFields({...authFields, password: e.target.value})}/>
            <Button size={"auto"} variant={"teal"}>Войти</Button>
          </form>
        </div>
      </PageLayout>
      {auth.isFetching && <LoadingScreen/>}
    </>
  )
}