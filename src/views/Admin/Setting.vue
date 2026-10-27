<template>
  <div id="admin-dashboard" class="mt-3">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">toko</span>
        <h3 class="page-title">Pengaturan Toko</h3>
      </div>
    </div>
    <!-- End Page Header -->
    <Setting/>
  </div>
</template>

<script>
import Setting from "@/components/Admin/Setting/Setting.vue";
export default {
  components: {
      Setting
  },
}
</script>
