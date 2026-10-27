<template>
  <div class="center">
    <vs-table striped>
      <template #thead>
        <vs-tr>
          <vs-th> # </vs-th>
          <vs-th> Nama Reseller </vs-th>
          <vs-th> Alamat </vs-th>
          <vs-th> Nomor Telepon </vs-th>
          <vs-th> Status </vs-th>
          <vs-th> Aksi </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in data"
          :data="tr"
        >
          <vs-td style="width: 5%"> {{i+1}}
          </vs-td>
          <vs-td style="width: 20%">
            {{ tr.nama_reseller }}
          </vs-td>
          <vs-td style="width: 30%">
            {{ tr.alamat }}
          </vs-td>
          <vs-td style="width: 10%">
            {{ tr.no_hp }}
          </vs-td>
          <vs-td style="width: 5%">
            <span
              class="badge bg-info"
              v-if="tr.status == 'Baru'"
              >{{ tr.status }}</span
            >
            <span
              class="badge bg-success"
              v-else-if="tr.status == 'Terbayar'"
              >{{ tr.status }}</span
            >
            <span
              class="badge bg-danger"
              v-else-if="!tr.status"
              >{{tr.deposit | currency}}</span
            >
          </vs-td>

          <vs-td style="width: 10%">
            <div class="d-flex" v-if="tr.status">
              <vs-button warn size="mini" v-if="tr.status == 'Terbayar'" @click="showBukti(tr.id_registrasi, tr.nama_reseller, tr.bukti_transfer)">Bukti</vs-button>
              <vs-button success size="mini" @click="resellerAction(tr.id_registrasi, 'terima')">Terima</vs-button>
              <vs-button danger size="mini" @click="resellerAction(tr.id_registrasi, 'tolak')">Tolak</vs-button>
            </div>
            
            <vs-button v-else success size="mini">Lihat Detail</vs-button>
          </vs-td>
          
        </vs-tr>
      </template>

    </vs-table>

    <b-modal ref="buktiModal" hide-header-close hide-footer :title="'Bukti Transfer '+ bukti.title" centered>
      <img :src="'https://www.guepedia.com/uploads/daftar_reseller/'+bukti.bukti" class="w-100">

      <div class="mt-3 text-center d-flex">
        <vs-button success class="ms-auto" @click="resellerAction(bukti.id, 'terima')">Terima Reseller</vs-button>
        <vs-button danger class="me-auto" @click="resellerAction(bukti.id, 'tolak')">Tolak Reseller</vs-button>
      </div>
    </b-modal>

    
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {
    
  },
  data: () => ({
    data: [],

    bukti:{
      title: "",
      bukti: "",
      id: ""
    }
  }),

  methods: {

    showBukti(id, title, bukti){
      this.bukti.id = id;
      this.bukti.title = title;
      this.bukti.bukti = bukti;

      this.$refs["buktiModal"].show();
    },
    resellerAction(id, status) {
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post(
            "resellerAction",
            {
              id: id,
              status: status,
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
              "Berhasil",
              response.data.message
            );
            this.getData();
            this.$refs["buktiModal"].hide();
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

      if (status) {
        var url = "dataReseller/" + status;
      } else {
        var url = "dataReseller";
      }

      axios.get(url,{
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
          console.log(this.data);
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
