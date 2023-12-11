import express from 'express'
import { authenticateJWT } from '../middleware/authenticateJWT'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getWatchListMovies,
  addToWatchList,
  removeFromWatchList
} from '../controllers/user.controller'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/add-to-watchlist', authenticateJWT, addToWatchList)
router.post('/remove-from-watchlist', authenticateJWT, removeFromWatchList)
router.get('/watchlist/:userId', authenticateJWT, getWatchListMovies)

export default router