<template>
  <div class="chart-area mt-5">
    <div class="chart-title">
      <h4 class="fw-bold">Daftar Pengajuan Hak Cipta <span style="text-transform: capitalize">{{$route.params.status}}</span></h4>
      <hr class="price-line" />

      <router-link :to="{name: 'daftar-haki'}" class="btn btn-sm btn-success text-light mt-3">
        Daftar Hak Cipta
      </router-link>

      <div class="table-area p-3 shadow">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">Tanggal Pengajuan</th>
              <th scope="col">Judul Naskah</th>
              <th scope="col">Status</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in datas" :key="data.id">
              <td>{{ data.date }}</td>
              <td>{{ data.naskah.judul }}</td>
              <td>
                <b-badge v-if="data.status == 0" variant="primary">Menunggu Pembayaran</b-badge>
                <b-badge v-else-if="data.status == 1" variant="secondary">Menunggu Konfirmasi</b-badge>
                <b-badge v-else-if="data.status == 2" variant="info">Proses Pembayaran</b-badge>
                <b-badge v-else-if="data.status == 3" variant="success">Hak Cipta Terbit</b-badge>
                <b-badge v-else-if="data.status == 4" variant="danger">Pendaftaran Gagal</b-badge>
              </td>
              <td>
                <button class="btn btn-sm btn-warning" v-if="data.status == 0" @click="showReviewModal(data.naskah.judul, data.id)">Upload Bukti Transfer</button>
                <router-link :to="{name: 'Page', params:{id: data.id_file_naskah}}" class="btn btn-sm btn-info text-dark ms-2" v-if="data.status == 3">Download Sertifikat</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal ref="reviewModal" :title="'Bukti Pembayaran Hak Cipta \n'+review.judul" hide-header-close hide-footer>
      <b-form @submit.prevent="bayarHaki">
        <label for="exampleInputEmail1" class="form-label"
          >Bukti Transfer Pembayaran</label
        >
        <input
          type="file"
          class="form-control"
          id="bukti"
          v-on:change="BuktiChange()"
          required
        />
        <p class="helper-text">
          <i class="bi bi-info-circle-fill"></i> Biaya pendaftaran HAK CIPTA adalah sebesar Rp. 580,000 .
            <br>transfer ke rekening BCA a/n : Dianata Eka Putra 740 1486 074
        </p>

        <b-button class="mt-3" variant="success" type="submit" :disabled="loading">Kirim Bukti</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    datas: [],

    review: {
      id: '',
      judul: '',
      bukti: null
    },
    loading: false
  }),
  methods: {
    BuktiChange() {
      this.review.bukti = document.getElementById("bukti").files[0];
    },
    showReviewModal(judul, id){
      this.$refs['reviewModal'].show();

      this.review.id = id;
      this.review.judul = judul;
    },

    bayarHaki(e) {
      this.loading = true;

      var formData = new FormData(e.target);
      formData.append('id', this.review.id);
      formData.append('bukti', this.review.bukti);

      return new Promise((resolve, reject) => {
        axios
          .post("haki/bayar", formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            this.$refs['reviewModal'].hide();
            this.getData();
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );

            this.loading = false;
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
          });
      });
    },

    getData() {
      this.loading = true;

      axios
        .get("haki/user", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        })
        .then((response) => {
          this.datas = response.data.data.data;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.getData();
  },
  watch:{
    $route (){
      this.getData();
    }
  } 
};
</script>

<style>
table{
  font-size: 0.9em;
}
</style>