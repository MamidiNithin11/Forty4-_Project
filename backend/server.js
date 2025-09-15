const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const userRoutes = require('./routes/users');


const PORT = process.env.PORT || 8080;

const allowedOrigin = process.env.CORS_ORIGIN;
const corsOptions = allowedOrigin ? { origin: allowedOrigin } : {};
app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'User Management API' }));
app.use('/api/users', userRoutes);
app.use((req, res) => {
res.status(404).json({ error: 'Not found' });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));