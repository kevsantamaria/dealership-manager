import AppRouter from '@/routes/AppRouter'
import LoginRouter from '@/routes/LoginRouter'
import { useLoginStore } from '@/store/loginStore'
import { BrowserRouter } from 'react-router-dom'
import AdminRouter from '@/routes/AdminRouter'

function MainRouter() {
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated)
  const userRole = useLoginStore((state) => state.userRole)

  return (
    <BrowserRouter>
      {isAuthenticated ? (userRole === 'admin' ? <AdminRouter /> : <AppRouter />) : <LoginRouter />}
    </BrowserRouter>
  )
}

export default MainRouter
