import { useLoginStore } from '@/store/loginStore'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/routes/AppRouter'

function MainRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <BrowserRouter>
      {/* // para desarrollo */}
      <AppRouter />
      {/* {isAuthenticated ? <AppRouter /> : <LoginRouter />} */}
    </BrowserRouter>
  )
}

export default MainRouter
