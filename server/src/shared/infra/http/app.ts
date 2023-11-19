/** @format */

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { router } from './api'
import expressListRoutes from 'express-list-routes'

dotenv.config()

const origin = {
  origin: '*',
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(origin))
app.use(helmet())
app.use(morgan('combined'))

app.use('/api', router)

expressListRoutes(router, { prefix: '/api' })

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`)
})
