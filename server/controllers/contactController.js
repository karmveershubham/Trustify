import * as driver from '../neo4j/neo4j.js';
import express from "express";
const router = express.Router();

export const getContacts = async (req, res) => {
    const session = driver.getDriver().session();
    try {
        const userId = req.user.id; 
        // console.log("userId", userId);

        const query = `
            MATCH (u:User {id: $userId}) 
            RETURN u.contacts AS contacts
        `;

        const result = await session.run(query, { userId: userId });

        if (result.records.length === 0) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const contacts = result.records[0].get('contacts'); // Extract contacts array

        res.json({ contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({status: "failed", message: "Internal Server Error" });
    } finally {
        await session.close();
    }
};

