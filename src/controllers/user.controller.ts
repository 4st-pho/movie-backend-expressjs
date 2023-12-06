import { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import mongoose from 'mongoose'

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ message: 'User not found' })
        }
        const user = await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ message: 'User not found' })
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true }
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ message: 'User not found' })
        }
        await User.findByIdAndDelete(userId)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}