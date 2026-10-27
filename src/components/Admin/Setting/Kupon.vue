<template>
  <div class="card card-small blog-comments">
    <div class="card-header border-bottom">
      <div class="justify-content-center align-items-center">
        <h6 class="m-0">Data Promo</h6>

        <div class="banner-table mb-3">
          <vs-table class="w-100">
            <template #header>
              <vs-input v-model="search" border placeholder="Search" class="w-100" />
            </template>
            <template #thead>
              <vs-tr>
                <vs-th> # </vs-th>
                <vs-th> Email </vs-th>
                <vs-th> Pengguna </vs-th>
                <vs-th> Nama Kupon </vs-th>
                <vs-th> Nilai </vs-th>
                <vs-th> Minimal </vs-th>
                <vs-th> Status Kupon </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                v-for="(item, index) in $vs.getPage(filteredRows, page, max)"
                :key="item.id_data_kupon"
              >
                <vs-td> {{ index + 1 }} </vs-td>
                <vs-td> {{ item.email_penulis }} </vs-td>
                <vs-td> {{ item.nama_penulis }} </vs-td>
                <vs-td> {{ item.nama_kupon }} </vs-td>
                <vs-td> {{ item.nilai_kupon }} </vs-td>
                <vs-td> {{ item.syarat_kupon }} </vs-td>
                <vs-td>
                  <span class="badge badge-danger" v-if="item.status_kupon == 'Expired'">{{ item.tanggal_expired }}</span>
                  <span class="badge badge-success" v-else>{{ item.status_kupon }}</span>
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
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(filteredRows, max)"
              />
            </template>
          </vs-table>
        </div>
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
      page: 1,
      max: 10,
      data: [],
      search: "",
    };
  },

  methods: {
    getData() {
      this.loading = true;

      axios
        .get("dataKupon", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.kupon;
          console.log(this.data);
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
  computed: {
    filteredRows() {
      return this.data.filter((row) => {
        const email = row.email_penulis.toLowerCase();
        const searchTerm = this.search.toLowerCase();

        return email.includes(searchTerm);
      });
    },
  },
};
</script>
