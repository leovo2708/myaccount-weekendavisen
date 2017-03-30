import { Server } from 'hapi';
import * as Inert from 'inert';
import * as hapiAuthJwt2 from 'hapi-auth-jwt2';

import { BPC } from './user/bpc';
import kundeuniversPlugin from './kundeunivers/kundeunivers.plugin';
import userPlugin from './user/user.plugin';
import { preResponseExtension } from './pre-response.extension';
import { authConfig } from './jwt';

const application: Server = new Server({
  connections: {
    routes: {
      cors: true
    }
  }
});

function cb(err: Error): void {
  if (err) {
    console.log('Error when loading plugin', err);
    application.stop();
  }
}

application.connection({port: process.env.PORT || 8000});
application.ext('onPreResponse', preResponseExtension);

application.register(hapiAuthJwt2, (err: Error) => {
  if (err) {
    console.log(err);
  }

  application.auth.strategy('jwt', 'jwt', authConfig);
  application.auth.default('jwt');

  application.register(Inert, () => null);
  application.register(kundeuniversPlugin, <any>{routes: {prefix: '/kundeunivers'}}, cb);
  application.register(userPlugin, <any>{routes: {prefix: '/user'}}, cb);
});

application.start((err: Error) => {
  if (err) {
    throw err;
  }

  console.log(`Application running at: ${application.info.uri}`);
  BPC.saveAppTicket();
});
