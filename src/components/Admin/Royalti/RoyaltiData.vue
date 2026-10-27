<template>
  <div class="center">
    <vs-table striped>
      <template #header>
        <vs-input
          v-model="search"
          border
          placeholder="CARI PENJUALAN ....."
          block
        />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th> # </vs-th>
          <vs-th> Nomor Penarikan </vs-th>
          <vs-th> Tanggal Pengajuan </vs-th>
          <vs-th> Nama Lengkap </vs-th>
          <vs-th> Nomor Kontak </vs-th>
          <vs-th> Ditarik </vs-th>
          <vs-th> Admin </vs-th>
          <vs-th> Total </vs-th>
          <vs-th> Status </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getPage(filteredRows, page, max)"
          :data="tr"
        >
          <vs-td>{{ i + 1 }}</vs-td>
          <vs-td>
            {{ tr.nomor_penarikan }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.tanggal_pengajuan }}
          </vs-td>
          <vs-td style="width: 30%">
            {{ tr.user.nama_lengkap }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.user.nomor_kontak }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.royalti_ditarik | currency }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.biaya_admin | currency }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.jumlah_penarikan | currency }}
          </vs-td>
          <vs-td>
            <span class="badge bg-primary" v-if="tr.status == 'Pending'">{{
              tr.status
            }}</span>
            <span
              class="badge bg-danger text-light"
              v-else-if="tr.status == 'Dibatalkan'"
              >{{ tr.status }}</span
            >
            <span
              class="badge bg-success text-light"
              v-else-if="tr.status == 'Selesai'"
              >{{ tr.status }}</span
            >
          </vs-td>

          <template #expand>
            <div class="con-content bg-dark">
              <div class="d-flex">
                <vs-button
                  class="mx-auto"
                  @click="setStatus(tr.id_data_pengajuan, tr.user.nama_lengkap)"
                  primary
                >
                  Ubah Status Pengajuan Royalti
                </vs-button>
              </div>
            </div>
          </template>
        </vs-tr>
      </template>

      <template #footer>
        <vs-pagination
          v-model="page"
          :length="$vs.getLength(filteredRows, max)"
        />
      </template>
    </vs-table>

    <b-modal
      ref="statusModal"
      :title="'Ubah Status Penarikan Royalti ' + form.customer"
      hide-footer
      hide-header-close
      centered
    >
      <!-- <form @submit.prevent="updateStatus"> -->
      <div class="mb-2">
        <label for="exampleInputEmail1" class="form-label">Pilih Status</label>
        <select class="form-control" v-model="form.status" required>
          <option value="Selesai">Selesai</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>
      </div>
      <hr />

      <div class="mb-2" v-if="form.status == 'Selesai'">
        <div class="text-center mb-3">
          <input
            type="file"
            class="custom-file-input2 receipt-file btn"
            id="Receipt"
            v-on:change="UpdateStatus()"
            accept="image/*"
            :disabled="loading"
          />
        </div>
      </div>

      <div class="row" v-if="form.status == 'Dibatalkan'">
        <div class="col-md-12">
          <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label"
              >Alasan Pembatalan</label
            >
            <textarea
              class="form-control"
              v-model="form.note"
              :required="form.status == 'Dibatalkan'"
            />
          </div>
        </div>
      </div>

      <div class="mt-3">
        <vs-button
          success
          block
          :disabled="!form.note"
          v-if="form.status == 'Dibatalkan'"
          @click="UpdateStatus"
          >Perbarui Pengajuan Royalti</vs-button
        >
      </div>
      <!-- </form> -->
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    page: 1,
    max: 10,
    data: [],
    search: "",

    receipt: null,
    form: {
      customer: "",
      id: "",
      note: "",
    },
    loading: false,
  }),

  methods: {
    setStatus(id, customer) {
      this.form.id = id;
      this.form.customer = customer;

      this.$refs["statusModal"].show();
    },

    UpdateStatus() {
      if (this.form.status == "Selesai") {
        this.receipt = document.getElementById("Receipt").files[0];
      }

      this.loading = true;
      var formData = new FormData();
      formData.append("id", this.form.id);
      formData.append("receipt", this.receipt);
      formData.append("note", this.form.note);

      return new Promise((resolve, reject) => {
        axios
          .post("updateStatusRoyalti", formData, {
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
            this.getData();
            this.form.note = "";
            this.$refs["statusModal"].hide();
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
        var url = "royaltiData/" + status;
      } else {
        var url = "royaltiData";
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
  computed: {
    filteredRows() {
      return this.data.filter((row) => {
        const nama_lengkap = row.user.nama_lengkap.toString().toLowerCase();
        const searchTerm = this.search.toLowerCase();

        return nama_lengkap.includes(searchTerm);
      });
    },
  },
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
.receipt-file:before {
  content: "Bukti Transfer";
}
</style>
