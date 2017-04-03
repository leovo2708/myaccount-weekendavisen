import { Server } from 'hapi';
import * as Inert from 'inert';

import Ticket from './routes/ticket';
import User from './routes/user';
import { BPC } from './bpc';

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
application.register(Inert, () => {
});

application.register(Ticket, <any>{routes: {prefix: '/ticket'}}, cb);
application.register(User, <any>{routes: {prefix: '/user'}}, cb);

application.start((err: Error) => {
  if (err) {
    throw err;
  }

  console.log(`Application running at: ${application.info.uri}`);
  BPC.saveAppTicket();
});
