import express from 'express'
import {
  addMovieToPopular,
  removeMovieFromPopular,
  getPopularMovies,
  createPopularMovie,
  updatePopularMovie,
  deletePopularMovie,
} from '../controllers/pupularMovie.controller'

const router = express.Router()

router.get('/', getPopularMovies)
router.post('/add-movie', addMovieToPopular)
router.post('/remove-movie', removeMovieFromPopular)
router.post('/', createPopularMovie)
router.put('/', updatePopularMovie)
router.delete('/', deletePopularMovie)

export default router