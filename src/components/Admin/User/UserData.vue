<template>
  <div class="center">
    <vs-table striped>
      <template #header>
        <vs-input
          v-model="search"
          border
          placeholder="CARI PENGGUNA ....."
          block
          @input="getData"
        />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th> # </vs-th>
          <vs-th> Nama Penulis </vs-th>
          <vs-th> Nama Pena </vs-th>
          <vs-th> Email </vs-th>
          <vs-th> Nomor Kontak </vs-th>
          <vs-th> Status </vs-th>
          <vs-th> # </vs-th>
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
            {{ tr.nama_lengkap }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.nama_pena }}
          </vs-td>
          <vs-td style="width: 30%">
            {{ tr.email }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.nomor_kontak }}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.status_akun }}
          </vs-td>

          <vs-td style="width: 20%">
            <router-link
              :to="{ name: 'DetailUser', params: { id: tr.id_account } }"
            >
              <vs-button>Detail</vs-button>
            </router-link>
          </vs-td>
        </vs-tr>
      </template>

      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(data, max)" />
      </template>
    </vs-table>
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
    getData() {
      this.loading = true;
      axios
        .post(
          "dataUser",
          {
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
  computed: {
    filteredRows() {
      return this.data.filter((row) => {
        if (row.nama_lengkap) {
          var nama_lengkap = row.nama_lengkap.toString().toLowerCase();
          return nama_lengkap.includes(searchTerm);
        }
        const email = row.email.toString().toLowerCase();
        const searchTerm = this.search.toLowerCase();

        return email.includes(searchTerm);
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
