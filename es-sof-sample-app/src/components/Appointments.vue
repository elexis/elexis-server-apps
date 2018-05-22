<template lang="pug">
    div
        div.col-xs-12(style="height:20px")
        <full-calendar :events="events" :config="config"></full-calendar>
</template>

<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style>

<script>
import 'fullcalendar/dist/locale/de'
export default {
  props: ['smart'],
  methods: {
    events: function (start, end, timezone, callback) {
      if (this.smart == null) {
        return
      }
      var startDate = start.format('YYYY-MM-DD')
      var endDate = end.format('YYYY-MM-DD')
      console.log("Fetching appointments from [" + startDate + "] to [" + endDate + "]")
      this.smart.api.search({ type: "Appointment", query: { date: {$gt: startDate, $lt: endDate} } }).then(function (bundle) {
        console.log(bundle.data.entry)
        if (bundle.data.entry == null) {
          return
        }
        var events = []
        bundle.data.entry.forEach(element => {
          events.push({
            title: element.resource.description,
            start: element.resource.start,
            end: element.resource.end
          })
        })
        callback(events)
      })
    }
  },
  data () {
    return {
      config: {
        locale: 'de',
        editable: false
      }
    }
  }
}
</script>