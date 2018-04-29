/*************************************************
 * Aurelia Sample-App for Elexis Server
 * (c) 2018 by G. Weirich and Webelexis
 **************************************************/

import 'fhirclient'

/*
This is the entry point in our small app. Make sure the client_id below matches the client-id registered
with the Elexis-Authorization-Server.

*/
export class Login{

  public login(){
    console.log("authorizing");
    
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