<template>
 <div class="hero">
      <div v-if="this.$parent.$parent.smart != null">
        <p class="lead">Select patient</p>
        <form class="form-inline">
        <div class="form-group">
            <input type="text" class="form-control" v-model="nameFilter"> 
            <button class="btn btn-primary" @click="loadPatients()">Load Patients</button>
            <p v-if="patients.length">Found {{ patients.length }} entries</p>
        </div>
        </form>
        <ul v-if="patients.length">
          <li v-for="patient in patients" :key="patient.resource.id">
           {{ getPatientLabel(patient) }}
          </li>
        </ul>

     </div>
     <div v-else>

      <h2>Connect to SMART on FHIR Server</h2>
      <p>Select a SMART on FHIR Server URL to connect to.</p>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="SMART on FHIR Server URL"
          v-model="fhirServer">
      </div>
      <button class="btn btn-primary" @click="submit()">Connect</button>
    </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      fhirServer: "http://localhost:8380/fhir",
      patients: [],
      nameFilter: ''
    }
  },
  methods: {
    submit () {
      window.FHIR.oauth2.authorize({
        client: {
          client_id: "es-sof-sample-app",
          scope: "fhir openid profile"
        },
        server: this.fhirServer
      })
      console.log(this.$parent)
    },
    loadPatients () {
      var vm = this
      vm.patients = []
      this.$parent.$parent.smart.api.search({ type: "Patient", query: { name: this.nameFilter } }).then(function (bundle) {
        vm.patients = bundle.data.entry
      })
    },
    getPatientLabel (patient) {
      return patient.resource.name[0].family + ", " + patient.resource.name[0].given[0] + " (" + patient.resource.birthDate + ") [" + patient.resource.id + "]"
    }
  }
}
</script>

<style>

</style>