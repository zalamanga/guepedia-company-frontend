<template>
  <div id="admin-dashboard">
    <!-- Page Header -->
    <!-- <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Project</span>
        <h3 class="page-title">Detail Naskah</h3>
      </div>
    </div> -->
    <!-- End Page Header -->
    
    <data-naskah/>
  </div>
</template>

<script>
import DataNaskah from "@/components/Admin/Naskah/DataNaskah.vue";
export default {
  components:{
    DataNaskah,
  }
}
</script>