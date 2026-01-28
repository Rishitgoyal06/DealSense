import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import routes
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';
import followUpRoutes from './routes/followUpRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import interactionRoutes from './routes/interactionRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { emiReminderCron } from "./cron/emiReminder.cron.js";
import { sendEmail } from "./utils/email.js";


const app = express();
emiReminderCron();

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://frontend-inky-five-23.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("CORS not allowed"));
  },
  credentials: true
}));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/followups', followUpRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/notes', noteRoutes);

// Keep-alive endpoint to prevent Railway sleep
app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        message: message,
        data: null
    });
});

export {app}