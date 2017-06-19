import { ConfigRoutes } from './config.routes';

const plugin: any = {
  register: ConfigRoutes
};

plugin.register.attributes = {
  name: 'config',
  version: '1.0.0'
};

export default plugin;
