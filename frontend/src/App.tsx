import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MainRouter from '@/routes/MainRouter'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
