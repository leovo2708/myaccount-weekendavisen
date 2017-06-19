import { Base_Reply, Request, Server } from 'hapi';
import { ConfigResponse } from '../../../d/config';

export function ConfigRoutes(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false
    },
    handler: (request: Request, reply: Base_Reply): void => {
      const config: ConfigResponse = {
        gigyaApiKey: process.env.GIGYA_API_KEY
      };

      reply(config);
    }
  });

  next();
}
