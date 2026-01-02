import { ErrorHandler } from '@/middlewares/errorHandler.middleware'
import user from '@/routes/user.routes'
import supplier from '@/routes/supplier.routes'
import login from '@/routes/login.routes'
import vehicle from '@/routes/vehicle.routes'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

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
app.use(express.json())

app.use(user)
app.use(login)
app.use(supplier)
app.use(vehicle)

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
