import dotenv from 'dotenv'
import { defineConfig } from 'prisma/config'

dotenv.config();

export default defineConfig({
  migrations: {
    seed: 'node ./prisma/seed.mjs',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
})