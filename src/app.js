import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import authRoutes from './route/auth.route.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())


app.use('/api/auth', authRoutes)

export default app;