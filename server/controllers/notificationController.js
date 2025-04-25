import * as driver from "../neo4j/neo4j.js";

export const getUserNotifications = async (req, res) => {
  const session = driver.getDriver().session();
  try {
    const result = await session.run(
      `MATCH (n:Notification)-[:SENT_TO]->(u:User {id: $userId})
       RETURN n ORDER BY n.timestamp DESC`,
      { userId: req.user.id }
    );

    const notifications = result.records.map(record => record.get('n').properties);
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    await session.close();
  }
};

export const clearAllNotifications = async (req, res) => {
  const session = driver.getDriver().session();
  try {
    await session.run(
      `MATCH (u:User {id: $userId})<-[:SENT_TO]-(n:Notification) DETACH DELETE n`,   //or is read false;
      { userId: req.user.id }
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error clearing notifications:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    await session.close();
  }
};

export const createAndDispatchNotifications = async ({ senderId, productId, io }) => {
  // const session = driver.getDriver().session();
  const message = 'A new product has been listed!';
  const timestamp = new Date().toISOString();

  try {   //make one notification node and send it to all the users who are in the contact list of the sender
    // for (const contactId of contacts) {
    //   const notificationId = `${senderId}-${productId}-${contactId}-${Date.now()}`;
    //   await session.run(
    //     `MATCH (u:User {id: $contactId})
    //      CREATE (n:Notification {
    //        id: $notificationId,
    //        message: $message,
    //        isRead: false,
    //        productId: $productId,
    //        senderId: $senderId,
    //        timestamp: $timestamp
    //      })-[:SENT_TO]->(u)`,
    //     { contactId, notificationId, message, productId, senderId, timestamp }
    //   );
      const contactId="f377a5e5-f6d5-4b33-8f42-e5bf54b056ae"
      const dummyNotification = {
        id: 'notif123',
        message: '📦 A new product has been listed by your contact!',
        productId: productId,
        senderId: senderId,
        timestamp: new Date().toISOString(),
        isRead: false
      };

      io.to(contactId).emit("receiveNotification", dummyNotification
      // {
      //   id: notificationId,
      //   message,
      //   productId,
      //   senderId,
      //   timestamp,
      //   isRead: false
    //   });
    // }
    );
  } catch (err) {
    console.error('Error dispatching notifications:', err);
  } finally {
    // await session.close();
  }
};