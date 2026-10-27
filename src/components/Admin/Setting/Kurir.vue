<template>
  <div class="card card-small blog-comments" style="position: inherit; height: 100%;">
    <div class="card-header border-bottom">
      <div class="justify-content-center align-items-center">
        <h6 class="m-0">Kurir</h6>
        <div class="service-item">
          <vs-checkbox v-for="item in data" :key="item.id" v-model="item.status"> {{ item.nama_kurir }} </vs-checkbox>
        </div>

        <vs-button success block @click="updateKurir" class=""> Simpan </vs-button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  data(){
    return{
      data: []
    }
  },

  methods: {
    updateKurir() {
      this.loading = false;

      var formData = new FormData();

      this.data.forEach(element => {
        formData.append(element.id, element.status);
      });

      return new Promise((resolve, reject) => {
        axios
          .post("updateKurir", formData, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization:
                "Bearer " + localStorage.getItem("admin_access_token"),
            },
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Berhasil",
              response.data.message
            );

            this.getData();
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Gagal",
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },

    getData() {
      this.loading = true;

      axios
        .get("dataKurir", {
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

    hapusPromo(id) {
      this.loading = true;

      axios
        .get("hapusPromo/" + id, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.openNotification(
            6000,
            "top-right",
            "success",
            "Berhasil",
            response.data.message
          );

          this.getData();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.getData();
  },
}
</script>