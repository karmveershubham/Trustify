import * as driver from '../neo4j/neo4j.js'; // Import Neo4j driver

export default function notificationSocket(io) {
    const session = driver.getDriver().session();

    io.on("connection", (socket) => {
        console.log(" User connected:", socket.id);

        socket.on("joinRoom", ({ userId }) => {
            socket.join(userId);
            console.log(` Joined room ${userId}`);
        });

        socket.on("sendNotification", async ({ senderId, productId, contacts }) => {
            const message = `New product listed by your contact!`;
            const timestamp = new Date().toISOString();

            for (const contactId of contacts) {
                const notificationId = `${senderId}-${productId}-${contactId}`;
                await session.run(
                    `
                    MATCH (u:User {id: $contactId})
                    CREATE (n:Notification {
                        id: $notificationId,
                        message: $message,
                        isRead: false,
                        productId: $productId,
                        senderId: $senderId,
                        timestamp: $timestamp
                    })-[:SENT_TO]->(u)
                    `,
                    { message, senderId, productId, contactId, notificationId, timestamp }
                );

                io.to(contactId).emit("receiveNotification", {
                    id: notificationId,
                    message,
                    isRead: false,
                    productId,
                    timestamp
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}
