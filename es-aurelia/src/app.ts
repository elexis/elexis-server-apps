import { autoinject } from "aurelia-framework";
import { AuthService } from 'aurelia-authentication';

@autoinject
export class App {
  private authenticated;

  constructor(private authService: AuthService) {
    this.authService = authService;
    this.authenticated = false;
  };

  // use authService.login(credentialsObject) to login to your auth server
  // authService.authenticated holds the current status
  // authService.getPayload() gives you the current payload object (for jwt)
  login(credentialsObject) {
    return this.authService.login(credentialsObject)
      .then(() => {
        this.authenticated = this.authService.authenticated;
      });
  };

  // use authService.logout to delete stored data
  // set expiredRedirect in your settings to automatically redirect
  logout() {
    return this.authService.logout()
      .then(() => {
        this.authenticated = this.authService.authenticated;
      });
  }

  // use authService.authenticate(name) to get third-party authentication
  authenticateGoogle() {
    return this.authService.authenticate('google')
      .then(() => {
        this.authenticated = this.authService.authenticated;
      });
  }
}
