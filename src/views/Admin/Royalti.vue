<template>
  <div id="admin-dashboard" class="mt-3">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <h3 class="page-title">Penarikan</h3>
      </div>
    </div>
    <!-- End Page Header -->
    <nom-statistik/>
    <Statistik/>
    <RoyaltiData/>
  </div>
</template>

<script>
import RoyaltiData from "@/components/Admin/Royalti/RoyaltiData.vue";
import Statistik from "@/components/Admin/Royalti/Statistics.vue";
import NomStatistik from "@/components/Admin/Royalti/NomStatistics.vue";
export default {
  components: {
      RoyaltiData,
      Statistik,
      NomStatistik
  },
}
</script>
