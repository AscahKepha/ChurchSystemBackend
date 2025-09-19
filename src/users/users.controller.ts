import { Request, Response } from "express";
import {
    createUserServices,
    deleteUserServices,
    getUserByIdServices,
    getUsersServices,
    updateUserServices,
} from "./user.service";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";

// GET all users (admin only — enforced via route middleware)
export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await getUsersServices();
        if (!allUsers || allUsers.length === 0) {
            console.log(allUsers);
            res.status(404).json({ message: "No users found" });
            return;
        }

        const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);
        res.status(200).json(usersWithoutPasswords);
        return;
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to fetch users" });
        return;
    }
};

// GET user by ID (admin can access any, patient can only access their own)
export const getUserById = async (req: Request, res: Response) => {
    const requestedId = parseInt(req.params.id);

    if (isNaN(requestedId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }

    try {
        const requester = req.user;

        if (requester?.role === "patient" && parseInt(requester.userId.toString()) !== requestedId) {
            res.status(403).json({ error: "Forbidden: patients can only access their own profile" });
            return;
        }

        const user = await getUserByIdServices(requestedId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
        return;
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to fetch user" });
        return;
    }
};
