const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const testRoute = require('./routes/testRoutes');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/test', testRoute);

// General error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send({
        message: "Something went wrong",
        success: false
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
