const https = require("https");
// const env = require('node-env-file');
// env(__dirname + '/../.env');

const botID = process.env.BOT_ID;

function postMessage(botResponse) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.groupme.com",
      path: "/v3/bots/post",
      method: "POST"
    };

    const body = {
      bot_id: botID,
      text: botResponse
    };

    console.log(`sending ${botResponse} to ${botID}`);

    const req = https.request(options, (error) => {
      if (error.statusCode !== 202) return reject(`rejecting bad status code ${error.statusCode}`);
      resolve();
    });

    req.on("error", err => reject(error));

    req.on("timeout", err => reject(error));

    req.end(JSON.stringify(body));
  });
}

exports.postMessage = postMessage;
