import * as driver from '../neo4j/neo4j.js'; 

export async function createRefreshTokens(userId, refreshToken) {
  const session = driver.getDriver().session(); 
  try {
    const result = await session.writeTransaction(tx =>
      tx.run(
        ` MATCH (u:User {id: $userId})
          CREATE (r:RefreshToken {token: $refreshToken, createdAt: datetime(), expiresAt:datetime() + duration('P5D')})
          CREATE (u)-[:HAS_REFRESH_TOKEN]->(r)
          RETURN r
        `,
        { userId, refreshToken }
      )
    );
    console.log('Refresh token created successfully');
  } catch (error) {
    console.error('Error creating user and tokens:', error);
  } finally {
    await session.close();
  }
}

export async function deleteRefreshToken(userId) {
  const session = driver.getDriver().session(); 
  try {
    const result = await session.writeTransaction(tx =>
      tx.run(
        `
          MATCH (u:User {id: $userId})-[:HAS_REFRESH_TOKEN]->(r:RefreshToken)
          DETACH DELETE r
          RETURN r
        `,
        { userId }
      )
    );
    if (result.records.length > 0) {
      console.log('Refresh token deleted successfully');
      return result.records;
    } else {
      console.log('No refresh token found for the specified user');
      return null;
    }
  } catch (error) {
    console.error('Error deleting refresh token for user:', error);
  } finally {
    await session.close();
  }
}


// export default createRefreshTokens;
