# es-sof-patients

> Elexis Server SMART on FHIR patients sample

This is a sample app, derived from [medications-standalone](https://github.com/smart-on-fhir/sample-apps-stu3/tree/master/medications-standalone). It is configured against an
Elexis-Server running on localhost, providing a list of all patients available on the server.

### Registering this app with ES-OpenId

* Assert Elexis user is configured for web usage
  * User has role `fhir` assigned, and role exists
* Log in to http://yourserver:8380/openid with a web-enabled, Elexis user with Administrator privileges
* Switch to `Manage Clients` / `New Client`
  * Main
    * Client name: `es-sof-patients`
    * Client id: `es-sof-patients`
    * Redirect URI(s): `http://localhost:8080/`
  * Access
    * Scope: `fhir`
  * Credentials
    * Token Endpoint Authentication Method: `No authentication`

## Install & Run
Install NodeJS, go to the app directory and run:
```sh
npm i
npm run dev
```

You should see something like

    Starting up http-server, serving ./
    Available on:
        http://127.0.0.1:8080
        http://10.23.49.21:8080

You can stop the server if needed using <kbd>Ctrl+C</kbd>.

After starting up, use your webbrowser to access http://localhost:8080/launch.html.