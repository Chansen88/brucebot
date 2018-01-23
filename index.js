const Hapi = require('hapi');
const bot = require('./handlers/bot');
const gifs = require('./handlers/gifs');

const server = new Hapi.Server();

server.connection({
  port: 8080,
  host: 'badboybruce.herokuapp.com'
});

server.register(require('inert'), (err) => {
  if (err) {
    console.error(err);
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file('./public/index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/js/{file*}',
    handler: {
      directory: {
        path: './bruce/build/',
        listing: true,
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/gifs',
    handler: gifs.post,
  });

  server.route({
    method: 'POST',
    path: '/bot',
    handler: bot.post,
  });

  server.route({
    method: 'POST',
    path: '/groupme',
    handler: bot.respond,
  });
});

server.start((err) => {
  if ((err)) {
    console.error(err);
    throw err;
  }
  console.log(`Server is running at: ${server.info.uri}`);
});