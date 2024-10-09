import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
//import User from './models/User.js'; // Adjust the import according to your User model location
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config(); 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // Use environment variables for security
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback", // Adjust the callback URL
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    
      return done(null, profile);
    
  }
));


// Serialize user to session
passport.serializeUser((user, done) => {
done(null, user); // Store googleId in session
});

// Deserialize user from session
passport.deserializeUser(async (user, done) => {
  // Fetch user from Neo4j using googleId
 done(null, user);
});

