import { Document, Schema, model } from 'mongoose'
import { IActor } from './actor.js'
import { ICategory } from './category.js'

export interface IMovie extends Document {
  title: string
  name: string
  imageUrl: string
  rating: string
  categories: ICategory[]
  cast: IActor[]
  duration: string
  description: string
  contentRating: string
  videoLink: string
  language: string
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: [true, 'title is required'], },
  name: { type: String, required: [true, 'name is required'] },
  imageUrl: { type: String, required: [true, 'imageUrl is required'] },
  rating: { type: String, required: [true, 'rating is required'] },
  duration: { type: String, required: [true, 'duration is required'] },
  cast: [{ type: Schema.Types.ObjectId, ref: 'Actor', default: [] }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', default: [] }],
  description: { type: String, required: [true, 'description is required'] },
  contentRating: { type: String, required: [true, 'contentRating is required'] },
  videoLink: { type: String, required: [true, 'videoLink is required'] },
  language: { type: String, required: [true, 'language is required'] },
})

export const Movie = model<IMovie>('Movie', movieSchema)
export const PopularMovie = model<IMovie>('PopularMovie', movieSchema)