import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDb } from './db.js'
import contactRoutes from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:5174,http://localhost:5180')
  .split(',')
  .map((s) => s.trim())

app.set('trust proxy', 1)
app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / curl (no origin) and any configured browser origin
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
      return cb(new Error('Not allowed by CORS'))
    },
  }),
)
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'voyager-contact-api' }))
app.use('/api/contact', contactRoutes)

// start
connectDb().finally(() => {
  app.listen(PORT, () => {
    console.log(`[server] Voyager contact API listening on http://localhost:${PORT}`)
  })
})
