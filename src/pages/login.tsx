import { services } from '@/services';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PageLayout } from '@/layouts/PageLayout';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/LoadingScreen';
import codeIco from "@icons/code2-orange.svg"
import Image from 'next/image';

export default function Login() {
  const [authFields, setAuthFields] = useState<any>({})
  const router = useRouter();

  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.findUsers(authFields.name,false,authFields.password,true),
    onSuccess: (data) => data && router.push("/"),
    enabled: false,
  })

  return (
    <>
      <PageLayout noContent>
        <div className='login-content'>
          <span className='title'>Ry<Image src={codeIco} alt="code" className="ico4 revert"/>Panel</span>
          <span className='status'>{`${auth.isError ? auth.error : ""}`}</span>
          <input placeholder='Введите ФИО' onChange={(e) => setAuthFields({...authFields, name: e.target.value})}/>
          <input type="password" placeholder='Введите пароль'  onChange={(e) => setAuthFields({...authFields, password: e.target.value})}/>
          <button onClick={()=>auth.refetch()}>Вход</button>
        </div>
      </PageLayout>
      {auth.isFetching && <LoadingScreen/>}
    </>
  )
}