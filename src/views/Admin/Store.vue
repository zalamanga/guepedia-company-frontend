<template>
  <div id="admin-dashboard">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <h3 class="page-title">Penjualan</h3>
      </div>
    </div>
    <!-- End Page Header -->
    
    <statistics/>
    <Orders/>
  </div>
</template>

<script>
import axios from 'axios';

import Statistics from "@/components/Admin/Store/Statistics.vue";
import Orders from "@/components/Admin/Store/Data.vue";
export default {
  components:{
    Statistics,
    Orders
  },
  methods:{
    readNotif() {
      this.loading = true;

      var status = this.$route.params.status;
      
      if (status == 'pending' || !status) {
        var url = "readNotif/NewOrder";
      } else if (status == 'proses') {
        var url = "readNotif/PaidOrder";
      } else{
        var url = "readNotif/NewOrder";
      }

      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.data;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },

  mounted(){
    this.readNotif();
  },

  watch: {
    $route() {
      this.readNotif();
    },
  },
}
</script>