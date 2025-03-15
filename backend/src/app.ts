import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import userRoutes from './routes/userRoutes';
import opportunityRoutes from './routes/opportunityRoutes';
import applicationRoutes from './routes/applicationRoutes';
import eventRoutes from './routes/eventRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/events', eventRoutes);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 