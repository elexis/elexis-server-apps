const { parse } = require('qs')
const popsicle = require('popsicle')

const extractHostFromURL = url => {
  console.log("extractHostFromUrl")
  console.log(url)
  const { oauthHost } = parse(url.split('?')[1])
  return oauthHost || "https://localhost:8480"
}

const fetchUserFromOpenId = (accessToken, request, options) => {
      console.log("fetchUser "+options)
      async function getOpenIdUserInfo() {
        try {
          let req = await popsicle.get({
            url: options.oauthHost+'/openid/userinfo',
            headers: {
              'Authorization': 'Bearer ' + accessToken
            }
          }).use(popsicle.plugins.parse('json'))
          return req.body
        } catch (err) {
          console.log(err)
          return { "err": err }
        }
      }

      let user = getOpenIdUserInfo();
      return user
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'es-admin-app-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/vue-async-computed', '~/plugins/swagger-client.js'
  ],
  modules: [
    'bootstrap-vue/nuxt', '@nuxtjs/font-awesome', '~/modules/nuxt-oauth'
  ],
  oauth: {
  sessionName: 'mySession',
  secretKey: 'secretKey',
  oauthClientID: 'esadmin-app',
  oauthClientSecret: 'Xjbo1jRRmgnHlnA-9P6-gcBA8fz6UsoebCsAWajOLzmVEKpTSXElPTw0Zftpedi0JmoIYc-D-3m7p9Ew6mZTVw',
  authorizationPath: '/openid/authorize',
  accessTokenPath: '/openid/token',
  scopes: ['esadmin', 'openid'],
  //oauthHost: req => extractHostFromURL(req.url),
  oauthHost: 'https://localhost:8480',
  fetchUser: (accessToken, request, options) => fetchUserFromOpenId(accessToken, request, options)
},
  /*
  ** Build configuration
  */
  build: {
    vendor: ['swagger-client'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
