import { Document, Schema, model } from 'mongoose'
import { IMovie } from './movie'

export interface IUser extends Document {
  username: string
  password: string
  email: string
  avatar: string
  watchList: IMovie[]
  birthdate: Date | null
}
const userSchema = new Schema({
  username: { type: String, required: [true, 'username is required'] },
  password: { type: String, required: [true, 'password is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    index: true,
    match: [/^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  avatar: { type: String, default: 'https://www.stats.lk/Images/default-avatar.jpg' },
  watchList: [{ type: Schema.Types.ObjectId, ref: 'Movie', default: [] }],
  birthdate: { type: Date, default: null }
})

userSchema.clearIndexes()
export default model('User', userSchema)