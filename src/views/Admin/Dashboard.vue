<template>
  <div id="admin-dashboard">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <h3 class="page-title">Dashboard</h3>
      </div>
    </div>
    <!-- End Page Header -->
    
    <statistics></statistics>

    <div class="row">
      <div class="col-md-12">
        <div class="text-start text-sm-left mb-0">
          <span class="text-uppercase page-subtitle">Grafik</span>
          <h3 class="page-title">Grafik Penjualan 30 Hari Terakhir</h3>
        </div>
        <naskah-chart></naskah-chart>
      </div>
    </div>
  </div>
</template>

<script>
import Statistics from "@/components/Admin/Statistics.vue";
import NaskahChart from '@/components/Admin/SalesReport/Chart.vue'
export default {
  components:{
    NaskahChart,
    Statistics
  }
}
</script>