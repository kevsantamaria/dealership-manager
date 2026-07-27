import { ErrorHandler } from '@/middlewares/errorHandler.middleware'
import user from '@/routes/user.routes'
import supplier from '@/routes/supplier.routes'
import login from '@/routes/auth.routes'
import vehicle from '@/routes/vehicle.routes'
import brand from '@/routes/brand.routes'
import dashboard from '@/routes/dashboard.routes'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import { env } from './config/env'

const app = express()
const PORT = 3000

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
)

app.use(morgan('dev'))
app.use(
  session({
    secret: env.SESSION_KEY!,
    resave: false,
    saveUninitialized: false,
    name: 'dealership-manager.sid',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24h
      secure: process.env.NODE_ENV === 'production',
    },
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(user)
app.use(login)
app.use(supplier)
app.use(vehicle)
app.use(brand)
app.use(dashboard)

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
