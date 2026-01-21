import { useLoginStore } from '@/store/loginStore'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  allowedRoles?: string[]
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, user } = useLoginStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
