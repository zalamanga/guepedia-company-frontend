<template>
  <div class="account-page">
    <div class="row">
          <div class="d-none d-md-block col-md-3 col-lg-3">
              <side-menu/>
          </div>
          <div class="col-12 col-sm-12 col-md-9 col-lg-9">
              <statistik class="mb-3"/>
              <router-view/>
          </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Statistik from '../../components/AccountPage/Statistik.vue'
import SideMenu from '../../components/AccountPage/SideMenu.vue'

export default {
  name: 'Home',
  components: {
    Statistik,
    SideMenu
  }
}
</script>
