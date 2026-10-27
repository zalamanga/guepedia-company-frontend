<template>
  <div id="admin-dashboard">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <h3 class="page-title">Review Buku</h3>
      </div>
    </div>
    <!-- End Page Header -->
    
    <statistics/>
    <Orders/>
  </div>
</template>

<script>
import Statistics from "@/components/Admin/Review/Statistics.vue";
import Orders from "@/components/Admin/Review/Data.vue";
export default {
  components:{
    Statistics,
    Orders
  },
}
</script>