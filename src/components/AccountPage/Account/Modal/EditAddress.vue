<template>
  <div>
    <form @submit.prevent="updateAddress">
    <div class="form-item">
      <div class="form-title fw-bold">Detail Pengiriman</div>
      <div class="row">
        <div class="col-md-8 col-lg-8">
          <div class="mb-3">
            <label for="editName" class="form-label">Nama Penerima</label>
            <input
              type="text"
              class="form-control"
              id="editName"
              v-model="form.name"
              required
            />
          </div>
        </div>

        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="editPhone" class="form-label">Nomor Kontak</label>
            <input
              type="text"
              class="form-control"
              id="editPhone"
              v-model="form.phone"
              required
            />
          </div>
        </div>

        <div class="col-md-6 col-lg-6">
          <div class="mb-3">
            <label for="editPhone" class="form-label">Provinsi</label>
            <select
              class="form-select"
              placeholder="Select Province"
              v-model="form.province"
              @change="getCity($event)"
              required
            >
              <option selected disabled>Select Province</option>
              <option
                v-for="(prov, index) in data.provinces"
                :key="index"
                :value="prov.id"
                required
              >
                {{ prov.name }}
              </option>
            </select>
            <input
              type="hidden"
              class="form-control"
              id="editPhone"
              v-model="form.nama_provinsi"
              required
            />
          </div>
        </div>

        <div class="col-md-6 col-lg-6">
          <div class="mb-3">
            <label for="editPhone" class="form-label">Kota/Kabupaten</label>
            <select
              class="form-select"
              placeholder="Select City"
              v-model="form.city"
              @change="getSubdistrict($event)"
              required
            >
              <option selected disabled>Select City</option>
              <option
                v-for="(city, index) in data.cities"
                :key="index"
                :value="city.id"
                required
              >
                {{ city.name }}
              </option>
            </select>
            <input
              type="hidden"
              class="form-control"
              id="editPhone"
              v-model="form.nama_kota"
              required
            />
          </div>
        </div>

        <div class="col-md-8 col-lg-8">
          <div class="mb-3">
            <label for="editPhone" class="form-label">Kecamatan</label>
            <select
              class="form-select"
              placeholder="Select City"
              v-model="form.subdistrict"
              @change="setSubdistrict($event)"
              required
            >
              <option selected disabled>Select Subdistrict</option>
              <option
                v-for="(subdistrict, index) in data.subdistricts"
                :key="index"
                :value="subdistrict.id"
              >
                {{ subdistrict.name }}
              </option>
            </select>
            <input
              type="hidden"
              class="form-control"
              id="editPhone"
              v-model="form.nama_kecamatan"
              required
            />
          </div>
        </div>
        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="editPhone" class="form-label">Kodepos</label>
            <input
              type="number"
              class="form-control"
              id="editPhone"
              v-model="form.postal_code"
            />
          </div>
        </div>

        <div class="col-md-12 col-lg-12">
          <div class="mb-3">
            <label for="editPhone" class="form-label">Alamat Lengkap</label>
            <textarea
              class="form-control"
              id="editPhone"
              v-model="form.address"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="login-btn mt-3 d-grid gap-2">
      <button type="submit" class="btn btn-sm">Simpan Perubahan</button>
    </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      provinces: [],
      cities: [],
      subdistricts: [],

      form: {
        name: "",
        phone: "",
        province: "",
        city: "",
        nama_kota: "",
        nama_kecamatan: "",
        nama_provinsi: "",
        subdistrict: "",
        postal_code: "",
        address: "",
      },

      data: {
        provinces: [],
        cities: [],
        subdistricts: [],
        alamat: []
      },

      loading: true,
    };
  },
  methods: {

    getAlamat() {
      this.loading = true;
      axios
        .get("getAlamat", {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data.alamat = response.data.data.data;

          this.form.name = this.data.alamat.nama_penerima
          this.form.phone = this.data.alamat.nomor_kontak
          
          console.log(this.data.alamat)
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    getProvinsi() {
      this.loading = true;
      axios
        .get("provinces", {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data.provinces = response.data.data;
          console.log(this.data.provinces);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    getCity(event) {
      // Update: menggunakan struktur data baru
      this.form.nama_provinsi = event.target.options[event.target.selectedIndex].text;

      // Reset cities dan subdistricts ketika province berubah
      this.data.cities = [];
      this.data.subdistricts = [];
      this.form.city = "";
      this.form.subdistrict = "";

      this.loading = true;
      var value = this.form.province;
      axios
        .get("cities/" + value, {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data.cities = response.data.data;
          console.log(this.data.cities);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    setSubdistrict(event) {
      // Update: menggunakan struktur data baru
      this.form.nama_kecamatan = event.target.options[event.target.selectedIndex].text;
    },

    getSubdistrict(event) {
      // Update: menggunakan struktur data baru
      this.form.nama_kota = event.target.options[event.target.selectedIndex].text;

      // Reset subdistricts ketika city berubah
      this.data.subdistricts = [];
      this.form.subdistrict = "";

      this.loading = true;
      var value = this.form.city;
      axios
        .get("subdistricts/" + value, {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data.subdistricts = response.data.data;
          console.log(this.data.subdistricts);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    updateAddress() {
      this.loading = true;

      return new Promise((resolve, reject) => {
        axios
          .post("updateAlamat", {
            name: this.form.name,
            phone: this.form.phone,
            province: this.form.nama_provinsi,
            city_id: this.form.city,
            nama_kota: this.form.nama_kota,
            nama_kecamatan: this.form.nama_kecamatan,
            subdistrict_id: this.form.subdistrict,
            kodepos: this.form.postal_code,
            address: this.form.address,
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );
            this.loading = false;
            this.$router.go()
            resolve(response);
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
    this.getProvinsi();
    this.getAlamat();
  },
};
</script>