import LoginPage from '@/pages/LoginPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
