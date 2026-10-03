const express = require("express");
const passport = require("../config/passport");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    res.status(200).json({
      message: "Successfully authenticated with GitHub.",
      user: req.user,
    });
  },
);

router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      authenticated: true,
      user: {
        id: req.user._id,
        githubId: req.user.githubId,
        username: req.user.username,
        displayName: req.user.displayName,
        email: req.user.email,
      },
    });
  }

  res.status(401).json({
    authenticated: false,
  });
});

router.get("/test-protected", isAuthenticated, (req, res) => {
  res.status(200).json({
    message: "You are authenticated!",
    user: req.user.username,
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        error: "Logout failed.",
      });
    }

    res.status(200).json({
      message: "Successfully logged out.",
    });
  });
});

module.exports = router;
