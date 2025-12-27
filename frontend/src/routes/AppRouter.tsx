import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/dashboard-pages/home/Home'
import LoginPage from '@/pages/LoginPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<PanelContainer />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/dashboard/*" element={<NotFound />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRouter
