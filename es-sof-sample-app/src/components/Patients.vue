<template lang="pug">
        div
          div
            vue-good-table(
              @on-row-click="rowSelected" 
              :columns="columns" 
              :rows="rows" 
              :sort-options="{enabled: false}" 
              :pagination-options="{ enabled: true, perPage: 20}" 
              :search-options="{ enabled:true }" 
              )
          div(id="jsonOutput")
            div
</template>

// https://github.com/xaksis/vue-good-table
// TODO api paging
// https://alligator.io/vuejs/dynamic-components/

<script>
import JSONFormatter from 'json-formatter-js'

export default {
  props: ['smart'],
  methods: {
    getPatients: function () {
      var vm = this
      this.smart.api.search({ type: "Patient", query: { name: this.nameFilter } }).then(function (bundle) {
        console.log("Fetching patients...")
        vm.rows = bundle.data.entry
      })
    },
    rowSelected: function (row) {
      var result = document.getElementById('jsonOutput')
      try {
        var formatter = new JSONFormatter(row.row, 4)
        result.innerHTML = ''
        result.appendChild(formatter.render())
      } catch (e) {
        result.innerHTML = 'error'
      }
    },
    getPatientFamilyName: function (data) {
      return data.resource.name[0].family
    },
    getPatientGivenName: function (data) {
      return data.resource.name[0].given[0]
    },
    getPatientAddress: function (data) {
      if (data.resource.address) {
        var ad = data.resource.address[0]
        return ad.postalCode + " " + ad.city + ",<br>" + ad.line
      }
    }
  },
  data: function () {
    return {
      nameFilter: 'Descher',
      rows: [],
      columns: [
        {
          label: 'Family Name',
          field: this.getPatientFamilyName
        },
        {
          label: 'Given Name',
          field: this.getPatientGivenName
        },
        {
          label: 'Date of Birth',
          field: 'resource.birthDate',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'DD.MM.YYYY'
        },
        {
          label: 'Address',
          field: this.getPatientAddress,
          html: true
        },
        {
          label: 'Actions',
          field: 'actions'
        }
      ]
    }
  },
  watch: {
    smart: function () {
      this.getPatients()
    }
  },
  mounted: function () {
    if (this.smart != null) {
      this.getPatients()
    }
  }
}
</script>

