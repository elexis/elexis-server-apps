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

          client_id: '56c48b96-9d29-4931-b3bb-22eb656065de',
          scope: 'fhir',
          redirect_uri: "http://localhost:9000/#/auth"
        },
        server: "http://localhost:8380/fhir"
      }) 
  }
}