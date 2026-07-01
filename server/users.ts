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
        const newUser = await db.insert(users).values(user)
        return newUser
    } catch (error) { 
        console.error("Error creating user:", error)
        return {error: "Failed to create user"}
    }
}

export async function updateUser(id: string, user: Omit<User, "createdAt" | "updatedAt">) {
    // Implementation for updating an existing user
    try {
        const updatedUser = await db.update(users).set(user).where(eq(users.id, id))
        return updatedUser
    } catch (error) {
        console.error("Error updating user:", error)
        return {error: "Failed to update user"}
    }
}