import express from "express";
import helmet from 'helmet'
import path  from "path"
import cookieParser from 'cookie-parser'
import  veryfyToken  from "./middlewares/verifyTokenMiddleware.js"
import  authorizedRole  from "./middlewares/roleMiddleware.js"

import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"

import connectDB from "./connection.js";

const app = express()

const PORT = 5000 || process.env.PORT

connectDB()

app.use(helmet())

// app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoutes)

app.use("/api/user",userRoutes)

app.get("/",(req,res)=>{
    app.use(express.static(path.resolve("./",'frontend','dist')))
    res.sendFile(path.resolve("./",'frontend','dist','index.html'))
})

app.get("/scp/dashboard",veryfyToken,authorizedRole("SCP"),(req,res)=>{
        app.use(express.static(path.resolve("./",'frontend','dist')))
        res.sendFile(path.resolve("./",'frontend','dist','index.html'))
})

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})