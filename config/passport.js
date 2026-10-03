const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = mongodb.getDb();

        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({
          githubId: profile.id,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          email:
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : null,
        };

        const result = await usersCollection.insertOne(newUser);

        newUser._id = result.insertedId;

        return done(null, newUser);
      } catch (err) {
        console.error("GitHub authentication error:", err);
        return done(err, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = mongodb.getDb();

    const user = await db.collection("users").findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
