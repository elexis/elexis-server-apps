<template>
 <div class="hero">
      <div v-if="this.$parent.$parent.smart != null">
        <form class="form-inline">
        <div class="form-group">
            <input type="text" class="form-control" v-model="nameFilter">
            <p v-if="patients.length">Found {{ patients.length }} entries</p>
            <p v-else>Insert char filter with >= 4 chars</p>
        </div>
        </form>
        <datatable v-bind="tableConfig" v-on:row-click="onRowClick"></datatable>
        <div id="patientDetail">

        </div>
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
import DataTable from 'vue-materialize-datatable'

export default {
  data () {
    return {
      fhirServer: "http://localhost:8380/fhir",
      patients: [],
      nameFilter: '',
      tableConfig: {
        title: 'Patients',
        searchable: false,
        columns: [
          {
            label: 'Id',
            field: 'resource.id',
            numeric: false,
            html: false
          },
          {
            label: 'Family Name',
            field: function (row) {
              return row.resource.name[0].family
            },
            numeric: false,
            html: false
          },
          {
            label: 'Given Name',
            field: function (row) {
              return row.resource.name[0].given[0]
            },
            numeric: false,
            html: false
          },
          {
            label: 'Date of Birth',
            field: 'resource.birthDate',
            numeric: false,
            html: false
          },
          {
            label: 'Address',
            field: function (row) {
              if (row.resource.address) {
                var ad = row.resource.address[0]
                return ad.postalCode + " " + ad.city + ",<br>" + ad.line
              }
            },
            html: true
          }
        ],
        rows: []
      }
    }
  },
  components: {"datatable": DataTable},
  watch: {
    'nameFilter': function () {
      var vm = this
      vm.patients = []
      if (this.nameFilter.length > 3) {
        this.$parent.$parent.smart.api.search({ type: "Patient", query: { name: this.nameFilter } }).then(function (bundle) {
          vm.patients = bundle.data.entry
        })
      }
    },
    'patients': function () {
      this.tableConfig.rows = this.patients
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
    onRowClick: function (row) {
      document.getElementById("patientDetail").innerHTML = '<pre>' + JSON.stringify(row, null, 2) + '</pre>'
      console.log(row)
    }
  }
}
</script>

<style>
@import url(http://fonts.googleapis.com/icon?family=Material+Icons)
</style>