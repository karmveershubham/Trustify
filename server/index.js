import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import authRoute from './routes/authRoutes.js';
import listingRoute from './routes/ListingRoute.js';
import contactsRoute from './routes/contactsRoute.js';
import notificationRoute from './routes/notificationRoutes.js';
import notificationSocket from './config/Socket.js';
import { initDriver, getDriver } from './neo4j/neo4j.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_HOST,
    credentials: true
  }
});

app.set("io", io);

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_HOST, credentials: true }));
app.use(cookieParser());

app.use('/api', authRoute);
app.use('/api/listings/', listingRoute);
app.use('/api/', contactsRoute);
app.use('/api/', notificationRoute);

notificationSocket(io);

 if(process.env.NODE_ENV === 'Development'){
    // Test Neo4j connection route
    app.get('/test', async (req, res) => {
        const sessiondb = getDriver().session();
        try {
            const result = await sessiondb.run('MATCH (n) RETURN n');
            const nodes = result.records.map((record) => record.get(0).properties);
            res.json(nodes);
        } catch (error) {
            console.error('❌ Error querying Neo4j:', error);
            res.status(500).send('Neo4j query failed');
        }
    });
}

async function startServer() {
  try {
    await initDriver();
    console.log("✅ Neo4j connected");

    const PORT = process.env.APP_PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Neo4j connection error:", err);
    process.exit(1);
  }
}

startServer();