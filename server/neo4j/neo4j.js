import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

let driver;

export async function initDriver() {
    const uri = process.env.NEO4J_URI;
    const username = process.env.NEO4J_USERNAME;
    const password = process.env.NEO4J_PASSWORD;

    console.log(`🔍 Connecting to Neo4j at ${uri} with user ${username}`);

    driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

    try {
        await driver.verifyConnectivity();
        console.log("✅ Successfully connected to Neo4j");
    } catch (error) {
        console.error("❌ Neo4j Connection Error:", error);
        throw error;
    }
}

export function getDriver() {
    if (!driver) {
        throw new Error("❌ Neo4j driver has not been initialized. Call initDriver() first.");
    }
    return driver;
}
