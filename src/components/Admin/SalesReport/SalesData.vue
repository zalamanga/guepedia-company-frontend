<template>
  <div class="center">

    <form @submit.prevent="getData">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Cari Nama Pemesan Atau Nomor Telepon" v-model="search" @input="getData">
        <button class="btn btn-warning text-dark" type="submit"><b-icon icon="search"></b-icon></button>
      </div>
    </form>

    <vs-table striped>
      <template #thead>
        <vs-tr>
          <vs-th> Nomor Invoice </vs-th>
          <vs-th> Nama Customer </vs-th>
          <vs-th> Tanggal Transaksi </vs-th>
          <vs-th> Status Penjualan </vs-th>
          <vs-th> Nomor Resi </vs-th>
          <vs-th> Platform </vs-th>
          <vs-th> Ongkir </vs-th>
          <vs-th> Ongkir Real </vs-th>
          <vs-th> Selisih Ongkir </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getPage(data, page, max)"
          :data="tr"
        >
          <vs-td>
            {{ tr.no_invoices }}
          </vs-td>
          <vs-td style="width: 30%">
            {{ tr.nama_customer }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.tanggal_transaksi }}
          </vs-td>
          <vs-td>
            <span
              class="badge bg-primary"
              v-if="tr.status_penjualan == 'Terima'"
              >{{ tr.status_penjualan }}</span
            >
            <span
              class="badge bg-danger"
              v-else-if="tr.status_penjualan == 'Proses'"
              >{{ tr.status_penjualan }}</span
            >
            <span
              class="badge bg-secondary text-light"
              v-else-if="tr.status_penjualan == 'Siap Cetak'"
              >{{ tr.status_penjualan }}</span
            >
            <span
              class="badge bg-warning text-dark"
              v-else-if="tr.status_penjualan == 'Cetak'"
              >{{ tr.status_penjualan }}</span
            >
            <span
              class="badge bg-dark"
              v-else-if="tr.status_penjualan == 'Proses Kirim'"
            >
              {{ tr.status_penjualan }}</span
            >
            <span
              class="badge bg-danger"
              v-else-if="tr.status_penjualan == 'Retur'"
            >
              {{ tr.status_penjualan }}
            </span>
            <span
              class="badge bg-success text-light"
              v-else-if="tr.status_penjualan == 'Kirim'"
              >Terkirim</span
            >
          </vs-td>
          <vs-td>{{ tr.resi_pengiriman }}</vs-td>
          <vs-td>
            {{ tr.penjualan }}
          </vs-td>
          <vs-td>
            {{ tr.jumlah_biaya_lain | currency }}
          </vs-td>
          <vs-td>
            {{ tr.ongkir_real | currency }}
          </vs-td>
          <vs-td>
            <span class="badge badge-primary" v-if="tr.selisih_ongkir > 0">{{
              tr.selisih_ongkir | currency
            }}</span>
            <span
              class="badge badge-danger"
              v-else-if="tr.selisih_ongkir < 0"
              >{{ tr.selisih_ongkir | currency }}</span
            >
            <span class="badge badge-success" v-else>OKE</span>
          </vs-td>

          <template #expand>
            <div class="con-content bg-dark">
              <div class="d-flex">
                <vs-button
                  @click="setStatus(tr.id_data_penjualan, tr.nama_customer)"
                  primary
                >
                  Ubah Status Penjualan
                </vs-button>
                <vs-button
                  warn
                  @click="
                    showDetailModal(tr.id_data_penjualan, tr.nama_customer)
                  "
                >
                  Lihat Detail Penjualan
                </vs-button>
                <vs-button
                  @click="
                    showNoteModal(
                      tr.id_data_penjualan,
                      tr.nama_customer,
                      tr.catatan
                    )
                  "
                  danger
                >
                  <span v-if="!tr.catatan">Tambahkan Catatan</span>
                  <span v-else>Ubah Catatan</span>
                </vs-button>
                <vs-button
                  @click="
                    showLabelModal(tr.id_data_penjualan, tr.nama_customer)
                  "
                  class="ms-auto"
                  success
                >
                  Cetak Label
                </vs-button>
              </div>
            </div>
          </template>
        </vs-tr>
      </template>

      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(data, max)" />
      </template>
    </vs-table>

    <b-modal
      ref="statusModal"
      :title="'Ubah Status Penjualan ' + form.customer"
      hide-footer
      hide-header-close
      centered
    >
      <form @submit.prevent="updateStatus">
        <div class="mb-2">
          <label for="exampleInputEmail1" class="form-label"
            >Pilih Status</label
          >
          <select class="form-control" v-model="form.status" required>
            <option value="Proses">Proses</option>
            <option value="Siap Cetak">Siap Cetak</option>
            <option value="Cetak">Cetak</option>
            <option value="Proses Kirim">Proses Kirim</option>
            <option value="Retur">Retur</option>
            <option value="Kirim">Kirim</option>
            <option value="Terima">Terima</option>
          </select>
        </div>
        <hr />

        <div class="mb-2" v-if="form.status == 'Proses'">
          <label for="exampleInputEmail1" class="form-label"
            >Pilih Editor</label
          >
          <select
            class="form-control"
            v-model="form.editor"
            :required="form.status == 'Proses'"
          >
            <option value="Lusi">Lusi</option>
            <option value="Bernika">Bernika</option>
            <option value="Agil">Agil</option>
          </select>
        </div>

        <div class="row" v-if="form.status == 'Kirim'">
          <div class="col-md-6">
            <div class="mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Nomor Resi</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.resi"
                :required="form.status == 'Kirim'"
              />
            </div>
          </div>
          <div class="col-md-6">
            <label for="exampleInputEmail1" class="form-label"
              >Ongkir Real</label
            >
            <div class="input-group mb-2">
              <span class="input-group-text" id="basic-addon1">Rp.</span>
              <input
                type="text"
                class="form-control"
                v-model="form.ongkir"
                :required="form.status == 'Kirim'"
              />
            </div>
          </div>
        </div>

        <div class="mt-3">
          <vs-button success block :disabled="!form.status" type="submit"
            >Perbarui Status Penjualan</vs-button
          >
        </div>
      </form>
    </b-modal>

    <b-modal
      ref="noteModal"
      :title="'Tambahkan Catatan Penjualan ' + form.customer"
      hide-footer
      hide-header-close
      centered
    >
      <form @submit.prevent="addNote">
        <div class="mb-2">
          <label for="exampleInputEmail1" class="form-label"
            >Tambahkan Catatan Untuk Penjualan Ini</label
          >
          <textarea
            class="form-control"
            v-model="form.note"
            required
          ></textarea>
        </div>

        <div class="mt-3">
          <vs-button success block :disabled="!form.note" type="submit"
            >Tambahkan Catatan Penjualan</vs-button
          >
        </div>
      </form>
    </b-modal>

    <!-- <b-modal
      ref="labelModal"
      :title="'Label Penjualan ' + form.customer"
      size="lg"
      hide-footer
      hide-header-close
      centered
    >
      

      <vs-button block primary class="mt-3" @click="generateReport">Download Label</vs-button>
    </b-modal> -->

    <b-modal
      ref="detailModal"
      :title="'Detail Penjualan ' + form.customer"
      size="xl"
      hide-footer
      hide-header-close
      centered
    >
      <div class="label-area p-2" id="label">
        <div class="label-header">
          <div class="row align-items-center">
            <div class="col-md-8">
              <div class="label-logo">
                <img
                  src="https://www.guepedia.com/assets/img/logo-toko.png"
                  width="150px"
                />
                <br />
                <div
                  class="info-detail mt-2 px-2 badge badge-warning text-dark rounded"
                  v-if="detail.kode_booking"
                >
                  Kode Booking : <strong>{{ detail.kode_booking }}</strong>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="label-content mt-3">
                <div class="text-center">
                  <div class="fw-bold text-uppercase">detail Pengiriman</div>
                  <p class="text-uppercase">{{ detail.no_invoices }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-4">
              <span class="text-uppercase page-subtitle info-title"
                >Info Pengirim</span
              >
              <div class="fw-bold">GUEPEDIA</div>
              <div class="info-detail">+6281286421943</div>
              <div class="info-detail">
                Bukit Golf Arcadia Blok D4-14 , Bojong Nangka
              </div>
            </div>

            <div class="col-md-5 border-left">
              <span class="text-uppercase page-subtitle info-title"
                >Info Penerima</span
              >
              <div class="fw-bold text-uppercase">
                {{ detail.nama_customer }}
              </div>
              <div class="info-detail">{{ detail.nomor_kontak }}</div>
              <div class="info-detail">
                {{ detail.alamat_lengkap }}
              </div>
            </div>

            <div class="col-md-3 border-left text-center">
              <span class="text-uppercase page-subtitle info-title"
                >Info Pengiriman</span
              >
              <div class="fw-bold">{{ detail.nama_biaya_lain }}</div>
              <span class="badge badge-danger" v-if="detail.cashless == 1"
                >Cashless</span
              >
            </div>

            <div class="col-md-12 text-center mt-2" v-if="detail.catatan">
              <span class="info-title">
                <strong>Catatan Pengiriman : </strong>{{ detail.catatan }}
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div class="label-product">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> Judul Buku </vs-th>
                <vs-th> Penulis </vs-th>
                <vs-th> Harga </vs-th>
                <vs-th> QTY </vs-th>
                <vs-th> Jumlah </vs-th>
                <vs-th> Diskon </vs-th>
                <vs-th> Nilai Diskon </vs-th>
                <vs-th> Bagi Hasil </vs-th>
                <vs-th> Bersih </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr :key="i" v-for="(tr, i) in detail.product" :data="tr">
                <vs-td>
                  {{ tr.judul_buku }}
                </vs-td>
                <vs-td>
                  {{ tr.nama_penulis }}
                </vs-td>
                <vs-td>
                  {{ tr.harga | currency }}
                </vs-td>
                <vs-td>
                  {{ tr.qty }}
                </vs-td>
                <vs-td>
                  {{ tr.jumlah | currency }}
                </vs-td>
                <vs-td>
                  {{ tr.diskon }}
                </vs-td>
                <vs-td>
                  {{ tr.nilai_diskon | currency }}
                </vs-td>
                <vs-td>
                  {{ tr.royalti | currency }}
                </vs-td>
                <vs-td>
                  {{ tr.bersih | currency }}
                </vs-td>
              </vs-tr>
              <vs-tr class="fw-bold">
                <vs-td colspan="4" class="text-end">Sub Total</vs-td>
                <vs-td colspan="2">{{ detail.subtotal | currency }}</vs-td>
                <vs-td>{{ detail.jumlah_diskon | currency }}</vs-td>
                <vs-td>{{ detail.total_royalti | currency }}</vs-td>
                <vs-td>{{ detail.total_bersih | currency }}</vs-td>
              </vs-tr>
              
              <vs-tr class="fw-bold">
                <vs-td colspan="4" class="text-end"
                  >Ongkir {{ detail.nama_biaya_lain }}</vs-td
                >
                <vs-td colspan="2">{{
                  detail.jumlah_biaya_lain | currency
                }}</vs-td>
              </vs-tr>
              <vs-tr class="fw-bold">
                <vs-td colspan="4" class="text-end">Total Bayar</vs-td>
                <vs-td colspan="2">{{ detail.total | currency }}</vs-td>
              </vs-tr>
                   <vs-tr class="fw-bold bg-info text-white">
        <vs-td colspan="4" class="text-end">Pemasukan</vs-td>
        <vs-td colspan="5">{{ detail.pemasukan | currency }}</vs-td>
      </vs-tr>
            </template>
          </vs-table>

          <div class="row mt-3 bg-success text-light">
            <div class="col-md-4">
              Tanggal Print Label : {{ detail.tgl_label }}
            </div>
            <div class="col-md-4">Tanggal Cetak : {{ detail.tgl_print }}</div>
            <div class="col-md-4">
              Tanggal Kirim : {{ detail.proses_kirim }}
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :filename="'Label Penjualan ' + form.customer"
      :pdf-quality="2"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      :paginate-elements-by-height="1100"
      ref="labelPDF"
    >
      <section
        slot="pdf-content"
        class="d-flex"
        style="align-items: center; justify-content: center"
      >
        <div class="label-area p-3 m-5" id="label">
          <div class="label-header">
            <div class="row align-items-center">
              <div class="col-md-8">
                <div class="label-logo">
                  <img src="@/assets/image/logo.png" width="150px" />
                  <br />
                  <div
                    class="info-detail mt-2 px-2 badge badge-warning text-dark rounded"
                    v-if="label.kode_booking"
                  >
                    Kode Booking : <strong>{{ label.kode_booking }}</strong>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="label-content mt-3">
                  <div class="text-center">
                    <div class="fw-bold text-uppercase">Label Pengiriman</div>
                    <p class="text-uppercase">{{ label.no_invoices }}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-4">
                <span class="text-uppercase page-subtitle info-title"
                  >Info Pengirim</span
                >
                <div class="fw-bold">GUEPEDIA</div>
                <div class="info-detail">+6281286421943</div>
                <div class="info-detail">
                  Bukit Golf Arcadia Blok D4-14 , Bojong Nangka
                </div>
              </div>

              <div class="col-md-5 border-left">
                <span class="text-uppercase page-subtitle info-title"
                  >Info Penerima</span
                >
                <div class="fw-bold text-uppercase">
                  {{ label.nama_customer }}
                </div>
                <div class="info-detail">{{ label.nomor_kontak }}</div>
                <div class="info-detail">
                  {{ label.alamat_lengkap }}
                </div>
              </div>

              <div class="col-md-3 border-left text-center">
                <span class="text-uppercase page-subtitle info-title"
                  >Info Pengiriman</span
                >
                <div class="fw-bold">{{ label.nama_biaya_lain }}</div>
                <span class="badge badge-danger" v-if="label.cashless == 1"
                  >Cashless</span
                >
              </div>

              <div class="col-md-12 text-center mt-2" v-if="label.catatan">
                <span class="info-title">
                  <strong>Catatan Pengiriman : </strong>{{ label.catatan }}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div class="label-product">
            <h6>Item Pesanan</h6>
            <hr class="price-line" />

            <div class="item-list">
              <ul>
                <li v-for="item in label.product" :key="item">
                  <h6>
                    <strong>{{ item.qty }}</strong> x {{ item.judul_buku }} ({{
                      item.nama_penulis
                    }})
                  </h6>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div class="label-footer">
            <div class="label-note ms-auto text-center bg-danger rounded pt-1">
              <h6 class="text-light">
                Komplain akan dilayani jika disertakan video unboxing
              </h6>
            </div>
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
  components: {
    VueHtml2pdf,
  },
  data: () => ({
    page: 1,
    max: 10,
    data: [],
    search: "",

    label: [],

    detail: [],

    form: {
      id: "",
      customer: "",
      status: null,
      editor: null,
      resi: null,
      ongkir: null,
    },
  }),

  methods: {
    generateReport() {
      this.$refs.labelPDF.generatePdf();
    },

    setStatus(id, customer) {
      this.form.id = id;
      this.form.customer = customer;

      this.$refs["statusModal"].show();
    },
    showLabelModal(id, customer) {
      this.form.id = id;
      this.form.customer = customer;

      axios
        .get("getOrderDetail/" + id, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.label = response.data.data.data;
          this.generateReport();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));

      // this.$refs["labelModal"].show();
    },
    showNoteModal(id, customer, note) {
      this.form.id = id;
      this.form.customer = customer;
      this.form.note = note;

      this.$refs["noteModal"].show();
    },
    showDetailModal(id, customer) {
      this.form.id = id;
      this.form.customer = customer;

      axios
        .get("getOrderDetail/" + id, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.detail = response.data.data.data;
          console.log(this.detail);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));

      this.$refs["detailModal"].show();
    },
    updateStatus() {
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post(
            "updateStatusPenjualan",
            {
              id: this.form.id,
              status: this.form.status,
              editor: this.form.editor,
              resi: this.form.resi,
              ongkir: this.form.ongkir,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:
                  "Bearer " + localStorage.getItem("admin_access_token"),
              },
            }
          )
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Update Berhasil",
              response.data.message
            );
            this.form.status = null;
            this.form.resi = null;
            this.form.ongkir = null;
            this.getData();
            this.$refs["statusModal"].hide();
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Autentikasi Gagal",
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },
    addNote() {
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post(
            "addNote",
            {
              id: this.form.id,
              catatan: this.form.note,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:
                  "Bearer " + localStorage.getItem("admin_access_token"),
              },
            }
          )
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Update Berhasil",
              response.data.message
            );
            this.form.note = null;
            this.getData();
            this.$refs["noteModal"].hide();
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Autentikasi Gagal",
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },
    getData() {
      this.loading = true;
      var status = this.$route.params.status;

      axios
        .post(
          "dataPenjualan",
          {
            status: status,
            keyword: this.search,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization:
                "Bearer " + localStorage.getItem("admin_access_token"),
            },
          }
        )
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
  computed: {},
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>

<style>
.info-title,
.info-detail {
  font-size: 0.9em;
}
.item-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#label,
#label h6,
#label h5 {
  font-family: Arial, Helvetica, sans-serif !important;
}
.label-area {
  border: dashed 2px #000;
}
</style>
