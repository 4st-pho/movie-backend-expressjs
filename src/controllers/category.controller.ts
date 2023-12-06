import { Request, Response, NextFunction } from 'express'
import Category from '../models/category'
import mongoose from 'mongoose'

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const categoryId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(404).json({ message: 'Category not found' })
    }
    const category = await Category.findById(categoryId)
    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newCategory = await Category.create(req.body)
    res.status(201).json(newCategory)
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const categoryId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(404).json({ message: 'Category not found' })
    }
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true })
    if (updatedCategory) {
      res.status(200).json(updatedCategory)
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const categoryId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(404).json({ message: 'Category not found' })
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId)
    if (deletedCategory) {
      res.status(200).json(deletedCategory)
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (error) {
    next(error)
  }
}