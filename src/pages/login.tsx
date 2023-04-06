import { services } from '@/services';
import { useRouter } from 'next/router'
import { useRef} from 'react'
import { useDispatch } from "react-redux"
import { setInfo } from '@/reducers/authSlice'
import { PageLayout } from '@/layouts/PageLayout';
let md5 = require('md5');

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch()
  const loginForm = useRef()

  const handleLoginForm = async(e: any) => {
    e.preventDefault()
    const formResults: any = loginForm.current
    formResults['result'].value = "Проверка..."

    const checkUserExistanse: any = await services.account.findUser(
      formResults['FIO'].value,
      formResults['Password'].value,
      true
    )

    if(!checkUserExistanse){
      formResults['result'].value = "Произошла ошибка!"
      return
    }
    dispatch(setInfo(checkUserExistanse))
    router.push("/")
  }

  return (
    <>
      <PageLayout title={"Аккаунт - Управление кафе"} noContent>
        <div className='login-content'>
          <div className='login-block'>
            <form className='vertical' ref={loginForm as any} onSubmit={handleLoginForm}>
              <div className='horizontal'><input value="Cafe Management Tool" className="input-placeholder status" name={'result'} disabled/></div>
              <div className='horizontal'><input value="ФИО" className="input-placeholder" disabled/><input name={'FIO'} placeholder='Введите ФИО'/></div>
              <div className='horizontal'><input value="Пароль" className="input-placeholder" disabled/><input name={'Password'} type="password" placeholder='Введите пароль'/></div>
              <button name={'button'}>Вход</button>
            </form>
          </div>
        </div>
      </PageLayout>
    </>
  )
}