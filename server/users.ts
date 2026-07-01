'use server'

import { db } from "@/db/drizzle"
import { User, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getUsers() {
    try {
        // Implementation for fetching users
        const allUsers = await db.select().from(users)
        return allUsers
    } catch (error) {
        console.error("Error fetching users:", error)
        throw Error("Failed to fetch users")
        // return {error: "Failed to fetch users"}
    }
}

export async function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
    // Implementation for creating a new user
    try {
        // const newUser = await db.insert(users).values({ username, email }).returning()
        await db.insert(users).values(user)
    } catch (error) { 
        console.error("Error creating user:", error)
        return {error: "Failed to create user"}
    }
}

export async function updateUser(user: Omit<User, "createdAt" | "updatedAt">) {
    // Implementation for updating an existing user
    try {
        await db.update(users).set(user).where(eq(users.id, user.id))
    } catch (error) {
        console.error("Error updating user:", error)
        return {error: "Failed to update user"}
    }
}

export async function deleteUser(id: string) {
    // Implementation for deleting a user
    try {
        await db.delete(users).where(eq(users.id, id))
    } catch (error) {
        console.error("Error deleting user:", error)
        return {error: "Failed to delete user"}
    }
}