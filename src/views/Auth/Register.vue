<template>
  <div class="bg-white shadow p-3">
    <div class="text-center fw-bold mb-3">Bergabung dengan kami! Sekarang</div>
    <form @submit.prevent="registerUser()">
      <div class="row">
        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="registerName" class="form-label">Nama Lengkap</label>
            <input type="text" class="form-control" id="registerName" v-model="form.name" required />
          </div>
        </div>

        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="registerPena" class="form-label">Nama Pena</label>
            <input type="text" class="form-control" id="registerPena" v-model="form.pena" required />
          </div>
        </div>

        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="registerPhone" class="form-label">Nomor Kontak</label>
            <input type="text" class="form-control" id="registerPhone" v-model="form.kontak" required />
          </div>
        </div>

        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="registerEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="registerEmail" v-model="form.email" required />
          </div>
        </div>

        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="registerPassword" class="form-label">Password</label>
            <input type="password" class="form-control" id="registerPassword" v-model="form.password" required />
          </div>
        </div>
        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="registerConfirmPassword" class="form-label">Konfirmasi Password</label>
            <input type="password" class="form-control" id="registerConfirmPassword" v-model="form.password_confirmation"
              required />
          </div>
        </div>
      </div>

      <div class="fw-bold mb-3">Data Alamat Anda</div>
      <div class="row">
        <!-- alamat select -->
        <div class="row">
          <div class="col-md-6 col-lg-6">
            <label for="registerProvince" class="form-label">Provinsi</label>
            <select id="registerProvince" class="form-control" v-model="form.province" @change="onProvinceChange" required>
              <option value="" disabled selected>Pilih Provinsi</option>
              <option v-for="prov in provinces" :key="prov.id" :value="prov.id">{{ prov.name }}</option>
            </select>
          </div>
          <div class="col-md-6 col-lg-6">
            <label for="registerKota" class="form-label">Kota</label>
            <select id="registerKota" class="form-control" v-model="form.city" @change="onCityChange" :disabled="!cities.length" required>
              <option value="" disabled selected>Pilih Kota</option>
              <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-6">
            <label for="registerKecamatan" class="form-label">Kecamatan</label>
            <select id="registerKecamatan" class="form-control" v-model="form.district" @change="onDistrictChange" :disabled="!districts.length" required>
              <option value="" disabled selected>Pilih Kecamatan</option>
              <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</option>
            </select>
          </div>
          <div class="col-md-6 col-lg-6">
            <label for="registerKelurahan" class="form-label">Kelurahan</label>
            <select id="registerKelurahan" class="form-control" v-model="form.village" :disabled="!villages.length" required>
              <option value="" disabled selected>Pilih Kelurahan</option>
              <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}</option>
            </select>
          </div>
        </div>

        <!-- alamat detail -->
        <div class="col-md-12 col-lg-12">
          <div class="mb-3">
            <label for="registerAddress" class="form-label">Alamat Lengkap</label>
            <textarea 
              class="form-control" 
              id="registerAddress" 
              v-model="form.address"
              :class="{ 'is-invalid' : !isAddressValid }"
              required 
              placeholder="Sertakan nama jalan, rt, rw, kode POS, dan no rumah" 
            />
            <div v-if="!isAddressValid" class="invalid-feedback">
              Alamat lengkap harus mencantumkan Jalan, RT, dan RW.
            </div>
          </div>
        </div>
      </div>

      <div class="fw-bold mb-3">Akun Sosial Media Anda</div>
      <div class="row">
        <div class="col-md-6 col-lg-6">
          <div class="input-group mb-3">
            <span class="input-group-text" id="facebook"><i class="bi bi-facebook"></i></span>
            <input type="text" class="form-control" aria-describedby="facebook" v-model="form.facebook" />
          </div>
        </div>

        <div class="col-md-6 col-lg-6">
          <div class="input-group mb-3">
            <span class="input-group-text" id="instagram"><i class="bi bi-instagram"></i></span>
            <input type="text" class="form-control" aria-describedby="instagram" v-model="form.instagram" />
          </div>
        </div> 
      </div>

      <div class="mb-3">
        <a href="javascript:void(0)" @click="showTermsModal">
          <span class="sk fs-12">Syarat dan Ketentuan</span>
        </a>
      </div>

      <div class="login-btn text-end mb-3">
        <button type="submit" class="btn btn-sm w-100 text-center">Daftar</button>
      </div>
    </form>

    <div class="side-menu-item text-center">
      <a href="/login">
        <span class="ms-3">Sudah punya akun? Masuk Sekarang</span>
      </a>
    </div>

    <!-- modal s&k -->
    <div v-if="isModalVisible" class="modal-overlay bg-white shadow p-3">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <h5 class="text-center">Syarat dan Ketentuan</h5>
        .contain
        <h6 class="text-center mb-4">Karena antusias dari para penulis yang ingin menerbitkan bukunya sangat tinggi, maka Guepedia membuka program penerbitan naskah Harap dibaca dan dipelajari tahap dan syaratnya yaa..</h6>
        <div class="container mt-4">
          <p>
            Isi syarat dan ketentuan Anda di sini. Pastikan mencakup hal-hal penting seperti penggunaan data, hak cipta, dll.
          </p>
        </div>
      </div>
      

    </div>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          name: "",
          pena: "",
          kontak: "",
          email: "",
          password: "",
          password_confirmation: "",
          province: "",
          city: "",
          district: "",
          village: "",
          address: "",
          facebook: "",
          instagram: "",
        },
        provinces: [],
        cities: [],
        districts: [],
        villages: [],
        isModalVisible: false,
      };
    },
    created() {
      this.fetchProvinces();
    },
    metaInfo() {
      return {
        title: 'Daftar',
        meta: [
          { name: 'description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
          { property: 'og:type', content: "website" },
          { property: 'og:url', content: "https://www.guepedia.com/" },
          { property: 'og:title', content: 'Penerbit buku online gratis Indonesia  | Guepedia.com' },
          { property: 'og:description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
        ]
      }
    },
    computed: {
      isAddressValid() {
        const address = this.form.address.toLowerCase()
        const hasStreets = address.includes("jl") || address.includes("jalan") || address.includes("komplek") || address.includes("perumahan")
        const rukun = address.includes("rt") || address.includes("cluster") || address.includes("blok") || address.includes("rw")
        return hasStreets && rukun
      },
    },
    methods: {
      // modal
      showTermsModal() {
        this.isModalVisible = true;
      },

      closeModal() {
        this.isModalVisible = false;
      },

      async fetchProvinces() {
        try {
          const response = await axios.get(
            "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
          );
          this.provinces = response.data;
        } catch (error) {
          console.error("Gagal memuat data provinsi:", error);
        }
      },

      async onProvinceChange() {
        this.cities = [];
        this.form.city = "";
        try {
          const response = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${this.form.province}.json`
          );
          this.cities = response.data;
        } catch (error) {
          console.error("Gagal memuat data kota/kabupaten:", error);
        }
      },

      async onCityChange() {
        this.districts = [];
        this.form.district = "";
        try {
          const response = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${this.form.city}.json`
          );
          this.districts = response.data;
        } catch (error) {
          console.error("Gagal memuat data kecamatan:", error);
        }
      },

      async onDistrictChange() {
        this.villages = [];
        this.form.village = "";
        try {
          const response = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${this.form.district}.json`
          );
          this.villages = response.data;
        } catch (error) {
          console.error("Gagal memuat data kelurahan:", error);
        }
      },

      getProvinceName() {
        const province = this.provinces.find(p => p.id == this.form.province);
        console.log("Nama Provinsi:", province ? province.name : "Tidak ditemukan");
        return province ? province.name : '';
      },

      getCityName() {
        const city = this.cities.find(c => c.id == this.form.city);
        console.log("Nama Kota:", city ? city.name : "Tidak ditemukan");
        return city ? city.name : '';
      },

      getDistrictName() {
        const district = this.districts.find(d => d.id == this.form.district);
        console.log("Nama Kecamatan:", district ? district.name : "Tidak ditemukan");
        return district ? district.name : '';
      },

      getVillageName() {
        const village = this.villages.find(v => v.id == this.form.village);
        console.log("Nama Kelurahan:", village ? village.name : "Tidak ditemukan");
        return village ? village.name : '';
      },

      getFullAddress() {
        return `${this.form.address}, ${this.getVillageName()}, ${this.getDistrictName()}, ${this.getCityName()}, ${this.getProvinceName()}`;
      },
      
     async registerUser() {
  try {
    const provinceName = this.getProvinceName();
    const cityName = this.getCityName();
    const districtName = this.getDistrictName();
    const villageName = this.getVillageName();

    console.log("Province:", provinceName);
    console.log("City:", cityName);
    console.log("District:", districtName);
    console.log("Village:", villageName);

    const fullAddress = `${this.form.address}, ${villageName}, ${districtName}, ${cityName}, ${provinceName}`;
    console.log("Alamat Lengkap yang dikirim:", fullAddress);

    if (!this.provinces.length || !this.cities.length || !this.districts.length || !this.villages.length) {
      alert("Sedang mengambil data wilayah. Silakan tunggu beberapa detik dan coba lagi.");
      return;
    }

    // Validasi address sebelum submit
    if (!this.isAddressValid) {
      alert("Alamat lengkap harus mencantumkan Jalan, RT, dan RW.");
      return;
    }

    const response = await axios.post("/register", {
      nama_lengkap: this.form.name,
      nama_pena: this.form.pena,
      nomor_kontak: this.form.kontak,
      alamat_lengkap: fullAddress,
      email: this.form.email,
      password: this.form.password,
      password_confirmation: this.form.password_confirmation,
      province: this.form.province,
      city: this.form.city,
      district: this.form.district,
      village: this.form.village,
      facebook: this.form.facebook,
      instagram: this.form.instagram,
    });

    // Jika berhasil
    if (response.data.success) {
      alert(response.data.message);
      // Reset form setelah berhasil
      this.resetForm();
    }

  } catch (error) {
    console.error("Error saat registrasi:", error);
    
    if (error.response) {
      // Server merespon dengan error status
      const { data } = error.response;
      
      if (data.message) {
        alert(data.message);
        
        // Handle berdasarkan action dari backend
        if (data.action === 'login') {
          // Redirect ke halaman login setelah 2 detik
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
        // Jika action adalah 'check_email', user tinggal tunggu/cek email
        
      } else if (data.errors) {
        // Handle validation errors dari Laravel
        let errorMessages = [];
        for (let field in data.errors) {
          errorMessages.push(...data.errors[field]);
        }
        alert("Error validasi:\n" + errorMessages.join("\n"));
      } else if (data.data && data.data.error) {
        // Handle error format lama (untuk backward compatibility)
        let errorMessages = [];
        for (let field in data.data.error) {
          errorMessages.push(...data.data.error[field]);
        }
        alert("Error validasi:\n" + errorMessages.join("\n"));
      } else {
        alert("Terjadi kesalahan saat registrasi. Silahkan coba lagi.");
      }
    } else if (error.request) {
      // Network error
      alert("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    } else {
      // Other errors
      alert("Terjadi kesalahan tidak terduga. Silahkan coba lagi.");
    }
  }
},

resetForm() {
  this.form = {
    name: "",
    pena: "",
    kontak: "",
    email: "",
    password: "",
    password_confirmation: "",
    province: "",
    city: "",
    district: "",
    village: "",
    address: "",
    facebook: "",
    instagram: "",
  };
  // Reset dropdown data
  this.cities = [];
  this.districts = [];
  this.villages = [];
},
    },
  };
</script>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }
  .close-button{
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .sk {
    font-size: 14px;
    color: #acacac;
  }
</style>