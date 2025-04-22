import * as driver from '../neo4j/neo4j.js'; // Import Neo4j driver

export const getUserNotifications = async (req, res) => {
    const session = driver.getDriver().session();
    const { userId } = req.params;

    try {
        const result = await session.run(
            `
            MATCH (n:Notification)-[:SENT_TO]->(u:User {id: $userId})
            RETURN n ORDER BY n.timestamp DESC
            `,
            { userId }
        );        
        const notifications = result.records.map((record) => record.get("n").properties);
        res.status(200).json(notifications);
    } catch (error) {
        console.error("❌ Notification fetch error:", error);
        res.status(500).send("Failed to fetch notifications");
    } finally {
        await session.close();
    }
};

