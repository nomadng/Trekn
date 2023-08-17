import express from 'express'
import cors from 'cors'
import restRouter from 'express-rest-routerss'
import * as rTracer from 'cls-rtracer'
import { logger, middlewareLogger } from '@root/config/logger'
import 'dotenv/config'
import serverConfig from '@root/config/server'
import { errorHandler } from '@root/utils/errorHandler'

const app = express()
app.use(cors(), express.json(), express.urlencoded({ extended: true }), rTracer.expressMiddleware())

app.use(middlewareLogger)
app.use(restRouter({ routeDir: '/routes' }))
app.use(errorHandler)

process.on('uncaughtException', (error) => {
  logger.error('Unhandled error', error)
})

const port = serverConfig.get('port')
const host = serverConfig.get('host')
const server = app.listen(port, () => {
  logger.info(`Listening: ${host}:${port}`)
})

server.keepAliveTimeout = 65000
server.headersTimeout = 66000
