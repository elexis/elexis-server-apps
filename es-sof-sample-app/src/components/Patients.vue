<template lang="pug">
        div
            vue-good-table(:columns="columns" :rows="rows" :search-options="searchOptions" :sort-options="{enabled: false}" :pagination-options="{ enabled: true, perPage: 20}" styleClass="vgt-table striped bordered")
</template>

// https://github.com/xaksis/vue-good-table#empty-state-slot

<script>
export default {
  props: ['smart'],
  methods: {
    getPatients: function () {
      var vm = this
      this.smart.api.search({ type: "Patient", query: { name: this.nameFilter } }).then(function (bundle) {
        vm.rows = bundle.data.entry
      })
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
      searchOptions: {
        enabled: true,
        searchFn: this.patSearchFn
      },
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
  }
}
</script>

