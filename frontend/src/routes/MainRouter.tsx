import AppRouter from '@/routes/AppRouter'
import LoginRouter from '@/routes/LoginRouter'
import { useLoginStore } from '@/store/loginStore'
import { BrowserRouter } from 'react-router-dom'

function MainRouter() {
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated)

  return (
    <BrowserRouter>
      {isAuthenticated ? <AppRouter /> : <LoginRouter />}
    </BrowserRouter>
  )
}

export default MainRouter
