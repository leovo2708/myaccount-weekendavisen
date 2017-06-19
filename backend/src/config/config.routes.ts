import { Base_Reply, Request, Server } from 'hapi';

export function ConfigRoutes(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false
    },
    handler: (request: Request, reply: Base_Reply): void => {
      reply({
        gigyaApiKey: process.env.GIGYA_API_KEY
      });
    }
  });

  next();
}
