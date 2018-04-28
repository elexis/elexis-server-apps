import 'fhirclient'

export class Login{

  public login(){
    console.log("authorizin");
    
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