const { createBundleRenderer } = require('vue-server-renderer');
const fastify = require('fastify')({ logger: true });
const fs = require('fs');
const path = require('path');
const bundle = require('../dist/vue-ssr-server-bundle.json');

const templatePath = path.resolve(__dirname, './index.template.html');
const template = fs.readFileSync(templatePath, 'utf-8');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(bundle, {
  template,
  clientManifest,
  runInNewContext: false,
});

fastify.get('/', async (request, reply) => {
  const templateContext = {
    title: 'Commandowl',
  };

  renderer.renderToString(templateContext, (err, html) => {
    if (err) {
      reply.code(500).send('Internal Server Error');
      return;
    }
    reply
      .header('Content-Type', 'text/html; charset=utf-8')
      .send(html);
  });
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../dist'),
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
