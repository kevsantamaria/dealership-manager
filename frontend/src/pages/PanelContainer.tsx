import { Outlet } from 'react-router-dom'

function AdminPanel() {
  return (
    <div className="flex max-h-screen bg-background w-screen">
      <div className="flex flex-1 flex-col overflow-auto w-full ">
        <header className="flex shrink-0 items-center gap-2 px-4 bg-surface sticky top-0 z-40"></header>
        <main className="p-5 relative ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
