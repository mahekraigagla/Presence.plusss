const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const teacherRoutes = require('./routes/teacherRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// API Routes
app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
