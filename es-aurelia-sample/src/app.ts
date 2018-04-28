/*************************************************
 * Aurelia Sample-App for Elexis Server
 * (c) 2018 by G. Weirich and Webelexis
 **************************************************/

 /**
  * We start with just two routes: The first will presernt an option to log in, the second
  * will display the login state.
  */
import {Router, RouterConfiguration} from 'aurelia-router'
export class App {
  public configureRouter(config:RouterConfiguration, router: Router){
    config.map([
      {
        route: "",
        name: "login",
        moduleId: 'login',
        title: "Log in"
      },{
        route: "auth",
        moduleId: "ready",
        name:"auth",
        title: "Ready"
      }
    ])
  }
}
