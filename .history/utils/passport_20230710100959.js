const JwtStrategy = require("passport-jwt").Strategy;
require("dotenv").config();
const { getUserByID } = require("../database");

const SECRET_KEY = process.env.SECRET_KEY;

const cookieExtractor = (req) => {
  var token = null;
  // console.log(req.cookies);
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // console.log(token);
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: SECRET_KEY,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      // console.log(jwt_payload);
      const user = getUserByID(jwt_payload.sub);
      user.then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
