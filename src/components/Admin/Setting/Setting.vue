<template>
  <div id="setting-page">
    <div class="row setting-row">
      <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
        <div class="card card-small blog-comments">
          <div class="card-header border-bottom">
            <form @submit.prevent="updateTerbitGratis">
              <div class="d-flex justify-content-center align-items-center">
                <h6 class="m-0">TERBIT GRATIS</h6>

                <vs-input type="date" class="ms-auto" v-model="terbitGratis" />
                <vs-button success type="submit">
                  Simpan Tanggal Terbit Gratis
                </vs-button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-2 col-md-2 col-sm-12 mb-4">
        <kurir></kurir>
      </div>

      <div class="col-lg-5 col-md-5 col-sm-12 mb-4">
        <banner></banner>
      </div>

      <div class="col-lg-5 col-md-5 col-sm-12 mb-4">
        <promo></promo>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
        <kupon></kupon>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
        <PopUp></PopUp>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

import Banner from "./Banner.vue";
import Promo from "./Promo.vue";
import Kurir from "./Kurir.vue";
import Kupon from "./Kupon.vue";
import PopUp from "./PopUp.vue";
export default {
  components: {
    Banner,
    Promo,
    Kurir,
    Kupon,
    PopUp,
  },
  data() {
    return {
      terbitGratis: "",
    };
  },
  methods: {
    getTerbitGratis() {
      this.loading = true;

      axios
        .get("getTerbitGratis", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.terbitGratis = response.data.data.data.value;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    updateTerbitGratis() {
      this.loading = false;

      var formData = new FormData();
      formData.append("value", this.terbitGratis);

      return new Promise((resolve, reject) => {
        axios
          .post("setTerbitGratis", formData, {
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
  },

  mounted() {
    this.getTerbitGratis();
  },
};
</script>
