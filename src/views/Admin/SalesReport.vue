<template>
  <div id="admin-dashboard" class="mt-3">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <h3 class="page-title">Daftar Penjualan</h3>
      </div>
    </div>
    <!-- End Page Header -->

    <chart/>
    <statistik/>
    <sales-data/>
  </div>
</template>

<script>
import Chart from "@/components/Admin/SalesReport/Chart.vue";
import SalesData from "@/components/Admin/SalesReport/SalesData.vue";
import Statistik from "@/components/Admin/SalesReport/Statistics.vue";
export default {
  components: {
      Chart,
      SalesData,
      Statistik
  },
}
</script>
