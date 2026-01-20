import AdminPanel from '@/pages/PanelContainer'
import { Route, Routes } from 'react-router-dom'

function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin-user" element={<AdminPanel />} />
    </Routes>
  )
}

export default AdminRouter