import LoginPage from '@/pages/LoginPage'
import { Route, Routes } from 'react-router-dom'

function LoginRouter() {
  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
    </Routes>
  )
}

export default LoginRouter
