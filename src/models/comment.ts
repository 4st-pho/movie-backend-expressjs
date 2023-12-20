import { Schema, Document, model } from 'mongoose'

interface IComment extends Document {
    movieId: string
    userId: string
    content: string
}

const CommentSchema: Schema = new Schema({
    movieId: { type: String, required: [true, 'Movie id is required'] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: [true, 'Content is required'] },
})

const Comment = model<IComment>('Comment', CommentSchema)

export default Comment