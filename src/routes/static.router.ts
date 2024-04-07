import express from 'express'
import path from 'path';

const router = express.Router()
const newPath = __dirname.replace('/src/routes', '/src/static')

router.get('/.well-known/assetlinks.json', (req, res) => {
    return res.sendFile(path.join(newPath, 'assetlinks.json'));
})

export default router