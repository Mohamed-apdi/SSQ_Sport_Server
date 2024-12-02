import express from 'express';
import { createUser } from '../controllers/user.js';

export const userRouter = express.Router();

userRouter.post('/create', createUser)
