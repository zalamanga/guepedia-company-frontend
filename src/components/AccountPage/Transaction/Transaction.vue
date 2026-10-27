<template>
  <div class="chart-area mb-5">
    <div class="chart-title">
      <h4 class="fw-bold">Daftar Transaksi Saya</h4>
      <hr class="price-line" />

      <div
        class="transaction-area"
        v-for="item in transactions"
        :key="item.id_penjualan_toko"
      >
        <div class="transaction-item rounded-3 shadow p-3 bg-white mb-3">
          <div class="transaction-header">
            <span>Tanggal Transaksi : </span
            ><span class="fw-bold">{{ item.tanggal_terima }}</span> •
            <span class="text-uppercase">{{
              item.invoices_toko
            }}</span>
            •
            <span
              class="badge bg-primary text-uppercase"
              v-if="item.status == 'pending'"
              >{{ item.status }}</span
            >
            <span
              class="badge bg-success text-uppercase"
              v-else-if="item.status == 'terima'"
              >{{ item.status }}</span
            >
            <span
              class="badge bg-secondary text-uppercase"
              v-else-if="item.status == 'proses'"
              >{{ item.status }}</span
            >
            <span
              class="badge bg-warning text-uppercase text-dark"
              v-else-if="item.status == 'expired'"
              >{{ item.status }}</span
            >
            <span
              class="badge bg-danger text-uppercase"
              v-else-if="item.status == 'tolak'"
              >{{ item.status }}</span
            >
          </div>
          <hr />
          <div class="row align-items-center">
            <div class="col-4 col-sm-4 col-md-1 col-lg-1">
              <img
                :src="
                  'https://assets.guepedia.com/file_cover/' +
                  item.item[0].product.file_cover
                "
                rounded
                width="100%"
              />
            </div>
            <div class="col-8 col-sm-8 col-md-8 col-lg-8">
              <b>{{ item.item[0].product.judul }}</b>
              <span v-if="item.other_item > 0"
                >& {{ item.other_item }} Barang Lainnya</span
              >
            </div>
            <div class="col-md-3 col-lg-3">
              <div class="total-title">Total Bayar</div>
              <div class="total-value fw-bold">
                <span v-if="item.saldo_deposit !=0">{{ item.total_bayar -  item.saldo_deposit| currency }}</span>
                <span v-else>{{ item.total_bayar | currency }}</span>
              </div>
            </div>
          </div>
          <hr />
          <div class="transaction-action text-end">
            <button
              type="button"
              class="btn btn-light me-2"
              v-if="
                item.status == 'terima' ||
                item.status == 'pending' ||
                item.status == 'proses'
              "
              @click="generateInvoice(item.id_penjualan_toko)"
            >
              Download Invoice
            </button>
            <button
              class="btn btn-outline-success"
              v-if="item.status == 'pending'"
              @click="transferForm(item.invoices_toko)"
              :disabled="loadingInvoice"
            >
              Upload Bukti Transfer
            </button>
            <button class="btn btn-info ms-2" v-if="item.nomor_resi">
              Lacak Pesanan
            </button>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      ref="transferModal"
      title="Upload Bukti Transer"
      hide-footer
      hide-header-close
      hide-header
      centered
    >
      <div class="cart-title">Upload Bukti Transfer</div>
      <hr class="price-line" />
      <form @submit.prevent="uploadBukti">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="mb-3">
              <div class="form-label">
                Nomor Invoice :
                <strong style="text-transform: uppercase">{{
                  form.invoice
                }}</strong>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-lg-12">
            <div class="mb-3">
              <label for="registerPena" class="form-label"
                >Nomor Rekening Pengirim</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.nomor_rekening"
                required
              />
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <div class="mb-2">
              <label for="registerPena" class="form-label">Bank Pengirim</label>
              <input
                type="text"
                class="form-control"
                v-model="form.bank_pengirim"
                required
              />
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <div class="mb-2">
              <label for="registerPena" class="form-label"
                >Nama Pemilik Rekening</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.pemilik_rekening"
                required
              />
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <label for="registerPena" class="form-label"
              >Jumlah Nominal Transfer</label
            >
            <div class="input-group mb-2">
              <span class="input-group-text" id="basic-addon1">Rp</span>
              <input
                type="number"
                class="form-control"
                v-model="form.nominal"
                required
              />

              <p class="helper-text">
                <i class="bi bi-info-circle-fill"></i> Nominal transfer tanpa tanda titik
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-6">
            <div class="mb-2">
              <label for="registerPena" class="form-label"
                >Bukti Transfer</label
              >
              <input
                type="file"
                class="form-control"
                id="receipt"
                v-on:change="receiptChange()"
                required
                accept="image/png, image/jpeg"
              />
            </div>
          </div>

          <div class="d-grid gap-2 col-12 mx-auto mt-4 login-btn">
            <button
              class="btn btn-primary border-0"
              type="submit"
              :disabled="sending"
            >
              <span v-if="!sending">Kirim Bukti Transfer</span>
              <b-spinner
                variant="light"
                small
                label="Spinning"
                v-if="sending"
              ></b-spinner>
            </button>
          </div>
        </div>
      </form>
    </b-modal>

    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :filename="'Invoice Penjualan ' + data.nama_penerima"
      :pdf-quality="2"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      :paginate-elements-by-height="1100"
      ref="invoicePDF"
    >
      <section
        slot="pdf-content"
        class="d-flex"
        style="align-items: center; justify-content: center"
      >
        <div id="invoice" class="invoice-header p-3 m-2">
          <div class="row">
            <div class="col-md-6 col-lg-6 mb-3">
              <img src="@/assets/image/logo.png" width="150px"
                alt="Guepedia Logo"
              />
              <div class="invoice-detail mt-3">
                <div class="invoice-detail-item mb-2">
                  Nomor Invoice : <span>{{ data.invoices_toko }}</span>
                </div>
                <div class="invoice-detail-item">
                  Tanggal Transaksi : <span>{{ data.tanggal_terima }}</span>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-6 mb-3">
              <div class="receiver-detail">
                <div class="cart-title">Detail Penerima</div>
                <hr class="price-line" />
                <div class="invoice-detail-item mb-2">
                  <span
                    >{{ data.nama_penerima }} ({{ data.nomor_kontak }})</span
                  >
                </div>
                <div><strong>Alamat :</strong></div>
                <div>
                  {{ data.alamat_lengkap }} Kode Pos : {{ data.kode_pos }}<br />
                  [Kecamatan : {{ data.nama_kecamatan }} Kabupaten / Kota :
                  {{ data.nama_kota }} Provinsi : {{ data.nama_provinsi }}]
                </div>
              </div>
            </div>

            <div class="col-md-12 col-lg-12 mb-3">
              <div class="receiver-detail">
                <div class="cart-title">Daftar Belanja</div>
                <hr class="price-line" />

                <div class="product-table">
                  <table class="table">
                    <thead class="table-dark">
                      <tr>
                        <th scope="col">Nama Produk</th>
                        <th scope="col">Harga Barang</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Sub Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="product in data.item"
                        :key="product.id_file_naskah"
                      >
                        <th scope="row">{{ product.nama_buku }}</th>
                        <td>{{ product.harga_buku | currency }}</td>
                        <td>{{ product.qty }}</td>
                        <td class="text-end">
                          {{ (product.qty * product.harga_buku) | currency }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-end">
            <div class="col-md-6 col-lg-6">
              <div class="row">
                <div class="col-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                  <strong>Sub Total Belanja</strong>
                </div>
                <div class="col-6 col-sm-6 col-md-6 col-lg-6 mb-2 text-end">
                  <strong>{{ data.total_belanja | currency }}</strong>
                </div>

                <!-- Jika Pakai Promo -->
                <div
                  class="col-6 col-sm-6 col-md-6 col-lg-6 mb-2"
                  v-if="data.hasil_promo"
                >
                  <strong style="color: red"
                    >Diskon {{ data.nama_promo }} ({{
                      data.nilai_promo
                    }}%)</strong
                  >
                </div>
                <div
                  class="col-6 col-sm-6 col-md-6 col-lg-6 mb-2 text-end"
                  v-if="data.hasil_promo"
                >
                  <span style="color: red">{{
                    data.hasil_promo | currency
                  }}</span>
                </div>

                <!-- Jika Pakai Kupon -->
                <div
                  class="col-6 col-sm-6 col-md-6 col-lg-6 mb-2"
                  v-if="data.hasil_kupon"
                >
                  <strong style="color: red"
                    >Diskon {{ data.nama_kupon }} ({{
                      data.nilai_kupon
                    }}%)</strong
                  >
                </div>
                <div
                  class="col-6 col-sm-6 col-md-6 col-lg-6 mb-2 text-end"
                  v-if="data.hasil_kupon"
                >
                  <span style="color: red">{{
                    data.hasil_kupon | currency
                  }}</span>
                </div>

                <div class="col-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                  Ongkir {{ data.kurir }} {{ data.service }}
                </div>
                <div class="col-6 col-sm-6 col-md-6 col-lg-6 mb-2 text-end">
                  <strong style="color: red" v-if="data.ongkir == 0"
                    >Free Ongkir
                  </strong>
                  <span v-else>{{ data.ongkir | currency }}</span>
                </div>

                <hr />
              </div>
              <div class="row invoice-total py-3 shadow">
                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                  <strong>Total Pembayaran</strong>
                </div>
                <div class="col-6 col-sm-6 col-md-6 col-lg-6 text-end">
                  <strong>{{ data.total_bayar | currency }}</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="stamp-item">
            <span class="stamp is-approved" v-if="data.status == 'terima'"
              >Lunas</span
            >
            <span
              class="stamp not-approved"
              v-else-if="data.status == 'pending'"
              >Belum Terbayar</span
            >
            <span class="stamp is-approved" v-else-if="data.status == 'proses'"
              >Verifikasi</span
            >
          </div>
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import axios from "axios";
import VueHtml2pdf from "vue-html2pdf";
export default {
  props: {},
  components: {
    VueHtml2pdf,
  },
  data: () => ({
    transactions: [],

    data: [],
    loadingInvoice: false,

    form: {
      invoice: "",
      nomor_rekening: "",
      bank_pengirim: "",
      pemilik_rekening: "",
      nominal: "",
      receipt: null,
    },

    sending: false,
  }),
  methods: {
    receiptChange() {
      this.form.receipt = document.getElementById("receipt").files[0];
      console.log(this.form.receipt);
    },
    getTransaction() {
      this.loading = true;
      axios
        .get("myTransaction", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.transactions = response.data.data.transaction;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    generateInvoice(id) {
      this.loadingInvoice = true;
      axios
        .get("invoice/" + id, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data = response.data.data.order;
          console.log(this.data);
          this.$refs.invoicePDF.generatePdf();
          this.loadingInvoice = false;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loadingInvoice = false));
    },

    transferForm(invoices) {
      this.$refs["transferModal"].show();
      this.form.invoice = invoices;
    },

    uploadBukti(e) {
      this.sending = true;
      var formData = new FormData(e.target);
      formData.append("bukti_transfer", this.form.receipt);
      formData.append("invoice", this.form.invoice);
      formData.append("nomor_rekening", this.form.nomor_rekening);
      formData.append("bank_pengirim", this.form.bank_pengirim);
      formData.append("pemilik_rekening", this.form.pemilik_rekening);
      formData.append("nominal", this.form.nominal);

      return new Promise((resolve, reject) => {
        axios
          .post("uploadBuktiTransfer", formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
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
            this.$refs["transferModal"].hide();
            this.getTransaction();

            this.form.invoice = "";
            this.form.nomor_rekening = "";
            this.form.bank_pengirim = "";
            this.form.pemilik_rekening = "";
            this.form.nominal = "";
            this.form.receipt = null;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              error.response.data.message
            );
            this.sending = false;
          });
      });
    },
  },
  mounted() {
    this.getTransaction();
  },
};
</script>

<style>
.transaction-header,
.total-title {
  font-size: 0.9em;
}
.transaction-action button {
  font-size: 0.8em;
}

#invoice {
  font-size: 1em;
}
.invoice-detail-item span {
  font-weight: bold;
  text-transform: uppercase;
}
.invoice-total {
  border-radius: 10px;
  background: yellowgreen;
  color: #fff;
}

/* Stamp */
.stamp-item {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.stamp {
  transform: rotate(12deg);
  color: #555;
  font-weight: 700;
  border: 0.25rem solid #555;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  border-radius: 1rem;
  mix-blend-mode: multiply;
  opacity: 0.3;
}

.is-approved {
  color: #0a9928;
  font-size: 7rem;
  border: 0.5rem solid #0a9928;
  -webkit-mask-position: 13rem 6rem;
  transform: rotate(-14deg);
  border-radius: 0;
}
.not-approved {
  color: #d31818;
  font-size: 4rem;
  border: 0.5rem solid #d31818;
  -webkit-mask-position: 13rem 6rem;
  transform: rotate(-14deg);
  border-radius: 0;
}
</style>
