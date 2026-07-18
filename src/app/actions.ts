'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export async function createUser(data: { name: string; email: string }) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    })
    revalidatePath('/')
    return { success: true, user: newUser }
  } catch (error: any) {
    console.error('Error creating user:', error)
    // Handle unique constraint error specifically if needed
    if (error.code === 'P2002') {
      return { success: false, error: 'Email already exists.' }
    }
    return { success: false, error: 'Failed to create user.' }
  }
}

export async function updateUser(id: number, data: { name: string; email: string }) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
      },
    })
    revalidatePath('/')
    return { success: true, user: updatedUser }
  } catch (error: any) {
    console.error('Error updating user:', error)
    if (error.code === 'P2002') {
      return { success: false, error: 'Email already exists.' }
    }
    return { success: false, error: 'Failed to update user.' }
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting user:', error)
    return { success: false, error: 'Failed to delete user.' }
  }
}
