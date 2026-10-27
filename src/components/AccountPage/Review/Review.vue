<template>
  <div class="chart-area mt-5">
    <div class="chart-title">
      <h4 class="fw-bold">Review Naskah Saya</h4>
      <hr class="price-line" />

      <div class="table-area p-3 shadow">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Judul Naskah</th>
              <th scope="col">Status</th>
              <th scope="col">Link Video</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in datas" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ data.naskah.judul }}</td>
              <td>{{ data.status }}</td>
              <td>{{ data.link }}</td>
              <td>
                <input
                  type="file"
                  class="custom-file-input3 btn"
                  id="buktiTransfer"
                  accept="image/*"
                  v-if="data.status == 'Belum Dibayar'"
                  v-on:change="kirimBuktiTransfer(data.id_review)"
                  :disabled="sending"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    datas: [],
    sending: false
  }),
  methods: {
    getData() {
      this.loading = true;

      axios
        .get("myReview", {
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

    kirimBuktiTransfer(id) {
      this.buktiTransfer = document.getElementById("buktiTransfer").files[0];

      this.sending = true;
      var formData = new FormData();
      formData.append("buktiTransfer", this.buktiTransfer);
      formData.append("id", id);

      return new Promise((resolve, reject) => {
        axios
          .post("updateBuktiTransferReview", formData, {
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
            this.getData();
            this.sending = false;
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
    this.getData();
  },
};
</script>

<style>
table {
  font-size: 0.9em;
}

/* file browse */
.custom-file-input3::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input3::before {
  content: "Kirim Bukti Transfer";
  text-align: center;
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
  width: 100%;
}
.custom-file-input3:hover::before {
  border-color: black;
}
.custom-file-input3:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
