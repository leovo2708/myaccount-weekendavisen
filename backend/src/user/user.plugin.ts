import { UserRoutes } from './user.routes';

const plugin: any = {
  register: UserRoutes
};

plugin.register.attributes = {
  name: 'user',
  version: '1.0.0'
};

export default plugin;
