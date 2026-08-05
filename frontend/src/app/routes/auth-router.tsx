import LoginPage from '@/app/pages/auth/page'
import { Route, Routes } from 'react-router-dom'

function LoginRouter() {
  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
    </Routes>
  )
}

export default LoginRouter
