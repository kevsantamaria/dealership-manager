import { HeaderBar } from '@/shared/components/layout/header'
import UserForm from '@/features/admin/users/components/add-user-form'
import UsersTable from '@/features/admin/users/components/users-table'

function AdminPage() {
  return (
    <>
      <header className="flex shrink-0 items-center gap-2 px-4 bg-surface sticky top-0 z-40">
        <h1 className="text-secondary text-xl font-bold">Admin</h1>
        <HeaderBar />
      </header>

      <main className="p-4 flex gap-4 flex-col max-w-300 mx-auto">
        <UserForm />
        <UsersTable />
      </main>
    </>
  )
}

export default AdminPage
