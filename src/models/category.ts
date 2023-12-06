import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
    name: string
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: [true, 'name is required'], unique: true, index: true },
})

const Category = mongoose.model<ICategory>('Category', CategorySchema)

export default Category