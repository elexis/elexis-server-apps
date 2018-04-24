import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import authConfig from './authConfig'

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-api', config => {
      // Register an authentication hosts
      config.registerEndpoint('auth');
    })
    /* configure aurelia-authentication */
    .plugin('aurelia-authentication', baseConfig => {
        baseConfig.configure(authConfig);
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
