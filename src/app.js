import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import authRoutes from './route/auth.route.js'
import empolyeeRoutes from './route/employee.route.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/employee', empolyeeRoutes)

app.use((err, req, res, next) => {
    console.log("error", err.stack);
    res.status(err.status || 500).json({ message: err.message || "Server Error" })
})

export default app;