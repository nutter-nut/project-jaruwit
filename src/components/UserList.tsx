'use client'

import { useState } from 'react'
import { deleteUser } from '@/app/actions'
import { Trash2, Edit2, UserCircle, Loader2 } from 'lucide-react'
import type { User } from './UserForm'

interface UserListProps {
  users: User[]
  onEdit: (user: User) => void
}

export default function UserList({ users, onEdit }: UserListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    setDeletingId(id)
    try {
      await deleteUser(id)
    } finally {
      setDeletingId(null)
    }
  }

  if (users.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-12 border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-full mb-4">
          <UserCircle size={48} className="text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No users found</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          Your database is currently empty. Use the form to create a new user and get started.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user) => (
        <div 
          key={user.id} 
          className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full">
                <UserCircle size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-1">
                  {user.name || 'Unnamed User'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                  {user.email}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-md">
              ID: {user.id}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-gray-100 dark:border-gray-700 pt-3 mt-2">
            <button
              onClick={() => onEdit(user)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Edit2 size={16} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              disabled={deletingId === user.id}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
            >
              {deletingId === user.id ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
