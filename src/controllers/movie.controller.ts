import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { Movie } from '../models/movie'

export const searchMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, page, pageSize } = req.query
    let query: any = {}
    if (title) {
      query.title = { $regex: new RegExp((title) as string, 'i') }
    }

    const currentPage = parseInt(page as string) || 1
    const itemsPerPage = parseInt(pageSize as string) || 10
    const skip = (currentPage - 1) * itemsPerPage

    const movies = await Movie.find(query)
      .skip(skip)
      .limit(itemsPerPage)
      .populate('cast').populate('categories')

    res.status(200).json(movies)
  } catch (error) {
    next(error)
  }
}


export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    let movies = await Movie.find()
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