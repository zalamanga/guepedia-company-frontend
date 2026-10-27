<template>
  <div id="admin-dashboard" class="mt-3 pb-5">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">User</span>
        <h3 class="page-title">Detail User</h3>
      </div>
    </div>
    <!-- End Page Header -->

    <div class="row">
      <div class="col-12 col-md-4">
        <info-user></info-user>
      </div>
      <div class="col-12 col-md-8">
        <royalti/>
        <data-royalti class="mt-3"/>
      </div>

      <div class="col-12">
        <data-naskah/>
      </div>

      <div class="col-12">
        <data-penjualan/>
      </div>
    </div>
  </div>
</template>

<script>
import InfoUser from "@/components/Admin/DetailUser/InfoUser.vue";
import Royalti from "@/components/Admin/DetailUser/Royalti.vue";
import DataRoyalti from "@/components/Admin/DetailUser/DataRoyalti.vue";
import DataNaskah from "@/components/Admin/DetailUser/DataNaskah.vue";
import DataPenjualan from "@/components/Admin/DetailUser/DataPenjualan.vue";
export default {
  created () {
  },
  components: {
    InfoUser,
    Royalti,
    DataRoyalti,
    DataNaskah,
    DataPenjualan
  },
};
</script>
