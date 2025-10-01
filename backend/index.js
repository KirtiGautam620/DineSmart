const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config();
const jwt=require("jsonwebtoken")

const app = express();

const JWT_SECRET=process.env.JWT_SECRET || "supersecret"

// session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport config
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // yaha tum database me user ko save kar sakte ho
    console.log("Access Token:", accessToken);
    console.log("Profile:", profile);
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// routes
app.get("/", (req, res) => {
  res.send(`<a href="/auth/github">Login with GitHub</a>`);
});

// login route
app.get("/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// callback route
app.get("/auth/github/callback", 
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    // res.redirect("/profile");
    const user=req.user
    const token=jwt.sign(
        {
            id:user.id,
            username:user.username
        },
        JWT_SECRET,
        {
            expiresIn:"1h"
        }
    )
    res.redirect(`dinesmart://redirect?token=${token}`);

  }
);

// protected route
app.get("/profile", (req, res) => {
    const header=req.headers.authorization
    const toke=header.split(" ")[1]
    if(!toke){
       return  res.status(401).json({error:"no token provided"})
    }
    jwt.verify(toke,JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({error:"invalid token"})
        }
        res.json(user)
    })
//   if (!req.user) return res.redirect("/");
//   res.send(`<h1>Hello ${req.user.username}</h1>
//             <p>Profile JSON:</p>
//             <pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});