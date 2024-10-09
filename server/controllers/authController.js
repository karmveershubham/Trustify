import passport from 'passport';
import * as driver from '../neo4j/neo4j.js';
import  {isLoggedIn } from '../middlewares/authMiddleware.js';
export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = passport.authenticate('google', {
      successRedirect: '/protected',
      failureRedirect: '/auth/google/failure',
    });
    
 
export const googleAuthFailure = (req, res) => {
  res.status(401).json({
    message: 'Authentication failed!',
  });
};
export const protectedRoute = async (req, res) => {
  if (req.user) {
    const { displayName, email } = req.user; // Adjust according to your actual structure

    const session = driver.getDriver().session();
    try {
      // Save or update user data in Neo4j
      await session.run(
        'MERGE (u:User {id: $id}) ' +
        'SET u.name = $name, u.email = $email',
        {
          id: req.user.id, // User ID from Google profile
          name: displayName,
          email: email
        }
      );

      // Send the response
      res.send(`Hello ${displayName}, your email is ${email}`);
    } catch (error) {
      console.error('Error saving user to Neo4j:', error);
      res.status(500).send('Error saving user data');
    } finally {
      session.close(); // Ensure session is closed
    }
  } else {
    res.status(401).send('Unauthorized');
  }
};


export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
};

