import AppRouter from '@/routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import {useLoginStore} from '@/store/loginStore'
import LoginRouter from '@/routes/LoginRouter'

function MainRouter() {
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated)

  return (
    <BrowserRouter>
      {isAuthenticated ? <AppRouter /> : <LoginRouter />}
    </BrowserRouter>
  )
}

export default MainRouter
