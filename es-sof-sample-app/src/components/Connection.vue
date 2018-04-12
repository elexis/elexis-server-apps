<template lang="pug">
  div
    div(v-if="this.smart == null")
      h2 Connect to SMART on FHIR Server
      p Select a SMART on FHIR server URL to register, resp. connect to.
      b-alert(variant="warning" :show="showConnectionError") {{ connectionError }}
      form
        div.form-group.row
          label.col-sm-2.col-form-label Registration URL
          div.col-sm-4
            input.form-control(type="text" v-model="registrationUrl")
          div.col-sm-1
            button(class="btn btn-primary" @click="registerApp()") Register App
        div.form-group.row
          label.col-sm-2.col-form-label Server URL
          div.col-sm-4
            input.form-control(type="text" v-model="fhirServer")
        div.form-group.row
          label.col-sm-2.col-form-label OAuth2 Client Id
          div.col-sm-4
            input.form-control(type="text" v-model="clientId")
        div.form-group.row
          label.col-sm-2.col-form-label OAuth2 Client Scopes
          div.col-sm-4
            input.form-control(type="text" v-model="scopes")
        div.form-group.row
          div.col-sm-1
            button(class="btn btn-primary" @click="submit()") Connect
      div(id="jsonOutput")
    div(v-else)
      h2 Connected
      p Connected to {{ this.smart.server.serviceUrl }}
      div(id="jsonOutput")
</template>
<script>
import manifestJson from '@/.well-known/smart/manifest.json'
import JSONFormatter from 'json-formatter-js'

export default {
  props: ['smart'],
  data () {
    return {
      showConnectionError: false,
      connectionError: "",
      fhirServer: "http://localhost:8380/fhir",
      registrationUrl: "http://localhost:8380/openid/register",
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
        alert(err)
      }
      window.FHIR.oauth2.authorize({
        client: {
          client_id: this.clientId,
          scope: this.scopes
        },
        server: this.fhirServer
      }, errback)
      console.log(this.$parent)
    },
    registerApp () {
      // https://github.com/smart-on-fhir/client-js/tree/master/src/client
      var vm = this
      function errback (err) {
        vm.showConnectionError = true
        vm.connectionError = err
        alert(err)
      }
      this.$http.post(this.registrationUrl, manifestJson).then(function (res) {
        var result = document.getElementById('jsonOutput')
        try {
          var formatter = new JSONFormatter(res, 4)
          result.innerHTML = ''
          result.appendChild(formatter.render())
          vm.clientId = res.body.client_id
        } catch (e) {
          result.innerHTML = 'error'
        }
      }, errback)
    }
  }
}
</script>