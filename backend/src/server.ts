import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database';
import cors from 'cors'
import errorHandler from './middlewares/errorHandler';
import financeRoutes from './routes/financeRoutes';
import friendRoutes from './routes/friendRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

// PRE MIDDLE WARES
app.use(express.json({ limit: '50mb' }));
app.use(cors());


// ROUTES
app.use('/api/finance', financeRoutes);
app.use('/api/friend', friendRoutes);
app.use('/api/auth', authRoutes);


// POST MIDDLE WARE
// Make sure to add this after every other middlewares!!! , error handler must be at the end of all the functions.
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('<h1> Hello from the backend! </h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});
