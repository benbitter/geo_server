import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors({
  origin: toString(process.env.FRONTEND_URL),
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Geo Chat Server is running');
});

const io = new Server(server, {
  cors: {
    origin: toString(process.env.FRONTEND_URL),
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (room) => {
    socket.join(room);
    socket.room = room;
    socket.to(room).emit('user-joined', `User ${socket.id} joined the area.`);
  });

  socket.on('chat-message', (message) => {
    if (socket.room) {
      io.to(socket.room).emit('chat-message', {
        sender: socket.id,
        message,
      });
    }
  });

  socket.on('disconnect', () => {
    if (socket.room) {
      socket.to(socket.room).emit('user-left', `User ${socket.id} left the area.`);
    }
  });
});

export { server };

