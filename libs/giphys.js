const http = require("http");
const { URL } = require("url");

function getGifs(search) {
  return new Promise((resolve, reject) => {
    const searchString = search.split(" ").join("+");
    const options = new URL(
      `http://api.giphy.com/v1/gifs/search?q=${searchString}&api_key=dc6zaTOxFJmzC`
    );

    const req = http.request(options, res => {
      res.setEncoding("utf8");

      let body = "";
      res.on("data", chunk => {
        body += chunk;
      });

      res.on("end", () => {
        resolve(body);
      });
    });

    req.on("error", err => reject(error));

    req.end();
  });
}

exports.getGifs = getGifs;