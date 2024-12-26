import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
//import User from './models/User.js'; // Adjust the import according to your User model location
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config(); 

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  // accessType: 'offline', // Required for refresh token
  passReqToCallback: true,
},
(req, accessToken, refreshToken, profile, done) => {
  // Store the accessToken to access the People API later
  console.log(accessToken);
  const user = {
    profile: profile,
    accessToken: accessToken,
    refreshToken: refreshToken
  };
  return done(null, {profile, accessToken, refreshToken});
}));

// Serialize user to session
passport.serializeUser((user, done) => {
done(null, user); // Store googleId in session
});

// Deserialize user from session
passport.deserializeUser(async (user, done) => {
  // Fetch user from Neo4j using googleId
 done(null, user);
});

