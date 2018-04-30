---
pagetitle: Elexis Server Programmer's Handbook
title:
- type: main
  text: Elexis Server Programmer's Handbook
- type: subtitle
  text: How to setup Elexis Server and build apps to access it.
creator:
- role: author
  text: Gerry Weirich and others
date: 2018-04-24
lang: en
identifier:
rights: Copyright (C) 2018. All rights reserved. 
stylesheet: style.css
cover-image: img/cover.jpg 
...


## Purpose of this book  and intended audience

This book is about creating apps to access the [Elexis Server](https://github.com/elexis/elexis-server). It is not about programming the server itself. Some basic knowledge of JavaScript and REST is assumed.

## Prerequisites 

### Install Homebrew, NodeJS and Aurelia

#### macOS

```bash
/usr/bin/ruby -e "$(curl -fsSL 
 https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install nodejs
npm install -g aurelia-cli
```

#### Linux

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install 8
npm install -g aurelia-cli
```

### Install Docker

See the [Docker Website](https://www.docker.com/community-edition#/download)

Note: To run docker commands, you must either root or belong to the "docker" group - which is, in some respect, the same.
To add a user to the docker group, use the following command: `sudo usermod -aG docker $USER`. After that, you must logout and relogin that user.


### Quick walkthrough with our sample Aurelia project

This will guide you through a very simple Aurelia starter to connect with the Elexis Server. No bells and whistles, just a bare bones connector to demonstrate, how the principle works.


#### Clone the sample project:

```bash
git clone https://github.com/rgwch/elexis-server-apps
cd elexis-server-apps/es-aurelia-sample
npm install
```

#### Or create the project from scratch:

```bash
cd Documents\
au new es-aurelia-sample
```

* The wizard will walk through a series of questions. Here the answers:

3,1,2,1,3,1,1,1,1

* Then, install the smart-on-fhir client:

```bash
au install fhirclient
```

* Some modifications of aurelia_project/aurelia.json are required: In the section 'dependencies', replace `fhirclient' with:

```json
{
    "name": "fhirclient",
    "path": "../node_modules/fhirclient",
    "main": "fhir-client"
}
```

Please use the source code at `es-aurelia-sample/src` as a reference for the rest of this chapter.

The Aurelia framework i loaded in index.html and launches then src/main.ts. This configures the Framework and then continues to app.ts/app.html which is the entry point of the Program.

We change app.ts to configure the Router (the part of the framework which is responsible to convert addresses like /#/something into calls to a component of the program). We define only two routes for now: The entry route (login.ts) and the route to call after successful authentication (ready.ts).

Both routes are quite trivial:

login.ts:

```javascript
export class Login{

  public login(){
    
    FHIR.oauth2.authorize(
      {
        client: {

          client_id: 'ch.webelexis.apps.sample.001',
          scope: 'fhir',
          redirect_uri: "http://localhost:9000/#/auth"
        },
        server: "http://localhost:8380/fhir"
      }) 
  }
}
```


We simply call the authorize method of the [smart-on-fhir client](http://docs.smarthealthit.org/clients/javascript/) with the correct parameters. Note that the redirect\_uri must match the redirect-url and the client\_id must match the respective client id in the server's client configuration see below).

ready.ts:

```javascript
export class Ready{
  private ok="no";

  activate(params,routeConfig,instruction){
    FHIR.oauth2.ready(smart=>{
      this.ok="yes"
      console.log("got smart client");
      smart.api.search({ type: "Patient", query: { name: "" } }).then(results=> {
        results.data.entry.forEach(function (entry) {
            console.log(JSON.stringify(entry.resource))
            
        });
    });

    })
    
  }
  
```
The variable 'ok' is referenced in the ready.html:

```html
<template>
  <h1>ready</h1>
  <p>connected: ${ok}</p>
</template>
```

That's how Aurelia's data binding works. For now just note that the "activate" method is called by the framework, whenever the respective route was navigated to (/auth in this case). We try to get the smart context. and if successful set the bound variable "ok" to "yes" which is reflected in the UI immediately.

Then we use the context to load a list of all patients (which would be a waste of time and network bandwith in a real database of course).

Now, let's try to run that app.

## Launch Elexis Server and register the app

(For more detailed informations on the Elexis Server, see the [Wiki](https://github.com/elexis/elexis-server/wiki)), and, more specifically, the pages about [Smart-on-FHIR](https://github.com/elexis/elexis-server/wiki/SMART-on-FHIR).

For now, just open a terminal and enter:

`docker run -e DEMO_MODE='true' -e TZ=Europe/Zurich -p 8380:8380 -p 8480:8480 -p 7234:7234 --name elexis-server medevit/elexis-server`

```{.einschub}
On subsequent starts, use `docker start -ia elexis-server` instead, to keep any modifications you made in earlier runs. Read the documentation on `docker commit` to learn how to persist a changed state in a new container.
```

For the 2 Factor authentication, you need a TOTP password generator such as [Google Authenticator](https://de.wikipedia.org/wiki/Google_Authenticator) available in the Google Playstore as well as in the Apple App Store. In Short, a TOTP generator registers with a secret code specific for the resource to protect, an then generates a hash depending on the system time and that secret code. So, the server's system time and the system time of the mobile device used to generate the code have to be in sync (although a difference of a few seconds should do no harm generally).

Thus, download the app for your mobile device and use the QR Code found [here](https://github.com/elexis/elexis-server/wiki/SMART-on-FHIR) to register for the demo database.


Go to [http://localhost:8380/openid](http://localhost:8380/openid) and log in with the Username **Administrator** and the password **admin**. Use your TOTP App to generate the one-time code for the second factor.


```{.bemerkung}
I don't know how to generate the user secret for a working database. - Please provide info.
```

add a **new client**. 

On the main-page, enter a **Client Name** (any name will do) and set the address **http://localhost:9000/#/auth** as a redirect address. 

![](img/register_1.jpg)

On the access-page, add ad least the *fhir* sope.

![](img/register_2.jpg)

on the credentials-page, select "no authentication" for now.

![](img/register_3.jpg)

click **save** and make sure, the correct client ID is displayed.

![](img/register_4.jpg)


## Launch the sample app and connect with the server

```bash
au run --watch.
```

* Navigate to: `http://localhost:9000`.

* Click *connect*

If you do this the first time, you'll be requested to grant access for this app to the Elexis Server.

![](img/grant_1.jpg)

The App should connect with the server and output a patient list in the console log.

![](img/grant_2.jpg)


