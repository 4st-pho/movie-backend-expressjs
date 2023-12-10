import express from 'express'
import config from './config/config'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/user.router'
import movieRouter from './routes/movie.router'
import popularMovieRouter from './routes/popularMovie.router'
import actorRouter from './routes/actor.router'
import categoryRouter from './routes/category.router'
import authRouter from './routes/auth.router'
import { errorHandler, mongoErrorHandler } from './middleware/errorHandlerMiddleware'

const app = express()
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// use routes
app.use('/api/actors', actorRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/movies', movieRouter)
app.use('/api/popularMovies', popularMovieRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

// Error handling middleware
app.use(mongoErrorHandler)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}/`)
})

mongoose.Promise = Promise
mongoose.connect(config.mongoUrl)
mongoose.connection.syncIndexes()
mongoose.connection.on('error', (error: Error) => console.log(error))