import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import PopularMovie from '../models/popularMovie'






export const getPopularMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    const popularMovie = await PopularMovie.findOne().populate({
      path: 'movies',
      populate: {
        path: 'cast categories',
      },
    })

    if (!popularMovie) {
      return res.status(200).json([])
    }
    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize
    const movies = popularMovie.movieIds.slice(startIndex, endIndex)
    return res.status(200).json(movies)
  } catch (error) {
    next(error)
  }
}

export const addMovieToPopular = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { movieId } = req.body
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    const popularMovie = await PopularMovie.findOne()
    if (!popularMovie) {
      return res.status(404).json({ message: 'Popular Movie not found' })

    }
    if (!popularMovie.movieIds.includes(movieId)) {
      popularMovie.movieIds.push(movieId)
      const updatedPopularMovie = await popularMovie.save()
      res.status(200).json(updatedPopularMovie)
    } else {
      res.status(400).json({ message: 'Movie already exists in Popular Movie' })
    }
  } catch (error) {
    next(error)
  }
}

export const removeMovieFromPopular = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { movieId } = req.body
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    const popularMovie = await PopularMovie.findOne()

    if (!popularMovie) {
      return res.status(404).json({ message: 'Popular Movie not found' })
    }

    popularMovie.movieIds = popularMovie.movieIds.filter(id => id !== movieId)

    const updatedPopularMovie = await popularMovie.save()
    res.status(200).json(updatedPopularMovie)
  } catch (error) {
    next(error)
  }
}

export const createPopularMovie = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { movieIds } = req.body

    const existingPopularMovie = await PopularMovie.findOne()

    if (existingPopularMovie) {
      return res.status(400).json({ message: 'Popular Movie already exists' })
    }

    const popularMovie = new PopularMovie({
      movieIds,
    })

    const savedPopularMovie = await popularMovie.save()
    res.status(201).json(savedPopularMovie)
  } catch (error) {
    next(error)
  }
}

export const updatePopularMovie = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { movieIds } = req.body

    const popularMovie = await PopularMovie.findOne()

    if (!popularMovie) {
      res.status(404).json({ message: 'Popular Movie not found' })
      return
    }

    popularMovie.movieIds = movieIds
    const updatedPopularMovie = await popularMovie.save()
    res.status(200).json(updatedPopularMovie)
  } catch (error) {
    next(error)
  }
}

export const deletePopularMovie = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const deletedPopularMovie = await PopularMovie.findOneAndDelete()

    if (deletedPopularMovie) {
      res.status(200).json({ message: 'Popular Movie deleted successfully' })
    } else {
      res.status(404).json({ message: 'Popular Movie not found' })
    }
  } catch (error) {
    next(error)
  }
}