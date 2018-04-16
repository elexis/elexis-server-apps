<template lang="pug">
        div
          div.col-xs-12(style="height:20px")
          div.form-group.row
            div.col-sm-6
              input.form-control(type="text" v-model="dataLoad" placeholder="Insert name (min 2 chars) or % to start loading")
          div
            vue-good-table(
              @on-row-click="rowSelected"
              :columns="columns" 
              :rows="rows" 
              :sort-options="sortOptions"              
              :pagination-options="{ enabled: true, perPage: 20}" 
              :search-options="{ enabled:false }" 
              )
          div#jsonOutput
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
      this.smart.api.search({ type: "Patient", query: { name: this.dataLoad } }).then(function (bundle) {
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
      dataLoad: '',
      rows: [],
      columns: [
        {
          label: 'Family Name',
          name: 'familyName',
          field: this.getPatientFamilyName
        },
        {
          label: 'Given Name',
          name: 'givenName',
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
        }
      ],
      sortOptions: {
        enabled: true,
        initialSortBy: { field: 'familyName', type: 'asc' }
      }
    }
  },
  watch: {
    dataLoad: function () {
      if (this.smart == null) {
        return
      }
      if (this.dataLoad === '%' || this.dataLoad.length > 1) {
        this.getPatients()
      } else {
        this.rows = []
      }
    }
  }
}
</script>

