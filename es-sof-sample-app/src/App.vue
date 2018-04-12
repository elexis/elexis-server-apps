<template>
  <div id="app">
    <div id="main">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Elexis-Server</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Connection</b-nav-item>
          <b-nav-item to="/patients">Patients</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
      <!-- routes will be rendered here -->
      <router-view v-bind:smart="this.smart"/>
    </div>
    <footer class="footer">
      <span class="text-muted">
        <div v-if="this.smart != null">
         Connected to {{ this.smart.server.serviceUrl}} [<a href="#" v-on:click="tokenInfo()">token-info</a>] [<a href="#" v-on:click="disconnect()">disconnect</a>]
        </div>
        <div v-else>
        Not connected
        </div>
      </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      smart: null
    }
  },
  methods: {
    disconnect () {
      this.smart = null
    },
    tokenInfo () {
      var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0')
      winPrint.document.write('<pre>' + JSON.stringify(this.smart, null, 2) + '</pre>')
      winPrint.document.close()
    }
  },
  beforeMount: function () {
    var vm = this
    window.FHIR.oauth2.ready(function (smart) {
      console.log("Received smart context")
      vm.smart = smart
    })
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px; /* Set the fixed height of the footer here */
  line-height: 40px; /* Vertically center the text there */
  background-color: #f5f5f5;
}


/* Custom page CSS
-------------------------------------------------- */
/* Not required for template or sticky footer method. */

.container {
  width: auto;
  max-width: 680px;
  padding: 0 15px;
}

#app{
 padding: 10px;
}
</style>
