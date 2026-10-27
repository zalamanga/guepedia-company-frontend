<template>
  <div id="info-user">
    <div class="card card-small mb-4 pt-3">
      <div class="card-header border-bottom">
        <h5>Royalti Penulis</h5>
      </div>
      <div class="row p-3">
        <div class="col-md-4">
          <div class="stat-item shadow p-3">
            <div class="row align-items-center">
              <div class="col-md-2"><i class="bi bi-cash"></i></div>
              <div class="col-md-10">
                <div class="stat-description text-end">
                  <div class="stat-title">Saldo Royalti</div>
                  <div class="stat-value fw-bold">
                    {{ data.saldo | currency }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="stat-item shadow p-3">
            <div class="row align-items-center">
              <div class="col-md-2"><i class="bi bi-cash-stack"></i></div>
              <div class="col-md-10">
                <div class="stat-description text-end">
                  <div class="stat-title">Total Royalti</div>
                  <div class="stat-value fw-bold">
                    {{ data.total | currency }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="stat-item shadow p-3">
            <div class="row align-items-center">
              <div class="col-md-2"><i class="bi bi-cash-coin"></i></div>
              <div class="col-md-10">
                <div class="stat-description text-end">
                  <div class="stat-title">Total Naskah</div>
                  <div class="stat-value fw-bold">{{ data.naskah }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-3">
        <form @submit.prevent="updateRoyalti">
          <div class="input-group mb-3">
            <span class="input-group-text bg-warning">Update Saldo Royalti</span>
            <span class="input-group-text bg-secondary text-light">Rp.</span>
            <input
              type="number"
              class="form-control"
              placeholder="Saldo Royalti"
              v-model="form.royalti"
              required
            />
            <button class="btn btn-success" type="submit" id="button-addon2">
              Simpan Saldo Royalti
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      form:{
          royalti: null
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      var id = this.$route.params.id;
      axios
        .get("userStat/" + id, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    updateRoyalti(){
      this.loading = false;
        var id = this.$route.params.id;
      var formData = new FormData();
      formData.append('royalti', this.form.royalti);

      return new Promise((resolve, reject) => {
        axios
          .post("updateRoyalti/"+id, formData ,{
            headers: {
              "Content-Type": "application/json",
              'Accept': "application/json",
              Authorization: "Bearer " + localStorage.getItem("admin_access_token"),
            },
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              'Berhasil',
              response.data.message
            );

            this.getData()
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Gagal',
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    }
  },
};
</script>
