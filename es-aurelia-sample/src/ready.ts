/*************************************************
 * Aurelia Sample-App for Elexis Server
 * (c) 2018 by G. Weirich and Webelexis
 **************************************************/

import 'fhirclient'

/**
 * After (hopefully successful) authentication and authorization, the smart client is ready for 
 * the things to come.
 */
export class Ready{
  private ok="no";

  activate(params,routeConfig,instruction){
    FHIR.oauth2.ready(smart=>{
      this.ok="yes"
      console.log("got smart client");
    })
    
  }
  
}