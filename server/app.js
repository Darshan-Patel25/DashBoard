const { Client, auth } = require("twitter-api-sdk");
const express = require("express");

const app = express();

const authClient = new auth.OAuth2User({
  client_id: "SDNHdDhYVlFESnk2Qm85SDZ3eEM6MTpjaQ",
  client_secret: "SmDUBs4irpecoqVIWsIv7t0i0Md9wnM_Jfbs1kF0WOscjxXkes",
  callback:
    "https://cd23-2409-40c1-411f-388-60ca-3ccf-575d-1357.ngrok-free.app/callback",
  scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

const client = new Client(authClient);

const STATE = "my-state";

app.get("/callback", async function (req, res) {
  try {
    const { code, state } = req.query;

    // Check if state is correct
    if (state !== STATE) {
      return res.status(500).send("State isn't matching");
    }

    const tweetText = "Hello, world! 🚀 #MyFirstTweet";

    // Request access token from Twitter
    const token = await authClient.requestAccessToken(code);
    if (!token || !token.token) {
      return res.status(401).send("Invalid or expired authorization code.");
    }
    console.log(token);

    // Create a tweet using the access token
    const response = await client.tweets.createTweet({ text: tweetText });
    console.log("Tweet posted successfully:", response);

    res.json({ success: true, tweet_id: response.data.id });
  } catch (error) {
    console.log("Error posting tweet:", error);
    res.status(500).send("Internal server error while posting tweet.");
  }
});

app.get("/login", async function (req, res) {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  res.redirect(authUrl);
});

app.get("/revoke", async function (req, res) {
  try {
    const response = await authClient.revokeAccessToken();
    res.send(response);
  } catch (error) {
    console.log("Error revoking token:", error);
    res.status(500).send("Error revoking token.");
  }
});

app.listen(8080, () => {
  console.log(`Go here to login: http://127.0.0.1:8080/login`);
});
