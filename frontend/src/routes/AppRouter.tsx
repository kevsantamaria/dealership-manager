import LoginPage from '@/pages/LoginPage'
import NotFound from '@/pages/NotFound'
import Home from '@/pages/panel-pages/home/Home'
import PanelContainer from '@/pages/PanelContainer'
import { Route, Routes } from 'react-router-dom'

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
