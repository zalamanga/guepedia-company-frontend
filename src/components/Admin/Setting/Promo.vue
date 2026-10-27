<template>
  <div class="card card-small blog-comments" style="position: inherit; height: 100%;">
    <div class="card-header border-bottom">
      <div class="justify-content-center align-items-center">
        <h6 class="m-0">Data Promo</h6>

        <div class="banner-table mb-3">
          <vs-table class="w-100">
            <template #thead>
              <vs-tr>
                <vs-th> Kode </vs-th>
                <vs-th> Nilai </vs-th>
                <vs-th> Minimum </vs-th>
                <vs-th> Ongkir </vs-th>
                <vs-th> Hapus </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr v-for="item in data" :key="item.id_data_kode_promo">
                <vs-td> {{ item.kode_promo }} </vs-td>
                <vs-td> {{ item.nilai_promo }} </vs-td>
                <vs-td> {{ item.minimum }} </vs-td>
                <vs-td>
                  <span class="badge badge-danger" v-if="item.free_ongkir == 1"
                    >Free Ongkir</span
                  >
                  <span class="badge badge-success" v-else>Bayar</span>
                </vs-td>
                <vs-td>
                  <button
                    class="btn btn-light"
                    @click="hapusPromo(item.id_data_kode_promo)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>

        <div class="mb-3">
          <vs-button success block v-b-modal.addPromoModal
            >Tambah Baru</vs-button
          >
        </div>
      </div>
    </div>

    <b-modal
      id="addPromoModal"
      ref="addPromoModal"
      title="Tambah Promo Baru"
      hide-footer
      hide-header-close
      centered
    >
      <form @submit.prevent="addPromo">
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Kode Promo</label
            >
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              v-model="form.kode"
              required
            />
          </div>

          <div class="col-md-6 mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Nilai Promo</label
            >
            <input
              type="number"
              class="form-control"
              aria-describedby="emailHelp"
              v-model="form.nilai"
              required
            />
          </div>

          <div class="col-md-6 mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Minimal Belanja</label
            >
            <input
              type="number"
              class="form-control"
              aria-describedby="emailHelp"
              v-model="form.minimum"
              required
            />
          </div>

          <div class="col-md-6 mb-3">
            <vs-checkbox v-model="form.freeongkir"> Gratis Ongkir </vs-checkbox>
          </div>

          <vs-button block success type="submit">Simpan Promo</vs-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      form:{
        kode: "",
        nilai: "",
        minimum: "",
        freeongkir: false
      }
    };
  },

  methods: {
    addPromo() {
      this.loading = false;

      var formData = new FormData();
      formData.append("kode", this.form.kode);
      formData.append("nilai", this.form.nilai);
      formData.append("minimum", this.form.minimum);
      formData.append("freeongkir", this.form.freeongkir ? 1 : 0);

      return new Promise((resolve, reject) => {
        axios
          .post("addPromo", formData, {
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
            this.$refs["addPromoModal"].hide()
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
        .get("dataPromo", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.promo;
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
};
</script>