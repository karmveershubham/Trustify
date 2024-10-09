// models/User.js
import * as driver from '../neo4j/neo4j.js'; // Import your Neo4j driver

// Function to find a user by Google ID
export const findUserByGoogleId = async (googleId) => {
  const session = driver.getDriver().session();
  try {
    const result = await session.run('MATCH (u:User {googleId: $googleId}) RETURN u', { googleId });
    return result.records.length ? result.records[0].get('u').properties : null;
  } finally {
    await session.close();
  }
};

// Function to create a new user
export const createUser = async (userData) => {
  const session = driver.getDriver().session();
  try {
    const result = await session.run(
      'CREATE (u:User {googleId: $googleId, username: $username, thumbnail: $thumbnail}) RETURN u',
      userData
    );
    return result.records[0].get('u').properties;
  } finally {
    await session.close();
  }
};
