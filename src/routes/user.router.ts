import express from 'express'
import { authenticateJWT } from '../middleware/authenticateJWT'
import { upload } from '../config/uploadConfig'
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
router.patch('/:id', upload.single('image'), updateUser)
router.delete('/:id', deleteUser)
router.post('/add-to-watchlist', authenticateJWT, addToWatchList)
router.post('/remove-from-watchlist', authenticateJWT, removeFromWatchList)
router.get('/watchlist/:userId', authenticateJWT, getWatchListMovies)

export default router