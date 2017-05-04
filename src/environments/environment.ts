// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import IEnvironment from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:8084',
  TID: '3',
  brand: 'weekendavisen'
};
