import { KundeuniversRoutes } from './kundeunivers.routes';

const plugin: any = {
  register: KundeuniversRoutes
};

plugin.register.attributes = {
  name: 'kundeunivers',
  version: '1.0.0'
};

export default plugin;
