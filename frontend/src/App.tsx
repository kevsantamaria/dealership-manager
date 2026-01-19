import MainRouter from '@/routes/MainRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}

export default App
