import { server as _server } from '@hapi/hapi';
import routes from './routes.js';

const server = _server({
  port: 9000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

server.route(routes);

server
  .start()
  .then(() => console.log('Server running on port 9000'))
