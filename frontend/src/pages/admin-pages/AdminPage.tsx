import { HeaderBar } from '@/components/nav/HeaderBar'
import UserForm from './components/UserForm'


function AdminPage() {
  return (
    <>
      <header className="flex shrink-0 items-center gap-2 px-4 bg-surface sticky top-0 z-40">
        <h1 className="text-secondary text-xl">Admin</h1>
        <HeaderBar />
      </header>

      <main>
        <UserForm />
      </main>
    </>
  )
}

export default AdminPage
