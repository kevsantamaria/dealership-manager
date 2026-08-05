import { useMe } from '@/features/auth/hooks/use-me'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRoutesProps {
  allowedRoles?: string[]
}

function ProtectedRoutes({ allowedRoles }: ProtectedRoutesProps) {
  const { isAuthenticated, isLoading, user } = useMe()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
