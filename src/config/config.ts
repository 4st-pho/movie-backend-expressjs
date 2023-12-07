export default {
    mongoUrl: process.env.MONGO_URL || "",
    secretKey: process.env.JWT_SECRET_KEY || "",
    port: process.env.PORT || 3000
}
