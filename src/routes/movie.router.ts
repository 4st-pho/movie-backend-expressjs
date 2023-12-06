import express from 'express'
import { authenticateJWT } from '../middleware/authenticateJWT'
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getWatchListMovies,
  addToWatchList,
  removeFromWatchList
} from '../controllers/movie.controller'

const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovieById)
router.post('/', createMovie)
router.patch('/:id', updateMovie)
router.delete('/:id', deleteMovie)
router.post('/add-to-watchlist', authenticateJWT, addToWatchList)
router.post('/remove-from-watchlist', authenticateJWT, removeFromWatchList)
router.get('/watchlist/:userId', authenticateJWT, getWatchListMovies);

export default router