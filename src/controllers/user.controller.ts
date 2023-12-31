import { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import mongoose from 'mongoose'
import { cloudinary } from '../config/uploadConfig'
import { images } from '../utils/storagePath'

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
  if (!req.file) {
    return updateUserWithoutImage(req, res, next)
  }
  try {
    cloudinary.uploader.upload_stream(
      { folder: images },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: 'Upload to Cloudinary failed', error })
        }
        if (!result) {
          return res.status(500).json({ message: 'Upload result is undefined' })
        }
        req.body.avatar = result.url
        return updateUserWithoutImage(req, res, next)
      }

    ).end(req.file.buffer)
  } catch (error) {
    next(error)
  }
}

const updateUserWithoutImage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (req.body.birthdate) {
      var pattern = /(\d{2})\/(\d{2})\/(\d{4})/
      const dateObject = new Date(req.body.birthdate.replace(pattern, '$3-$2-$1'))
      req.body.birthdate = dateObject
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

export const addToWatchList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, movieId } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.watchList.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in watchlist' })
    }

    user.watchList.push(movieId)
    await user.save()

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const removeFromWatchList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, movieId } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.watchList = user.watchList.filter((id) => id != movieId)
    await user.save()

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const getWatchListMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'User not found' })
    }
    const user = await User.findById(userId).populate({
      path: 'watchList',
      populate: {
        path: 'cast categories',
      },
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user.watchList)
  } catch (error) {
    next(error)
  }
}