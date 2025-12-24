import user from '@/routes/user.routes'
import express from 'express'
import morgan from 'morgan'

const app = express()
const port = 3000
app.use(morgan('dev'))

app.use(user)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
