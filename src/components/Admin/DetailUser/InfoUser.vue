<template>
  <div id="info-user">
    <div class="card card-small mb-4 pt-3">
      <div class="card-header border-bottom text-center">
        <div class="mb-3 mx-auto text-center d-inline-block">
          <vs-avatar circle success size="100">
            <img v-if="data.photo" :src="'https://www.guepedia.com/uploads/photo_profile/'+data.photo" alt="" />
            <span v-else class="fw-bold fs-3">{{data.nama_lengkap | initial}}</span>
          </vs-avatar>
        </div>
        <h4 class="mb-0">{{ data.nama_lengkap }}</h4>
        <span class="text-muted d-block mb-2">{{ data.nama_pena }}</span>
        <hr />
        <span class="text-muted d-block mb-2"
          >{{ data.email }} | {{ data.nomor_kontak }}</span
        >
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item p-4" v-if="data.about">
          <strong class="text-muted d-block mb-2">Tentang Penulis</strong>
          <span>{{ data.about }}</span>
        </li>
        <li class="list-group-item p-4">
          <strong class="text-muted d-block mb-2">Alamat Penulis</strong>
          <span>{{ data.alamat_lengkap }}</span>
        </li>

        <li class="list-group-item p-4">
          <strong class="text-muted d-block mb-2">Data Rekening</strong>
          <div>
            {{ data.nama_bank }} - {{ data.nomor_rekening }} -
            {{ data.nama_pemilik_rekening }}
          </div>
        </li>

        <li class="list-group-item p-4">
          <strong class="text-muted d-block mb-2">Sosial Media</strong>
          <div class="text-center d-flex">
            <a
              :href="'https://www.facebook.com/' + data.facebook"
              target="_blank"
              ><vs-button icon><i class="bi bi-facebook"></i></vs-button
            ></a>
            <a
              :href="'https://www.instagram.com/' + data.instagram"
              target="_blank"
              ><vs-button danger icon><i class="bi bi-instagram"></i></vs-button
            ></a>
          </div>
        </li>
      </ul>

      <div class="text-center">

        <div class="bg-danger text-light" v-if="data.alasan_blacklist">{{data.alasan_blacklist}}</div>

        <vs-button
          @click="toggleBlacklist"
          :color="data.blacklist ? 'success' : 'danger'"
          block
          >{{ data.blacklist ? 'Cabut Blacklist' : 'Blacklist' }}</vs-button
        >
      </div>
    </div>

    <b-modal centered hide-footer hide-header hide-header-close ref="blacklistConfirmation">
      <div class="text-center">
        <h4>{{ data.blacklist ? 'Cabut Blacklist Penulis' : 'Blacklist Penulis' }}</h4>
        <p>
          Apakah anda yakin ingin 
          <strong>{{ data.blacklist ? 'Mencabut Blacklist Penulis Ini' : 'Blacklist Penulis Ini' }}</strong>?
        </p>
        <textarea class="form-control mb-3" placeholder="Alasan Blacklist" v-model="alasan" v-if="!data.blacklist"></textarea>
        <vs-button
          @click="blacklistAction"
          :color="data.blacklist ? 'success' : 'danger'"
          block
          >{{ data.blacklist ? 'Cabut Blacklist' : 'Blacklist' }}</vs-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      alasan: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    toggleBlacklist(){
      this.$refs['blacklistConfirmation'].show();
    },
    blacklistAction(){
      this.loading = true;
      var id = this.$route.params.id;
      axios
        .post("toggleBlacklist",{
          id: id,
          alasan: this.alasan
        }, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.$refs['blacklistConfirmation'].hide();
          this.openNotification(
            6000,
            "top-right",
            "success",
            "Success",
            response.data.message
          );

          this.getData();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    getData() {
      this.loading = true;
      var id = this.$route.params.id;
      axios
        .get("userDetail/" + id, {
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
  },
};
</script>
