const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const userRoutes = require('./routes/users');

// Handle CORS for Vercel deployment
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'User Management API' }));
app.use('/api/users', userRoutes);
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Export the app for Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;