<template>
  <div id="info-user">
    <div class="card card-small mb-4 pt-3">
      <div class="card-header border-bottom">
        <h5>Riwayat Pengajuan Royalti</h5>
      </div>

      <div class="p-3">
        
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> # </vs-th>
              <vs-th> Nomor Penarikan </vs-th>
              <vs-th> Tanggal Pengajuan </vs-th>
              <vs-th> Di Tarik </vs-th>
              <vs-th> Biaya Admin </vs-th>
              <vs-th> Total </vs-th>
              <vs-th> Status </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in data" :data="tr">
              <vs-td>
                {{ i + 1 }}
              </vs-td>
              <vs-td>
                {{ tr.nomor_penarikan }}
              </vs-td>
              <vs-td>
                {{ tr.tanggal_pengajuan }}
              </vs-td>
              <vs-td>
                {{ tr.royalti_ditarik }}
              </vs-td>
              <vs-td>
                {{ tr.biaya_admin }}
              </vs-td>
              <vs-td>
                {{ tr.jumlah_penarikan }}
              </vs-td>
              <vs-td>
                {{ tr.status }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
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
      form: {
        royalti: null,
      },
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
        .get("dataRoyalti/" + id, {
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

    updateRoyalti() {
      this.loading = false;
      var id = this.$route.params.id;
      var formData = new FormData();
      formData.append("royalti", this.form.royalti);

      return new Promise((resolve, reject) => {
        axios
          .post("updateRoyalti/" + id, formData, {
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
  },
};
</script>
