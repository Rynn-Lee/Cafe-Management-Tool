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

    const checkUserExistanse: any = await services.account.findUsers(
      formResults['FIO'].value,
      false,
      formResults['Password'].value
    )

    if(!checkUserExistanse){
      formResults['result'].value = "Проверьте логин или пароль!"
      return
    }

    dispatch(setInfo(checkUserExistanse))
    router.push("/")
  }

  return (
    <>
      <PageLayout noContent>
        <div className='login-content'>
          <div className='login-block'>
            <form className='vertical' ref={loginForm as any} onSubmit={handleLoginForm}>
              <div className='horizontal'><input value="Cafe Management Tool" className="input-placeholder status width-500" name={'result'} disabled/></div>
              <div className='horizontal'><input value="ФИО" className="input-placeholder width-100" disabled/><input name={'FIO'} placeholder='Введите ФИО' className='width-400'/></div>
              <div className='horizontal'><input value="Пароль" className="input-placeholder width-100" disabled/><input name={'Password'} type="password" placeholder='Введите пароль' className='width-400'/></div>
              <button name={'button'} className='width-500'>Вход</button>
            </form>
          </div>
        </div>
      </PageLayout>
    </>
  )
}