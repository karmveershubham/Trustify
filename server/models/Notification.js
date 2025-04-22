// backend/models/notificationModel.js
import neo4j from "neo4j-driver";

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password"));
const session = driver.session();

const createNotification = async (userId, message, productId) => {
  const query = `
    CREATE (n:Notification {userId: $userId, message: $message, productId: $productId, read: false, timestamp: datetime()})
    RETURN n
  `;
  const result = await session.run(query, { userId, message, productId });
  return result.records[0].get("n");
};

const getNotificationsForUser = async (userId) => {
  const query = `
    MATCH (n:Notification {userId: $userId})
    RETURN n ORDER BY n.timestamp DESC
  `;
  const result = await session.run(query, { userId });
  return result.records.map(record => record.get("n").properties);
};

export { createNotification, getNotificationsForUser };
