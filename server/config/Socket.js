import * as driver from '../neo4j/neo4j.js'; // Import Neo4j driver

export default function notificationSocket(io) {
  io.on('connection', (socket) => {
    console.log('connected to socket:', socket.id);

    socket.on('joinRoom', ({ userId }) => {
      socket.join(userId);
      console.log(`User ${userId} joined their private room`);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
}