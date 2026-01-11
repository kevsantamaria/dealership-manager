import LoginPage from '@/pages/LoginPage'
import NotFound from '@/pages/NotFound'
import AddSupplier from '@/pages/panel-pages/add-supplier/AddSupplier'
import AddVehicle from '@/pages/panel-pages/add-vehicle/AddVehicle'
import Brands from '@/pages/panel-pages/brands/Brands'
import Home from '@/pages/panel-pages/home/Home'
import Suppliers from '@/pages/panel-pages/suppliers/Suppliers'
import VehicleDetails from '@/pages/panel-pages/vehicles/components/VehicleDetails'
import Vehicles from '@/pages/panel-pages/vehicles/Vehicles'
import PanelContainer from '@/pages/PanelContainer'
import { Route, Routes } from 'react-router-dom'

function AppRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<PanelContainer />}>
        <Route index element={<Home />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="brands" element={<Brands />} />

        <Route path="admin/add-vehicle" element={<AddVehicle />} />
        <Route path="admin/add-supplier" element={<AddSupplier />} />

      </Route>

      <Route path="vehicles/:id" element={<VehicleDetails />}/>

      <Route path="/dashboard/*" element={<NotFound />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRouter
