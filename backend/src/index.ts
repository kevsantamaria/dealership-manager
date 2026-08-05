import { ErrorHandler } from '@/middlewares/errorHandler.middleware'
import { authenticate } from '@/middlewares/authenticate.middleware'
import user from '@/routes/user.routes'
import supplier from '@/routes/supplier.routes'
import auth from '@/routes/auth.routes'
import vehicle from '@/routes/vehicle.routes'
import brand from '@/routes/brand.routes'
import model from '@/routes/model.routes'
import trim from '@/routes/trim.routes'
import dashboard from '@/routes/dashboard.routes'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import pgSession from 'connect-pg-simple'
import { env } from './config/env'
import { pool } from './config/prisma'

const app = express()
const PORT = 3000

const PgSession = pgSession(session)

const store = new PgSession({
  pool,
  createTableIfMissing: true,
  tableName: 'sessions',
})

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
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24h
      secure: process.env.NODE_ENV === 'production',
    },
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(auth)

app.use(authenticate)

app.use(user)
app.use(supplier)
app.use(vehicle)
app.use(brand)
app.use(model)
app.use(trim)
app.use(dashboard)

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
