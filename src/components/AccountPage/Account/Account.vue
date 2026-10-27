<template>
  <div class="chart-area mt-5">
    <div class="row">
      <div class="col-md-3 col-lg-3 mb-3">
        <img
          :src="'https://www.guepedia.com/uploads/photo_profile/' + data.photo"
          alt=""
          width="100%"
          v-if="data.photo"
        />
        <div class="text-center" v-else>
          <b-avatar :text="data.nama_pena | initial" size="10em"></b-avatar>
        </div>
        <div class="d-grid gap-2 mt-3 text-center">
          <input
            type="file"
            class="custom-file-input2 btn"
            id="photoProfile"
            accept="image/*"
            v-on:change="updatePhoto()"
          />
        </div>
      </div>

      <div class="col-md-5 col-lg-5 mb-3">
        <div class="account-item">
          <div class="account-title fw-bold">Detail Akun</div>
          <hr class="price-line" />
          <div class="account-list">
            <ul>
              <li>Nama Lengkap : {{ data.nama_lengkap }}</li>
              <li>Nama Pena : {{ data.nama_pena }}</li>
              <li>Nomor Kontak : {{ data.nomor_kontak }}</li>
              <li>Alamat Email : {{ data.email }}</li>
            </ul>
          </div>
        </div>

        <div class="account-item mt-3">
          <div class="account-title fw-bold">Nomor Rekening</div>
          <hr class="price-line" />
          <div class="account-list">
            <ul>
              <!-- <li>Nama Bank : {{ data.nama_bank }}</li> -->
              <li>Nama Pemilik Rekening : {{ data.nama_pemilik_rekening }}</li>
              <li>Nomor Rekening : {{ data.nomor_rekening }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 mb-3">
        <div class="account-item mt-3">
          <div class="account-title fw-bold">Akun Sosial Media</div>
          <hr class="price-line" />
          <div class="account-list">
            <ul>
              <li>
                <a
                  :href="'http://www.facebook.com/' + data.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-facebook me-3"></i>
                  {{ data.facebook }}
                </a>
              </li>
              <li>
                <a
                  :href="'http://www.instagram.com/' + data.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-instagram me-3"></i>
                  {{ data.instagram }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="login-btn mt-3">
          <b-button
            type="button"
            class="btn-sm border-0 px-5"
            v-b-modal.editProfileModal
          >
            Edit Detail AKun
          </b-button>

          <b-button
            type="button"
            class="btn-sm border-0 px-5 mt-3"
            v-b-modal.editPasswordModal
          >
            Edit Password
          </b-button>
        </div>
      </div>

      <div class="col-md-6 col-lg-6 mb-3">
        <div class="account-item mt-3">
          <div class="account-title fw-bold">Alamat Pengiriman</div>
          <hr class="price-line" />

          <div class="bg-success p-3 text-dark bg-opacity-10 address-item">
            <div class="address-detail">
              <div class="receiver">
                <div class="receiver-detail">
                  <span class="fw-bold">{{ alamat.nama_penerima }}</span> ({{
                    alamat.nomor_kontak
                  }})
                </div>
              </div>
              <div class="address mb-2">
                {{ alamat.alamat_lengkap }}<br />
                {{ alamat.nama_kecamatan }} - {{ alamat.nama_kota }} -
                {{ alamat.nama_provinsi }} {{ alamat.kode_pos }}
              </div>
              <b-button
                v-b-modal.editAddressModal
                type="button"
                class="btn btn-light btn-sm fw-bold"
                >Ubah Alamat</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="editProfileModal"
      title="Edit Detail Akun"
      hide-footer
      hide-header-close
      centered
      size="lg"
    >
      <edit-profile />
    </b-modal>

    <b-modal
      id="editAddressModal"
      title="Edit Alamat Pengiriman"
      hide-footer
      hide-header-close
      centered
      size="lg"
    >
      <edit-address />
    </b-modal>

    <b-modal
      id="editPasswordModal"
      title="Edit Password"
      hide-footer
      hide-header-close
      centered
    >
      <form @submit.prevent="updatePassword">
      <div class="mb-3">
        <label for="editPhone" class="form-label">Password Lama</label>
        <input
          type="password"
          class="form-control"
          v-model="form.old_password"
          required
        />
      </div>

      <div class="mb-3">
        <label for="editPhone" class="form-label">Password Baru</label>
        <input
          type="password"
          class="form-control"
          v-model="form.new_password"
          required
        />
      </div>

      <div class="mb-3">
        <label for="editPhone" class="form-label">Ulangi Password Baru</label>
        <input
          type="password"
          class="form-control"
          v-model="form.new_password_confirmation"
          required
        />
      </div>

      <div class="login-btn mt-3 d-grid gap-2">
        <button type="submit" class="btn btn-sm">Simpan Password</button>
      </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import EditProfile from "./Modal/EditProfile.vue";
import EditAddress from "./Modal/EditAddress.vue";

import axios from "axios";
export default {
  created() {},
  components: {
    EditProfile,
    EditAddress,
  },
  data: () => ({
    data: [],
    alamat: [],

    photoProfile: null,
    form: {
      old_password: '',
      new_password: '',
      new_password_confirmation: ''
    }
  }),

  methods: {
    updatePhoto() {
      this.photoProfile = document.getElementById("photoProfile").files[0];

      this.sending = true;
      var formData = new FormData();
      formData.append("photoProfile", this.photoProfile);

      return new Promise((resolve, reject) => {
        axios
          .post("updatePhotoProfile", formData, {
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
    getData() {
      this.loading = true;

      axios
        .get("myAccount", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data = response.data.data.data;
          this.alamat = response.data.data.alamat;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    updatePassword() {
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post("updatePassword", {
            old_password: this.form.old_password,
            new_password: this.form.new_password,
            new_password_confirmation: this.form.new_password_confirmation,
          })
          .then((response) => {
            // console.log(response);

            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );
            this.loading = false;
            this.getData()
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
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.account-list ul {
  padding-left: 0;
}
.account-list ul li {
  list-style: none;
  line-height: 2em;
  font-size: 0.9em;
}
.address-item {
  border-radius: 10px;
}

/* file browse */
.custom-file-input2::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input2::before {
  content: "Update Photo Profile";
  text-align: center;
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
  width: 100%;
}
.custom-file-input2:hover::before {
  border-color: black;
}
.custom-file-input2:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
