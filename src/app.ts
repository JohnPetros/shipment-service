import 'dotenv/config'
import { Fastify } from './http/fastify'

export const app = new Fastify().init()
