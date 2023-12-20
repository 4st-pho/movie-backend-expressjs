import express from 'express'
import { deleteComment, createComment, getCommentsByMovieId } from '../controllers/comment.controller'

const router = express.Router()

router.post('/', createComment)
router.get('/:movieId', getCommentsByMovieId)
router.delete('/:commentId', deleteComment)

export default router 