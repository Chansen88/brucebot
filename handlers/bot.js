const { sequelize } = require('../index');
const { Message } = require('../models/index');
const { postMessage } = require('../libs/groupMe');
const { getGifs } = require('../libs/giphys');
const bruceRegex = /\/bruce/i;

async function respond(request, reply) {
  try {
    saveMessage(request.payload);
    const { text } = request.payload;
    if (!text || !bruceRegex.test(text)) return reply();
    const searchString = text.replace(bruceRegex, '').split(' ').join('+');
    const body = await getGifs(searchString);
    const { data, meta } = JSON.parse(body);
    if (!meta.status === 200 || !data || !data.length) return reply('no luck');
    const randomGif = Math.floor(data.length * Math.random());
    await postMessage(data[randomGif].images.fixed_height.url);
    reply(data[randomGif].images.fixed_height.url);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function post(request, reply) {
  try {
    const { text } = request.payload;
    await postMessage(text);
    reply();
  } catch(error) {
    console.error(error);
    throw error;
  }
};

async function saveMessage(message) {
  return new Promise((resolve, reject) => {
    Message.create(message)
      .then((savedMessage) => {
        console.log(savedMessage);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  })
}

exports.respond = respond;
exports.post = post;
