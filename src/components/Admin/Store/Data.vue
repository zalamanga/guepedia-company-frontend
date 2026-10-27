<template>
  <div id="order" class="mt-3">
    <div class="row mb-3">
      <div class="col-md-8">
        <h4 class="page-title">Data Pesanan</h4>
        <hr class="price-line">
      </div>

      <div class="col-md-4">
        <form @submit.prevent="getData">
        <div class="input-group me-auto">
          <input type="text" class="form-control" placeholder="Cari Nama Atau Nomor Telepon" v-model="search">
          <button class="btn btn-warning text-dark" type="submit"><b-icon icon="search"></b-icon></button>
        </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div
        class="col-lg-12 col-sm-12 mb-4"
        v-for="d in data"
        :key="d.id_data_penjualan"
      >
        <div class="card card-small card-post card-post--aside card-post--1">
          <div class="row">
            <div class="col-md-3">
              <div class="card-post__image">
                <b-img-lazy
                  v-bind="mainProps"
                  :src="
                    'https://www.guepedia.com/uploads/bukti_bayar/' +
                    d.bukti_transfer
                  "
                  class="w-100"
                  v-if="d.bukti_transfer"
                ></b-img-lazy>

                <img v-else src="@/assets/image/no-image.png" class="w-100" />
                <a
                  v-if="d.metode_pembayaran == 'Bank Transfer'"
                  href="#"
                  class="card-post__category badge badge-pill badge-info"
                  >{{ d.metode_pembayaran }}</a
                >
                <a
                  v-else
                  href="#"
                  class="card-post__category badge badge-pill badge-warning"
                  >{{ d.metode_pembayaran }}</a
                >
              </div>
            </div>

            <div class="col-md-9">
              <div class="pt-3">
                <span class="badge badge-pill badge-info" v-if="d.status == 'pending'">Order Baru</span>
                <span class="badge badge-pill badge-warning text-dark" v-if="d.status == 'proses'">Order Terbayar</span>
                <span class="badge badge-pill badge-secondary" v-if="d.status == 'terima'">Order Diproses</span>
                <span class="badge badge-pill badge-success" v-if="d.status == 'selesai'">Order Selesai</span>
                <span class="badge badge-pill badge-danger" v-if="d.status == 'tolak'">Order Ditolak</span>
                <span class="badge badge-pill badge-dark" v-if="d.status == 'expired'">Order Expired</span>
                <h5 class="card-title">
                  <a class="text-fiord-blue" href="#"
                    >{{ d.nama_penerima }} ({{ d.nomor_kontak }})</a
                  >
                </h5>
                <p class="card-text d-inline-block mb-3">
                  {{ d.alamat_lengkap }} <br />
                  [Kecamatan {{ d.nama_kecamatan }} {{ d.nama_kota }} Provinsi
                  {{ d.nama_provinsi }} {{ d.kode_pos }}]
                </p>
                <!-- <span class="text-muted">29 February 2019</span> -->
              </div>

              <div class="table-data mt-2 pe-4">
                <div class="card card-small mb-4">
                  <div class="card-header border-bottom text-center">
                    <h6 class="m-0 text-uppercase">{{ d.invoices_toko }}</h6>
                  </div>
                  <div class="p-0 pb-3 text-center">
                    <table class="table mb-0">
                      <thead class="bg-light">
                        <tr>
                          <th scope="col" class="border-0">#</th>
                          <th scope="col" class="border-0">Nama Buku</th>
                          <th scope="col" class="border-0">Harga</th>
                          <th scope="col" class="border-0">Qty</th>
                          <th scope="col" class="border-0">Jumlah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in d.item" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td class="text-start">{{ item.nama_buku }}</td>
                          <td>{{ item.harga_buku | currency }}</td>
                          <td>{{ item.qty }}</td>
                          <td class="text-end">
                            {{ (item.harga_buku * item.qty) | currency }}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" class="text-end">Total Belanja</td>
                          <td class="text-end">
                            {{ d.total_belanja | currency }}
                          </td>
                        </tr>
                        <tr
                          style="color: red"
                          v-if="d.nilai_kupon || d.nilai_promo"
                        >
                          <td colspan="4" class="text-end" v-if="d.nama_kupon">
                            Kupon {{ d.nama_kupon }}
                          </td>
                          <td colspan="4" class="text-end" v-if="d.nama_promo">
                            Promo {{ d.nama_promo }}
                          </td>
                          <td class="text-end" v-if="d.hasil_kupon">
                            {{ d.hasil_kupon | currency }}
                          </td>
                          <td class="text-end" v-if="d.hasil_promo">
                            {{ d.hasil_promo | currency }}
                          </td>
                        </tr>
                        <tr style="color: red" v-if="d.saldo_deposit">
                          <td colspan="4" class="text-end">
                            Saldo Deposit Reseller
                          </td>
                          <td class="text-end">{{ d.saldo_deposit | currency }}</td>
                        </tr>
                        <tr>
                          <td colspan="4" class="text-end">
                            Ongkir {{ d.kurir }} {{ d.service }}
                          </td>
                          <td class="text-end">{{ d.ongkir | currency }}</td>
                        </tr>
                        <tr>
                          <td colspan="4" class="text-end">Total Bayar</td>
                          <td class="text-end fw-bold">
                            <span v-if="d.saldo_deposit == 0 | d.saldo_deposit == null">{{ d.total_bayar | currency }}</span>
                            <span v-else>{{ d.total_bayar - d.saldo_deposit | currency }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="me-4 card text-center fw-bold" v-if="d.bukti_transfer">
                <div class="card-header">
                  {{d.nama_pemilik_rekening}} - {{d.nomor_rekening_pengirim}} - {{d.nama_bank}} - {{d.nilai_transfer | currency}}
                </div>
              </div>

              <div class="action-btn text-end m-4" v-if="d.status == 'pending' || d.status == 'proses' || d.status == 'expired'">
                <button class="btn btn-danger me-3" type="button" @click="deleteAction(d.id_penjualan_toko, 'tolak')">
                  <span class="text-uppercase page-subtitle fw-bold"
                    >Tolak Pesanan</span
                  >
                </button>
                <button class="btn btn-success" type="button" @click="storeAction(d.id_penjualan_toko, 'terima')">
                  <span class="text-uppercase page-subtitle fw-bold"
                    >Terima Pesanan</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal title="Input Alasan Penolakan" ref="tolakModal" hide-header hide-footer hide-header-close centered>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Alasan Penolakan</label>
        <textarea
          rows="4"
          class="form-control"
          v-model="form.alasan"
        />
      </div>

      <button class="btn btn-danger me-3" type="button" @click="storeAction(form.id, 'tolak')">
        <span class="text-uppercase page-subtitle fw-bold"
          >Tolak Pesanan</span
        >
      </button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],

      search: '',

      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        width: "100%",
      },

      form:{
        id: "",
        alasan: ""
      }
    };
  },
  methods: {
    deleteAction(id){
      this.form.id = id;
      this.$refs['tolakModal'].show();
    },
    storeAction(id, action) {
      this.loading = true;
      var formData = new FormData();
      formData.append("id_penjualan_toko", id);
      formData.append("status", action);
      formData.append("alasan", this.form.alasan);

      return new Promise((resolve, reject) => {
        axios
          .post("storeAction", formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "multipart/form-data",
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
              "Success",
              response.data.message
            );
            this.$refs['tolakModal'].hide();
            this.form.alasan = "";
            this.getData();
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              error.response.data.message
            );
            this.loading = false;
          });
      });
    },

    getData() {
      this.loading = true;

      var status = this.$route.params.status;
      if (status) {
        var url = "orderData/" + status + "?keyword=" + this.search;
      } else {
        var url = "orderData?keyword=" + this.search;
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
  mounted() {
    this.getData();
  },
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>
