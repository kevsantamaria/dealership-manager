import user from '@/routes/user.routes'
import vehicle from '@/routes/vehicle.routes'
import express from 'express'
import morgan from 'morgan'

const app = express()
const PORT = 3000

app.use(morgan('dev'))
app.use(express.json())

app.use(user)
app.use(vehicle)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
