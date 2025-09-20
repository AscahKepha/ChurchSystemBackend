import {Router} from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "./users.controller";
// import { adminRoleAuth, allRoleAuth, patientRoleAuth, doctorRoleAuth } from "../middleware/bearAuth";

export const userRouter = Router();

// User routes definition

// Get all users
userRouter.get('/users', getUsers);

// Get user by ID
userRouter.get('/users/:id', getUserById);

// Create a new user