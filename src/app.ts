import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const prisma = new PrismaClient()
prisma.user.create({
  data: {
    name: 'Cristian',
    email: 'cristiangiordani@gmail.com',
  },
})
export const app = fastify()
