# MyaccountWeekendavisen

[Confluence page](https://berlingskemedia.atlassian.net/wiki/display/UT/MyAccount+SSO+app)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker environment

```
docker-compose build & docker-compose up -d
docker exec -it myaccount bash
ln -s /srv/myaccount/src /srv/myaccount-server/
cd /srv/myaccount
git pull
npm install
ng serve --host 0.0.0.0 --port 9099
```
Download environment variables shell script [config.sh](https://berlingskemedia.atlassian.net/wiki/download/attachments/129134687/config.sh?version=1&modificationDate=1491815428453&cacheVersion=1&api=v2)
and run in inside docker container. Then run server
```
. config.ssh
npm run dev
```
Test the app in browser http://localhost:9099
