<template>
  <div class="center">

    <form @submit.prevent="getData">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Cari Judul Buku" v-model="search" @input="getData">
        <button class="btn btn-warning text-dark" type="submit"><b-icon icon="search"></b-icon></button>
      </div>
    </form>

    <button class="btn btn-primary mb-4" @click="exportExcel">
      Export Excel
    </button>    

    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> Tanggal Upload </vs-th>
          <vs-th> Judul </vs-th>
          <vs-th> Penulis </vs-th>
          <vs-th> Kategori </vs-th>
          <vs-th> Status </vs-th>
          <vs-th> Harga </vs-th>
          <vs-th> GP </vs-th>
          <vs-th> ID </vs-th>
          <vs-th> St </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getPage(data, page, max)"
          :data="tr"
        >
          <vs-td>
            {{ tr.tanggal_upload }}
          </vs-td>
          <vs-td style="width: 30%">
            <router-link
              :to="{ name: 'DetailNaskah', params: { id: tr.id_file_naskah } }"
              >{{ tr.judul }}</router-link
            >
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.penulis }}
          </vs-td>
          <vs-td>
            {{ tr.category.nama_kategori }}
          </vs-td>
          <vs-td>
            <span class="badge bg-secondary" v-if="tr.status == 'Di Revisi'">{{
              tr.status
            }}</span>
            <span
              class="badge bg-success"
              v-else-if="tr.status == 'Dalam Antrian'"
              >{{ tr.status }}</span
            >
            <span class="badge bg-danger" v-else-if="tr.status == 'Di Tolak'">{{
              tr.status
            }}</span>
            <span
              class="badge bg-warning text-dark"
              v-else-if="tr.status == 'Proses'"
              >{{ tr.status }}</span
            >
            <span
              class="badge bg-info text-dark"
              v-else-if="tr.status == 'Publish'"
              >{{ tr.status }}</span
            >
            <span class="badge bg-dark" v-else-if="tr.status == 'Pending'">{{
              tr.status
            }}</span>

            <span class="badge bg-info" v-else-if="tr.status == 'Konfirmasi Bayar'">{{
              tr.status
            }}</span>
          </vs-td>
          <vs-td>
            {{ tr.harga | currency }}
          </vs-td>
          <vs-td>
            <span class="badge bg-secondary" v-if="!tr.google_play">-</span>
            <span class="badge bg-success" v-if="tr.google_play == 1"
              >Guepedia</span
            >
            <span class="badge bg-danger" v-else-if="tr.google_play == 2"
              >Penulis</span
            >
          </vs-td>
          <vs-td>
            <span class="badge bg-success" v-if="tr.tipe_id == 'ISBN'"
              >ISBN</span
            >
            <span class="badge bg-danger" v-else>QRCBN</span>
          </vs-td>
          <vs-td>
            <span class="badge bg-success" v-if="tr.status_naskah == 'Gratis'"
              >Gratis</span
            >
            <span
              class="badge bg-danger"
              v-else-if="tr.status_naskah == 'Bayar'"
              >Bayar</span
            >
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
import * as XLSX from 'xlsx'

export default {
  data: () => ({
    page: 1,
    max: 10,
    data: [],
    search: "",
  }),

  methods: {
    getData() {
      this.loading = true;

      var status = this.$route.params.status;

      axios
        .post('naskahData',{
          status: status,
          keyword: this.search
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.data;
          // console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    exportExcel() {
      const baseURL = "https://assets.guepedia.com/file_cover/"

      const filterData = this.data.map((item) => ({
        judul: item.judul,
        penulis: item.penulis,
        fileCover: item.file_cover
          ? `${baseURL}${item.file_cover}`
          : 'Tidak Ada Gambarnya',
        noId: item.no_id,
        harga: item.harga,
        kategori: item.category?.nama_kategori || "Tidak Ada",
        status: item.status,
        tipeId: item.tipe_id,
        tglUpload: item.tanggal_upload,
        editor: item.editor
      }))

      const worksheet = XLSX.utils.json_to_sheet(filterData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Naskah")
      XLSX.writeFile(workbook, "laporan_naskah.xlsx")   
    },
  },

  mounted() {
    this.getData();
  },
  computed: {
    
  },
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>
