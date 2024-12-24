// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import authRoute from './routes/authRoutes.js';
import loginsignup from './routes/loginsignupRoute.js'
import './config/passport.js'; // Import passport configuration
import * as driver from './neo4j/neo4j.js'; // Ensure your Neo4j driver is imported

dotenv.config();
const app = express();

app.use(express.json());

// Set up CORS

app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add allowed methods
    credentials: true, // If cookies or authorization headers are involved
}));


// Express session middleware
app.use(session({
    secret: process.env.SECRET_KEY, // Change to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/', authRoute);
app.use('/api',loginsignup)
// General error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send({
        message: "Something went wrong",
        success: false
    });
});

// Initialize Neo4j driver
try {
    await driver.initDriver(process.env.NEO4J_URI, process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD);
    console.log('Connected to Neo4j');
} catch (error) {
    console.error('Error connecting to Neo4j:', error);
    process.exit(1); // Exit the process if the connection fails
}

// Create a session for executing queries
const sessiondb = driver.getDriver().session();
app.get('/test', async (req, res) => {
    try {
        // Run a Neo4j query
        const result = await sessiondb.run('MATCH (n) RETURN n');

        // Extract and send the result data
        const nodes = result.records.map((record) => record.get(0).properties);
        res.json(nodes);
    } catch (error) {
        console.error('Error querying Neo4j:', error);
        res.status(500).send('Neo4j query failed');
    }
});

// Start the server
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
