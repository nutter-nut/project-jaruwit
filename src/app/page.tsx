import { getUsers } from './actions'
import ClientPageWrapper from '@/components/ClientPageWrapper'

export default async function Home() {
  const users = await getUsers()

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            User Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            A complete CRUD system built with Next.js, Prisma, and Tailwind CSS.
          </p>
        </header>

        {/* Client Wrapper to handle state (form showing, editing) */}
        <ClientPageWrapper users={users} />
      </div>
    </main>
  )
}
