import * as driver from '../neo4j/neo4j.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import express from "express";
const router = express.Router();

// router.get("/contacts", isAuthenticated, async (req, res) => {  //use it later
export const getContacts = async (req, res) => {
    const session = driver.getDriver().session();
    try {
        const userEmail = req.body.email; // Extract user email from request body
        console.log("userEmail", userEmail);

        const query = `
            MATCH (u:User {email: $email}) 
            RETURN u.contacts AS contacts
        `;

        const result = await session.run(query, { email: userEmail });

        if (result.records.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const contacts = result.records[0].get('contacts'); // Extract contacts array

        res.json({ contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await session.close();
    }
};


