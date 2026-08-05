import AdminPage from '@/app/pages/admin/users/page'
import LoginPage from '@/app/pages/auth/page'
import NotFound from '@/app/pages/not-found'
import AddSupplier from '@/app/pages/panel/suppliers/add/page'
import AddVehicle from '@/app/pages/panel/vehicles/add/page'
import Brands from '@/app/pages/panel/brands/page'
import Dashboard from '@/app/pages/panel/dashboard/page'
import Suppliers from '@/app/pages/panel/suppliers/page'
import VehicleDetails from '@/app/pages/panel/vehicles/details/page'
import Vehicles from '@/app/pages/panel/vehicles/page'
import PanelContainer from '@/app/pages/layout'
import { useLoginStore } from '@/features/auth/store/login-store'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protected-routes'

function GuestRoute() {
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<PanelContainer />}>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="brands" element={<Brands />} />
          <Route path="vehicles/:id" element={<VehicleDetails />} />

          <Route path="vehicles/add-vehicle" element={<AddVehicle />} />
          <Route path="suppliers/add-supplier" element={<AddSupplier />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
