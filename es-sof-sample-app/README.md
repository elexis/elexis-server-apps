# es-sof-sample-app

> Elexis Server SMART on FHIR sample app

This is a sample application to use the SMART on FHIR interface provided by the [Elexis-Server](https://github.com/elexis/elexis-server) (ES >v1.6). In order to use this application,
you have to register it with the ES OpenId Server.

### Registering this app with ES-OpenId

* Log in to http://yourserver:8380/openid with an Elexis user
* Switch to `Manage Clients` / `New Client`
  * Main
    * Client name: `es-sof-sample-app`
    * Client id: `es-sof-sample-app`
    * Redirect URI(s): `http://localhost:8080/`
  * Access
    * Scope: `fhir, openid, profile`
  * Credentials
    * Token Endpoint Authentication Method: `No authentication`
* Be sure, that the user you will be using the app with has the role `fhir` set


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
