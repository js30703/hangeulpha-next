import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()

export default process.env.NODE_ENV == "development" ? prisma : new PrismaClient();