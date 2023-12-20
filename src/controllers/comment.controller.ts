import { Request, Response, NextFunction } from 'express'
import Comment from '../models/comment'
import mongoose from 'mongoose'

export const getCommentsByMovieId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const movieId = req.params.movieId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const skip = (page - 1) * limit

    const comments = await Comment.find({ movieId })
      .populate('userId')
      .skip(skip)
      .limit(limit)

    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { movieId, userId, content } = req.body
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'User not found' })
    }
    const newComment = new Comment({ movieId, userId, content })
    const savedComment = await newComment.save()

    res.status(201).json(savedComment)
  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const commentId = req.params.commentId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    const existingComment = await Comment.findById(commentId)
    if (!existingComment) {
      res.status(404).json({ message: 'Comment not found' })
      return
    }

    await Comment.findByIdAndDelete(commentId)
    res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (error) {
    next(error)
  }
} 