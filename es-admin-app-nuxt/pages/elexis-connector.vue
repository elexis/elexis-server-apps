<template lang="pug">
    .div
        p uptime: {{ uptime }}
        hr
        p statusPlaintext: {{ statusPlaintext }}
        hr
        p inexistant: {{ inexistant }}
</template>

<script>
export default {
  computed: {},
  asyncComputed: {
    uptime() {
      return this.$swagger
        .then(client => {
          return client.apis.system.uptime();
        })
        .catch(err => {
          return "missing";
        });
    },
    statusPlaintext() {
      return this.$swagger.then(client => {
        return client.apis.system.getStatusPlaintext();
      });
    },
    inexistant() {
      return this.$swagger.then(client => {
        return client.apis.system.getStatusPlaintoxt();
      });
    }
  }
};
</script>

