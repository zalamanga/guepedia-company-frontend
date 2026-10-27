<template>
  <div class="center">
    <div class="row">
      <div class="col-md-6">
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th> # </vs-th>
              <vs-th> Nama Admin </vs-th>
              <vs-th> Email </vs-th>
              <vs-th> Level </vs-th>
              <vs-th> Last Login </vs-th>
            </vs-tr>
          </template>
          <template #tbody v-if="!loading">
            <vs-tr
              :key="i"
              v-for="(tr, i) in $vs.getPage(data, page, max)"
              :data="tr"
            >
              <vs-td>{{ i + 1 }}</vs-td>
              <vs-td>
                {{ tr.nama_admin }}
              </vs-td>
              <vs-td style="width: 20%">
                {{ tr.email }}
              </vs-td>
              <vs-td style="width: 30%">
                {{ tr.level }}
              </vs-td>
              <vs-td style="width: 20%">
                {{ tr.last_login }}
              </vs-td>
            </vs-tr>
          </template>

          <template #footer>
            <vs-pagination v-model="page" :length="$vs.getLength(data, max)" />
          </template>
        </vs-table>
      </div>

      <div class="col-md-6 border-left">
        <div class="admin-form-header mb-3">
          <h4>Tambahkan Admin Baru</h4>
        </div>
        <div class="admin-form">
          <form @submit.prevent="adminRegister">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Nama Admin</label
                  >
                  <input type="text" class="form-control" v-model="form.name" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Email address</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    v-model="form.email"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Level</label
                  >
                  <select class="form-control" v-model="form.level">
                    <option value="Admin" selected>Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div class="col-md-4">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Password</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="col-md-4">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Ulangi Password</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="form.password_confirmation"
                  />
                </div>
              </div>
            </div>

            <vs-button block type="submit">Simpan Admin Baru</vs-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    page: 1,
    max: 10,
    data: [],

    form: {
      name: "",
      email: "",
      level: "Admin",
      password: "",
      password_confirmation: "",
    },

    loading: false,
  }),

  methods: {
    adminRegister() {
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post(
            "team/register",
            {
              nama_admin: this.form.name,
              email: this.form.email,
              password: this.form.password,
              password_confirmation: this.form.password_confirmation,
              level: this.form.level,
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
              "Sukses",
              response.data.message
            );

            this.getData();

            this.form.name = "";
            this.form.email =  "";
            this.form.level = "Admin";
            this.form.password = "";
            this.form.password_confirmation = "";

            this.loading = false;
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
      axios
        .get("dataAdmin", {
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
  computed: {},
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
