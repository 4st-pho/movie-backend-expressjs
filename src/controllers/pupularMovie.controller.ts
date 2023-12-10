import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { PopularMovie } from '../models/movie'




export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    let movies = await PopularMovie.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('cast')
      .populate('categories')
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
    const movie = await PopularMovie.findById(movieId).populate('cast').populate('categories')
    res.status(200).json(movie)
  } catch (error) {
    next(error)
  }
}

export const createMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newMovie = await PopularMovie.create(req.body)
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
    const updatedMovie = await PopularMovie.findByIdAndUpdate(
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
    await PopularMovie.findByIdAndDelete(movieId)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}