import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { authService } from '../services/auth-service'
import { useLoginStore } from '../store/login-store'

export const useMe = () => {
  const { isAuthenticated, loginStore, logoutStore, setUser, user } =
    useLoginStore()

  const [hasSynced, setHasSynced] = useState(false)

  const me = useQuery({
    queryKey: ['me'],
    queryFn: authService.me,
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (me.data) {
      setUser(me.data)
      loginStore()
    }
    if (me.isError) {
      logoutStore()
    }
    if (me.data || me.isError) {
      setHasSynced(true)
    }
  }, [me.data, me.isError])

  return {
    isAuthenticated,
    isLoading: me.isPending || !hasSynced,
    user,
  }
}
