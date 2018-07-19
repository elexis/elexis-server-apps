import Vue from 'vue'
import Swagger from 'swagger-client'

export default ({ store }, inject) => {
  
  if(store.state.oauth && store.state.oauth.host) {
      inject(
    'swagger',
    Swagger(
      store.state.oauth.host+'/services/swagger.json',
       {
          authorizations: {
            esoauth: {
              token: { access_token: store.state.oauth.accessToken }
            }
          }
        }
      )
  )
  } else {
    inject('swagger', "null")
  }


}