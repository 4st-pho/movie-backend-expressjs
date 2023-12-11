import express from 'express'
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies
} from '../controllers/movie.controller'

const router = express.Router()

router.get('/', getMovies)
router.get('/search', searchMovies)
router.get('/:id', getMovieById)
router.post('/', createMovie)
router.patch('/:id', updateMovie)
router.delete('/:id', deleteMovie)

export default router