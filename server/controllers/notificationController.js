import * as driver from "../neo4j/neo4j.js";

function formatTimestampReadable(neo4jTimestamp) {
  const { year, month, day, hour, minute } = neo4jTimestamp;
  const hrs = hour.low % 12 || 12;
  const ampm = hour.low >= 12 ? 'PM' : 'AM';
  return `${day.low.toString().padStart(2, '0')}-${month.low.toString().padStart(2, '0')}-${year.low} ${hrs}:${minute.low.toString().padStart(2, '0')} ${ampm}`;
}


export const getUserNotifications = async (req, res) => {
  const session = driver.getDriver().session();
  try {
    const result = await session.run(
      `MATCH (n:Notification)-[:SENT_TO]->(u:User {id: $userId})
       RETURN n ORDER BY n.timestamp DESC`,
      { userId: req.user.id }
    );

    const notifications = result.records.map(record => {
      const notification = record.get('n').properties;

      if (notification.timestamp) {
        notification.timestamp = formatTimestampReadable(notification.timestamp);
      }
      return notification;
    });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    await session.close();
  }
};



export const markNotificationAsRead = async (req, res) => {
  const session = getDriver().session();
  const userId = req.user.id;
  const notificationId = req.params.notificationId;

  console.log("Marking notification as read...");
  console.log("User ID:", userId);
  console.log("Notification ID:", notificationId);

  try {
    const result = await session.run(
      `
      MATCH (n:Notification {id: $notificationId})-[r:SENT_TO]->(u:User {id: $userId})
      SET r.isRead = true
      RETURN n.id AS notificationId, r.isRead AS isRead
      `,
      { userId, notificationId }
    );

    if (result.records.length === 0) {
      console.log("No matching notification relation found.");
      return res.status(404).json({ error: 'Notification not found or already marked.' });
    }

    const isRead = result.records[0].get('isRead');

    console.log("Notification marked as read successfully!");
    res.json({ success: true, notificationId, isRead });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    await session.close();
  }
};

export const createAndDispatchNotifications = async ({title, message, senderId, productId, io }) => {
  const session = driver.getDriver().session();
  try {
    const result = await session.run(
      `MATCH (sender:User {id: $senderId})
      MATCH (sender)-[:HAS_CONTACT]->(u:User)-[:HAS_CONTACT]->(sender)
      WITH sender, collect(u) AS mutuals,
           apoc.create.uuid() AS notifId,
           datetime() AS ts
      CREATE (n:Notification {
        id: notifId,
        title:$title,
        message: $message,
        productId: $productId,
        senderId: sender.id,
        timestamp: ts
      })
      WITH n, mutuals
      UNWIND mutuals AS user
      MERGE (n)-[r:SENT_TO]->(user)
      SET r.isRead = false
      RETURN n, user.id AS contactId, r.isRead AS isRead`,
      { senderId, productId,message,title}
    );

    const notificationNode = result.records[0]?.get('n')?.properties;

    if (!notificationNode) {
      return { success: false, error: "No mutual contacts found." };
    }

    // Send notification to all mutual contacts
    for (const record of result.records) {
      const contactId = record.get('contactId');
      const isRead = record.get('isRead');
      io.to(contactId).emit("receiveNotification", {
        id: notificationNode.id,
        title: notificationNode.title,
        message: notificationNode.message,
        productId: notificationNode.productId,
        senderId: notificationNode.senderId,
        timestamp: formatTimestampReadable(notificationNode.timestamp),
        isRead, 
      });
    }



    return {
      success: true,
      notification: notificationNode,
      recipients: result.records.map(r => r.get('contactId')),
    };
  } catch (err) {
    console.error('Error dispatching notifications:', err);
    return { success: false, error: err.message };
  } finally {
    await session.close();
  }
};