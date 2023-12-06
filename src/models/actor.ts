import mongoose, { Schema, Document } from 'mongoose'

export interface IActor extends Document {
    name: string
    avatar: string
}

const ActorSchema: Schema = new Schema({
    name: { type: String, required: [true, 'name is required'] },
    avatar: { type: String, required: [true, 'avatar is required'] }
})

const Actor = mongoose.model<IActor>('Actor', ActorSchema)
export default Actor