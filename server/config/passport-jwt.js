import * as driver from '../neo4j/neo4j.js'; 
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY
}

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  const session = driver.getDriver().session();
  try {
    const user = await session.run(
        'MATCH (u:User {id: $id}) RETURN u',
        { id: jwt_payload.id }
    );
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }

  } catch (error) {
    return done(err, false);
  }
  finally {
    session.close();
  }
}));

