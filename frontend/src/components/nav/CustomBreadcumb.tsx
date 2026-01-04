import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'

function CustomBreadcrumb() {
  const pathname = useLocation()

  const routes = pathname.pathname.split('/').filter((route) => route !== '')

  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {routes.map((item, idx) => {
            const to = `/${routes.slice(0, idx + 1).join('/')}`
            return (
              <Fragment key={to}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className='hover:text-primary-foreground'>
                    <Link to={to}>{translateRouter(item)}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {idx !== routes.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}

export default CustomBreadcrumb

const translateRouter = (router: string) => {
  switch (router) {
    case 'dashboard':
      return 'Dashboard'
    case 'vehicles':
      return 'Vehículos'
    case 'suppliers':
      return 'Proveedores'
    case 'brands':
      return 'Marcas'
    
    case 'admin':
      return 'Administración'
    case 'add-vehicle':
      return 'Agregar Vehículo'
    case 'add-supplier':
      return 'Agregar Proveedor'
    }
}
