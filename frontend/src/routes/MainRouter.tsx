import AppRouter from '@/routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'

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
