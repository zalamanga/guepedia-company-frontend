<template>
  <div id="admin-dashboard" class="mt-3">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">user</span>
        <h3 class="page-title">Data Administrator</h3>
      </div>
    </div>
    <!-- End Page Header -->
    <OurTeam/>
  </div>
</template>

<script>
import OurTeam from "@/components/Admin/OurTeam/OurTeam.vue";
export default {
  components: {
      OurTeam
  },
}
</script>
