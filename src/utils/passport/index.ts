import passport from 'passport';
import { localStrategy } from './strategies';
import { deserializeUser, serializeUser } from './serialization';

passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
