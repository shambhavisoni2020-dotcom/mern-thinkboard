import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
  app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
  }));
}

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(rateLimiter); // Apply rate limiting middleware to all routes

// app.use((req, res, next) => {
//   console.log(`req method is ${req.method} and req url is ${req.url}`);
//   next();
// });

app.use('/api/notes', notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get("/{*splat}", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
});

// ** Commented as we are using routes in a separate file: notesRoutes.js **
// app.get('/api/notes', (req, res) => {
//   res.status(200).send('you got 20 notes');
// });

// app.post('/api/notes', (req, res) => {
//   res.status(201).send('you created a note');
// });

// app.put('/api/notes/:id', (req, res) => {
//   res.status(200).json({ message: 'you updated note' });
// });

// app.delete('/api/notes/:id', (req, res) => {
//   res.status(200).json({ message: 'you deleted note' });
// });
