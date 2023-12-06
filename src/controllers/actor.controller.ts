import { Request, Response, NextFunction } from 'express'
import Actor from '../models/actor'
import mongoose from 'mongoose'
export const getActors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const actors = await Actor.find()
    res.status(200).json(actors)
  } catch (error) {
    next(error)
  }
}

export const getActorById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const actorId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(actorId)) {
      return res.status(404).json({ message: 'Actor not found' })
    }
    const actor = await Actor.findById(actorId)
    if (actor) {
      res.status(200).json(actor)
    } else {
      res.status(404).json({ error: 'Actor not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const createActor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newActor = await Actor.create(req.body)
    res.status(201).json(newActor)
  } catch (error) {
    next(error)
  }
}

export const updateActor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const actorId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(actorId)) {
      return res.status(404).json({ message: 'Actor not found' })
    }
    const updatedActor = await Actor.findByIdAndUpdate(actorId, req.body, { new: true })
    if (updatedActor) {
      res.status(200).json(updatedActor)
    } else {
      res.status(404).json({ error: 'Actor not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteActor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const actorId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(actorId)) {
      return res.status(404).json({ message: 'Actor not found' })
    }
    const deletedActor = await Actor.findByIdAndDelete(actorId)
    if (deletedActor) {
      res.status(200).json(deletedActor)
    } else {
      res.status(404).json({ error: 'Actor not found' })
    }
  } catch (error) {
    next(error)
  }
}