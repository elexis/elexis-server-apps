<template>
  <div class="navbar-inverse navbar-fixed-left navbar-dark bg-dark">
    <a 
      class="navbar-brand" 
      href="/">Elexis-Server</a>
    <ul class="fa-ul">
          
      <li><i class="fa-li fa fa-plug fa-inverse"/><router-link to="connection">Connection</router-link></li>
      <li><i class="fa-li fa fa-user-md fa-inverse"/><router-link to="elexis-connector">Elexis-Connector</router-link></li>
      <li><i class="fa-li fa fa-user-md fa-inverse"/><router-link to="test">Test</router-link></li>
    </ul>
  </div>
</template>

<style>
.navbar-fixed-left {
  width: 180px;
  position: fixed;
  border-radius: 0;
  height: 100%;
}

.navbar-fixed-left .navbar-nav > li {
  float: none; /* Cancel default li float: left */
  width: 179px;
}

.navbar-fixed-left + .container {
  padding-left: 180px;
}

/* On using dropdown menu (To right shift popuped) */
.navbar-fixed-left .navbar-nav > li > .dropdown-menu {
  margin-top: -50px;
  margin-left: 180px;
}
</style>