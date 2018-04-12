<template lang="pug">
  div
    p Waiting for authentication ...
</template>

<script>
export default {
  mounted () {
    var vm = this
    function errback (err) {
      alert(err)
    }
    window.FHIR.oauth2.ready(function (smart) {
      console.log("Callback received smart context")
      vm.$emit("smartContextSet", smart)
      vm.$router.push("/")
    }, errback)
  }
}
</script>