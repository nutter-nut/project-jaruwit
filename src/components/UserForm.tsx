'use client'

import { useState } from 'react'
import { createUser, updateUser } from '@/app/actions'
import { Loader2, Save, X } from 'lucide-react'

export type User = {
  id: number
  email: string
  name: string | null
  createdAt: Date
}

interface UserFormProps {
  userToEdit?: User | null
  onClose?: () => void
  onSuccess?: () => void
}

export default function UserForm({ userToEdit, onClose, onSuccess }: UserFormProps) {
  const [name, setName] = useState(userToEdit?.name || '')
  const [email, setEmail] = useState(userToEdit?.email || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      let res
      if (userToEdit) {
        res = await updateUser(userToEdit.id, { name, email })
      } else {
        res = await createUser({ name, email })
      }

      if (res.success) {
        if (!userToEdit) {
          setName('')
          setEmail('')
        }
        if (onSuccess) onSuccess()
        if (onClose) onClose()
      } else {
        setError(res.error || 'Something went wrong')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-full max-w-md relative overflow-hidden transition-all">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X size={20} />
        </button>
      )}
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {userToEdit ? 'Edit User' : 'Create New User'}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {userToEdit ? 'Update the details below.' : 'Fill in the form to add a new user to the database.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="john@example.com"
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          <span>{isLoading ? 'Saving...' : userToEdit ? 'Update User' : 'Save User'}</span>
        </button>
      </form>
    </div>
  )
}
