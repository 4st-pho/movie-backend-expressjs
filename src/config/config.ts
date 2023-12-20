import * as dotenv from 'dotenv' 
dotenv.config() 
export default {
    mongoUrl: process.env.MONGO_URL || "",
    secretKey: process.env.JWT_SECRET_KEY || "",
    port: process.env.PORT || 3000,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
}
