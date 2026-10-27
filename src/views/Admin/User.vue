<template>
  <div id="admin-dashboard" class="mt-3">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">user</span>
        <h3 class="page-title">Data User</h3>
      </div>
    </div>
    <!-- End Page Header -->
    <UserData/>
  </div>
</template>

<script>
import UserData from "@/components/Admin/User/UserData.vue";
export default {
  components: {
      UserData
  },
}
</script>
