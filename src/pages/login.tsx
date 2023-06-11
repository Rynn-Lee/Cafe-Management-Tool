import { services } from '@/services';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PageLayout } from '@/layouts/PageLayout';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/LoadingScreen';

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
            <div className='status'>{`${auth.isError ? auth.error : "Cafe management tool"}`}</div>
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