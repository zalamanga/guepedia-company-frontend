<template>
  <div class="chart-area mt-5">
    <div class="chart-title">
      <h4 class="fw-bold">Riwayat Penarikan Royalti</h4>
      <hr class="price-line" />
      <div class="text-end login-btn">
        <button class="btn" v-b-modal.royaltyModal>
          Ajukan Penarikan Royalti
        </button>
      </div>

      <div class="table-area p-3 shadow">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">Nomor Penarikan</th>
              <th scope="col">Jumlah</th>
              <th scope="col">Biaya Admin</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Info</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in datas" :key="item.id_data_pengajuan">
              <td>{{ item.nomor_penarikan }}</td>
              <td>{{ item.royalti_ditarik | currency}}</td>
              <td>{{ item.biaya_admin | currency}}</td>
              <td>{{ item.jumlah_penarikan | currency}}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.alasan }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal
      id="royaltyModal"
      hide-header-close
      hide-footer
      centered
      title="Ajukan Penarikan Royalti"
    >
      <form @submit.prevent="tarikRoyalti">
        <div class="row">
          <div class="col-md-8 col-lg-8">
            <div class="mb-3">
              <label for="royaltyAmount" class="form-label"
                >Jumlah Penarikan</label
              >
              <div class="input-group">
                <span class="input-group-text fw-bold">Rp.</span>
                <input type="number" class="form-control" id="royaltyAmount" v-model="form.amount"/>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-lg-4">
            <div class="mb-3">
              <label for="royaltyTax" class="form-label">Biaya Admin</label>
              <div class="input-group">
                <span class="input-group-text fw-bold w-100">{{form.tax | currency}}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="helper-text">
          <i class="bi bi-info-circle-fill"></i> Selain bank BCA (Bank Central
          Asia) akan dikenakan biaya transfer sebesar Rp. 6,500
        </p>

        <div class="mb-3">
          <div class="login-btn">
            <button type="submit" class="btn btn-sm">Tarik Royalti Sekarang</button>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    datas: [],
    check: [],
    form: {
      amount: '',
      tax: ''
    }
  }),
  methods: {
    getData() {
      axios
        .get("royaltyData", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.datas = response.data.data.data;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    checkData() {
      axios
        .get("checkBankAccount", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.check = response.data.data.data;

          if (this.check.id_bank != 1) {
            this.form.tax = 6500
          } else {
            this.form.tax = 0
          }
          console.log(response);
        })
        .catch((error) => {
          this.openNotification(
            6000,
            "top-right",
            "danger",
            "Failed",
            error.response.data.message
          );
          reject(error);
          this.loading = false;
        })
        .finally(() => (this.loading = false));
    },

    tarikRoyalti(){
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post("tarikRoyalti", {
            amount: this.form.amount,
            tax: this.form.tax,
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              'Success',
              response.data.message
            );

            this.form.amount = ''
            this.$router.go()
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Failed',
              error.response.data.message
            );
            this.form.amount = ''
            reject(error);
            this.loading = false;
          });
      });
    }
  },
  mounted() {
    this.getData();
    this.checkData();
  },
};
</script>

<style>
table {
  font-size: 0.9em;
}
.helper-text {
  font-size: 0.7em;
  color: red;
}
</style>