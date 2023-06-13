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


  const handleLoginForm = (e: any) => {
    e.preventDefault()
    auth.refetch()
  }

  return (
    <>
      <PageLayout noContent>
        <div className='login-content'>
          <form className='form' onSubmit={handleLoginForm}>
            <div className='title'><span>Ry<Image src={codeIco} alt="code" className="ico4 revert"/>Panel</span></div>
            <div className='status'>{`${auth.isError ? auth.error : ""}`}</div>
            <div className='fields'><span>Имя</span><input name={'FIO'} placeholder='Введите ФИО' onChange={(e) => setAuthFields({...authFields, name: e.target.value})}/></div>
            <div className='fields'><span>Пароль</span><input name={'Password'} type="password" placeholder='Введите пароль'  onChange={(e) => setAuthFields({...authFields, password: e.target.value})}/></div>
            <button>Вход</button>
          </form>
        </div>
      </PageLayout>
      {auth.isFetching && <LoadingScreen/>}
    </>
  )
}