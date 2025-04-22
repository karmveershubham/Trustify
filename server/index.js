import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoutes.js';
import listingRoute from './routes/ListingRoute.js';
import contactsRoute from './routes/contactsRoute.js';
import { initDriver, getDriver } from './neo4j/neo4j.js';

dotenv.config();
const app = express();

app.use(express.json());

// Set up CORS
app.use(cors({
    origin: process.env.FRONTEND_HOST,
    credentials: true,
}));

app.use(cookieParser());

// Use routes
app.use('/api', authRoute);
app.use('/api/listings/', listingRoute);
app.use('/api/', contactsRoute);

async function startServer() {
    try {
        await initDriver(); // ✅ Ensure Neo4j is connected before using it
        console.log("✅ Neo4j connection established");


        // Test Neo4j connection route
        if(process.env.NODE_ENV === 'Development'){
            // Create a session for executing queries
            const sessiondb = getDriver().session();
            
            app.get('/test', async (req, res) => {
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
        
        // Start the server
        const PORT = process.env.APP_PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to connect to Neo4j:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
}

startServer();
