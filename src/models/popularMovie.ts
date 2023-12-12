import { Schema, Document, model } from 'mongoose'

interface IPopularMovie extends Document {
  movieIds: string[]
}

const PopularMovieSchema: Schema = new Schema({
  movieIds: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
})

const PopularMovie = model<IPopularMovie>('PopularMovie', PopularMovieSchema)

export default PopularMovie