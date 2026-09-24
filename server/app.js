const express = require("express")
const connectDB = require("./config/db")
const dotenv =  require("dotenv")
const dns =  require("dns")
const courseRoute = require("./routes/courseRoutes")
const authRoute = require("./routes/authRoutes")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    if (req.method === 'OPTIONS') return res.sendStatus(204)
    next()
})
dotenv.config()
dns.setServers(["1.1.1.1","8.8.8.8"])

app.use("/api/auth", authRoute)
app.use("/api/courses",courseRoute)

connectDB()


app.listen(3000, ()=>{
    console.log("listening to the PORT")
})
