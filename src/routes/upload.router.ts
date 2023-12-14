import multer from 'multer';
import express from 'express'
import { upload } from '../config/uploadConfig';

import {
    uploadImage
} from '../controllers/upload.controller'

const router = express.Router()
router.post('/image', upload.single('image'), uploadImage)

export default router