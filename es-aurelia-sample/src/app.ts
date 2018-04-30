/*************************************************
 * Aurelia Sample-App for Elexis Server
 * (c) 2018 by G. Weirich and Webelexis
 **************************************************/

 /**
  * We start with just two routes: The first will present an button to connect, the second
  * will display the connect state.
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
