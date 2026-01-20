import { Navigate, Outlet } from 'react-router-dom'
import { useLoginStore } from '@/store/loginStore'

interface Props {
  allowedRoles?: string[]
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, user } = useLoginStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/admin-user" replace />
  }

  return <Outlet />
}