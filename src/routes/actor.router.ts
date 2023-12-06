import express from 'express'
import {
    getActors,
    getActorById,
    createActor,
    updateActor,
    deleteActor,
} from '../controllers/actor.controller'

const router = express.Router()

router.get('/', getActors)
router.get('/:id', getActorById)
router.post('/', createActor)
router.patch('/:id', updateActor)
router.delete('/:id', deleteActor)

export default router