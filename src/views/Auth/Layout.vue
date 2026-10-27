<template>
  <div class="account-page mb-3">
    <div class="row align-items-center">
          <div class="d-none d-md-block col-md-6 col-lg-6 counter">
              <side-auth/>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-6">
              <router-view/>
          </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideAuth from '../../components/Auth/Side.vue'

export default {
  name: 'Home',
  components: {
    SideAuth
  }
}
</script>

<style>
.form-label{
    font-size: 0.9em;
}
</style>