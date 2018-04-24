export default {
  endpoint: 'auth',
  configureEndpoints: ['auth'],
  providers: {
    google: {
      clientId: "510355454208-ggh8a9dvo76q0bbsnjbjdnv21d83siv1.apps.googleusercontent.com",
      redirectUri: "http://localhost:9000/auth/google/callback"
    }
  }
}
