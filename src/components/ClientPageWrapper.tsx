'use client'

import { useState } from 'react'
import UserForm, { User } from './UserForm'
import UserList from './UserList'
import { Plus } from 'lucide-react'

export default function ClientPageWrapper({ users }: { users: User[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)

  const handleEdit = (user: User) => {
    setUserToEdit(user)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setTimeout(() => setUserToEdit(null), 300) // delay to avoid flicker during exit animation
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      {/* Main List Area */}
      <div className={`flex-1 transition-all duration-300 ${isFormOpen ? 'lg:w-2/3' : 'w-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Users</h2>
          {!isFormOpen && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow active:scale-95 font-medium"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add User</span>
            </button>
          )}
        </div>
        
        <UserList users={users} onEdit={handleEdit} />
      </div>

      {/* Form Sidebar / Modal (Desktop vs Mobile) */}
      <div className={`
        ${isFormOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full hidden lg:block lg:opacity-0 lg:w-0'}
        transition-all duration-300 ease-in-out lg:w-1/3
        fixed inset-0 z-50 lg:static lg:inset-auto lg:z-auto bg-black/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none
        flex items-center justify-center p-4 lg:p-0
      `}>
        {isFormOpen && (
          <div className="w-full max-w-md w-full animate-in fade-in slide-in-from-bottom-4 lg:slide-in-from-right-8 duration-300">
            <UserForm 
              userToEdit={userToEdit} 
              onClose={handleCloseForm}
              onSuccess={handleCloseForm}
            />
          </div>
        )}
      </div>
    </div>
  )
}
