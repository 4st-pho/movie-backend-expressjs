import { Request, Response, NextFunction } from 'express'
import User, { IUser } from '../models/user'
import mongoose from 'mongoose'
import { Movie } from '../models/movie'

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

    res.status(200).json({ message: 'Movie added to watchlist' })
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

    res.status(200).json({ message: 'Movie removed from watchlist' })
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
    const user = await User.findById(userId).populate('watchList')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ watchList: user.watchList ?? [] })
  } catch (error) {
    next(error)
  }
}


export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    let movies = await Movie.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('cast')
      .populate('categories');
    return res.status(200).json(movies)
  } catch (error) {
    next(error)
  }
}

export const getMovieById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const movieId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    const movie = await Movie.findById(movieId).populate('cast').populate('categories')
    res.status(200).json(movie)
  } catch (error) {
    next(error)
  }
}

export const createMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newMovie = await Movie.create(req.body)
    res.status(201).json(newMovie)
  } catch (error) {
    next(error)
  }
}

export const updateMovie = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const movieId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      req.body,
      { new: true }
    ).populate('cast').populate('categories')
    res.status(200).json(updatedMovie)
  } catch (error) {
    next(error)
  }
}

export const deleteMovie = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const movieId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    await Movie.findByIdAndDelete(movieId)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}