import 'fhirclient'

export class Ready{
  private ok="no";

  activate(params,routeConfig,instruction){
    FHIR.oauth2.ready(smart=>{
      this.ok="yes"
      console.log("got smart client");
    })
    
  }
  
}