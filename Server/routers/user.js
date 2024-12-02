import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, loginUser, updateUserById } from '../controllers/user.js';
import { isProtect } from '../middlewares/authMiddleware.js';

export const userRouter = express.Router();

userRouter.post('/create', createUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserById)
userRouter.put("/:id", isProtect,updateUserById)
userRouter.delete("/:id", deleteUserById)
userRouter.post("/login", loginUser)