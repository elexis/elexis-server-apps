<template lang="pug">
    div.jumbotron.mx-auto.text-center
        img.mb-4(src="/elexis.png")
        h1.h3.mb-3.font-weight-normal Select elexis-server host
        b-form-group(label="https://" horizontal :label-cols="1" label-for="host")
            b-form-input.mb-3(id="host" v-model="host")
            b-button(variant="primary sm" @click="oauthDynamicLogin()") Login
</template>

<script>
export default {
  layout: "full_screen_dialog",
  data() {
    return {
      host: "localhost:8480"
    };
  },
  methods: {
    oauthDynamicLogin: function() {
      var value = "/&oauthHost=https://" + this.host;
      console.log(value);
      this.$login(value);
    }
  }
};
</script>


