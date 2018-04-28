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
