<template lang="pug">
  div
    div(v-if="this.smart == null")
      h2 Connect to SMART on FHIR Server
      b-alert(variant="warning" :show="showConnectionError") {{ connectionError }}
      form
        div.form-group.row.bg-light
          label.col-sm-2.col-form-label Load configuration
          div.col-sm-6
            button.btn.btn-secondary.btn-r5(@click="loadLocalhost()") localhost (devel)
            button.btn.btn-secondary.btn-r5(@click="loadMustermann()") Praxis Mustermann
            button.btn.btn-secondary(@click="loadBeispielfrau()") Praxis Beispielfrau
        div.form-group.row
          label.col-sm-2.col-form-label App Registration URL
          div.col-sm-4
            input.form-control(type="text" v-model="registrationUrl")
          div.col-sm-1
            button(class="btn btn-primary" @click="registerApp()") Register App
          div.col-sm-1
            button(class="btn btn-primary" @click="showManifest()") Show manifest
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
          label.col-sm-2.col-form-label Web-Security deactivated
          div.col-sm-4
            input.form-control(type="checkbox" v-model="fhirServerNoWebSecurity")
        div.form-group.row
          div.col-sm-1
            button(class="btn btn-primary" @click="submit()") Connect
      div(id="jsonOutput")
    div(v-else)
      h2 Connected
      p Connected to {{ this.smart.server.serviceUrl }}
      div.form-group.row
        div.col-sm-1
          button(class="btn btn-primary" @click="showAccessToken()") Show access token
    div(id="jsonOutput")
</template>

<script>
import manifestJson from '../assets/manifest.json'
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
      scopes: "fhir openid",
      fhirServerNoWebSecurity: false
    }
  },
  methods: {
    submit () {
      var vm = this
      function errback (err) {
        vm.showConnectionError = true
        vm.connectionError = err
      }
      if (this.fhirServerNoWebSecurity) {
        var fhirClient = window.FHIR.client(
          {
            serviceUrl: this.fhirServer
          }
        )
        vm.$emit("smartContextSet", fhirClient)
        return
      }
      window.FHIR.oauth2.authorize({
        client: {
          client_id: this.clientId,
          scope: this.scopes,
          redirect_uri: "/#/callback"
        },
        server: this.fhirServer
      }, errback)
    },
    loadLocalhost () {
      this.fhirServer = "http://localhost:8380/fhir"
      this.registrationUrl = "http://localhost:8380/openid/register"
    },
    loadMustermann () {
      this.fhirServer = "https://praxismustermann.medelexis.ch/fhir"
      this.registrationUrl = "https://praxismustermann.medelexis.ch/openid/register"
    },
    loadBeispielfrau () {
      this.fhirServer = "https://praxisbeispielfrau.medelexis.ch/fhir"
      this.registrationUrl = "https://praxisbeispielfrau.medelexis.ch/openid/register"
    },
    registerApp () {
      // https://github.com/smart-on-fhir/client-js/tree/master/src/client
      var vm = this
      function errback (err) {
        vm.showConnectionError = true
        vm.connectionError = err
      }
      // TODO manifest json, replace with this url?
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
    },
    showManifest () {
      var result = document.getElementById('jsonOutput')
      try {
        var formatter = new JSONFormatter(manifestJson, 4)
        result.innerHTML = ''
        result.appendChild(formatter.render())
      } catch (e) {
        result.innerHTML = 'error'
      }
    },
    showAccessToken () {
      var result = document.getElementById('jsonOutput')
      try {
        var formatter = new JSONFormatter(this.smart, 4)
        result.innerHTML = ''
        result.appendChild(formatter.render())
      } catch (e) {
        result.innerHTML = 'error'
      }
    }
  }
}
</script>

<style scoped>
.btn-r5 {
  margin-right: 5px;
}
</style>