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

async function saveMessage(payload) {
  return new Promise((resolve, reject) => {
    const message = {
      id: payload.id,
      attachments: payload.attachments,
      avatar_url: payload.avatar_url,
      created_at: payload.created_at,
      group_id: payload.group_id,
      name: payload.name,
      sender_id: payload.sender_id,
      sender_type: payload.sender_type,
      source_guid: payload.source_guid,
      system: payload.system,
      text: payload.text,
      user_id: payload.user_id
    };
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
