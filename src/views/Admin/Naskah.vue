<template>
  <div id="admin-dashboard">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <h3 class="page-title">File Naskah</h3>
      </div>
    </div>
    <!-- End Page Header -->
    
    <statistics/>
    <Orders/>
  </div>
</template>

<script>
import Statistics from "@/components/Admin/Naskah/Statistics.vue";
import Orders from "@/components/Admin/Naskah/Data.vue";
export default {
  components:{
    Statistics,
    Orders
  }
}
</script>