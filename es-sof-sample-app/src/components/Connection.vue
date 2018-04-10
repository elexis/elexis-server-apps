<template lang="pug">
  div
    div(v-if="this.smart == null")
      h2 Connect to SMART on FHIR Server
      p Select a SMART on FHIR server URL to connect to.
      b-alert(variant="warning" :show="showConnectionError") {{ connectionError }}
      form 
        div.form-group.row
          label.col-sm-2.col-form-label SMART on FHIR Server URL
          div.col-sm-4
            input.form-control(type="text" v-model="fhirServer")
        div.form-group.row
          label.col-sm-2.col-form-label OAuth2 Client Id
          div.col-sm-4
            input.form-control(type="text" v-model="clientId")
        div.form-group.row
          label.col-sm-2.col-form-label OAuth2 Scopes
          div.col-sm-4
            input.form-control(type="text" v-model="scopes")
        div.form-group.row
          div.col-sm-4
            button(class="btn btn-primary" @click="submit()") Connect
    div(v-else)
      h2 Connected
      p Connected to {{ this.smart.server.serviceUrl }}
</template>

<script>
export default {
  props: ['smart'],
  data () {
    return {
      showConnectionError: false,
      connectionError: "",
      fhirServer: "http://localhost:8380/fhir",
      clientId: "es-sof-sample-app",
      scopes: "fhir openid"
    }
  },
  methods: {
    submit () {
      var vm = this
      function errback (err) {
        vm.showConnectionError = true
        vm.connectionError = err
      }

      window.FHIR.oauth2.authorize({
        client: {
          client_id: this.clientId,
          scope: this.scopes
        },
        server: this.fhirServer
      }, errback)
      console.log(this.$parent)
    }
  }
}
</script>