const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pfe'

// Import routes
const authRoutes = require('./routes/auth')
const artisanRoutes = require('./routes/artisans')
const itemRoutes = require('./routes/items')

// Middleware
app.use(cors({ origin: corsOrigin }))
app.use(express.json())

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/artisans', artisanRoutes)
app.use('/api/items', itemRoutes)

// Connect to MongoDB
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB successfully')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!' })
})

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
