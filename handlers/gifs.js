const { getGifs } = require('../libs/giphys');

async function post(request, reply) {
  try {
    const { count, search } = request.payload;
    const body = await getGifs(search);
    const { data, meta } = JSON.parse(body);
    if (!meta.status === 200 || !data || !data.length) return reply("no luck");
    const urls = data.map(({ images }) => images.fixed_height.url);
    if (urls.length > count) urls.length = count;
    return reply(urls);
  } catch(error) {
    console.error(error);
    throw error;
  }
};

exports.post = post;
