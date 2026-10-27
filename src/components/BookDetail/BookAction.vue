<template>
  <div class="book-action">
    <div class="side-detail card shadow p-3 mb-5">
      <div class="side-detail-item mb-3">
        <div class="side-detail-title mb-3">
          <div class="cart-title">Periksa Ongkos Kirim</div>
          <hr class="price-line" />
        </div>
        <div class="row">
          <!-- Pilih Provinsi -->
          <div class="col-md-12 col-lg-12 col-12 col-sm-12 mb-3">
            <v-select 
              label="name" 
              placeholder="Pilih Provinsi"
              @input="getCity"
              :options="provinces" 
              v-model="selectedProvince"
              :dropdown-should-open="dropdownShouldOpen">
            </v-select>
          </div>

          <!-- Pilih Kota/Kabupaten -->
          <div class="col-md-12 col-lg-12 col-12 col-sm-12 mb-3">
            <v-select 
              label="name"
              placeholder="Pilih Kota/Kabupaten"
              @input="getDistrict"
              :options="cities" 
              v-model="selectedCity"
              :disabled="!selectedProvince"
              :dropdown-should-open="dropdownShouldOpen">
            </v-select>
          </div>

          <!-- Pilih Kecamatan -->
          <div class="col-12 col-sm-12 mb-3">
            <v-select 
              label="name"
              placeholder="Pilih Kecamatan"
              :reduce="district => district.id"
              :options="districts" 
              v-model="selectedDistrict" 
              :disabled="!selectedCity">
            </v-select>
          </div>

          <!-- Input Jumlah Buku -->
          <div class="col-md-6 col-lg-6 col-12 col-sm-12 mb-3">
            <input
              type="number"
              class="form-control"
              placeholder="Jumlah Buku"
              v-model="qty"
              min="1"
            />
          </div>

          <!-- Total Berat (Read-only) -->
          <div class="col-md-6 col-lg-6 col-12 col-sm-12 mb-3">
            <input
              type="text"
              class="form-control"
              :placeholder="`Total Berat: ${totalWeight} gram`"
              :value="`${totalWeight} gram`"
              readonly
            />
          </div>
        </div>

        <div class="action-btn mt-3 text-center">
          <button 
            type="button" 
            class="form-control btn main-btn" 
            @click="getOngkir"
            :disabled="!selectedDistrict || qty < 1 || loadingOngkir"
          >
            <span v-if="!loadingOngkir">Periksa Ongkir</span>
            <span v-else>
              <div class="spinner-border spinner-border-sm me-2" role="status"></div>
              Loading...
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Result Ongkir -->
    <div class="data-ongkir card shadow p-3" v-if="data_ongkir.length > 0">
      <div class="cart-title mb-3">Hasil Pengecekan Ongkir</div>
      <hr class="price-line" />

      <!-- Group berdasarkan courier -->
      <div
        class="service-item mb-4"
        v-for="courier in groupedOngkir"
        :key="courier.code"
      >
        <h6 class="fw-bold text-primary">{{ courier.name }}</h6>
        <hr class="price-line" />

        <div
          class="ongkir-item p-3 mb-2 border rounded"
          v-for="service in courier.services"
          :key="service.service"
          style="background-color: #f8f9fa;"
        >
          <div class="row align-items-center">
            <div class="col-md-8 col-8">
              <div class="ongkir-title">
                <strong>{{ service.description }}</strong> ({{ service.service }})
              </div>
              <div class="ongkir-etd text-muted small">
                <span v-if="service.etd">Estimasi: {{ service.etd }}</span>
                <span v-else>Estimasi: -</span>
              </div>
            </div>
            <div class="col-md-4 col-4 text-end">
              <div class="ongkir-value fw-bold text-success">
                {{ service.cost | currency }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div class="data-ongkir card shadow p-3 text-center" v-else-if="hasSearched && data_ongkir.length === 0">
      <div class="text-muted">
        <i class="fas fa-search mb-3" style="font-size: 2rem;"></i>
        <p>Tidak ada layanan pengiriman tersedia untuk wilayah ini</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "OngkirChecker",
  props: ['book_weight'],
  data() {
    return {
      // Data dropdown
      provinces: [],
      cities: [],
      districts: [],
      
      // Selected values
      selectedProvince: null,
      selectedCity: null,
      selectedDistrict: null,
      
      // Input values
      qty: 1,
      
      // Loading states
      loading: false,
      loadingOngkir: false,
      
      // Results
      data_ongkir: [],
      hasSearched: false
    };
  },
  computed: {
    totalWeight() {
      return this.qty * this.book_weight;
    },
    
    // Group ongkir berdasarkan courier - SAMA dengan checkout
    groupedOngkir() {
      const grouped = {};
      
      this.data_ongkir.forEach(item => {
        if (!grouped[item.code]) {
          grouped[item.code] = {
            code: item.code,
            name: item.name,
            services: []
          };
        }
        
        grouped[item.code].services.push({
          service: item.service,
          description: item.description,
          cost: item.cost,
          etd: item.etd,
          code: item.code,
          name: item.name
        });
      });
      
      return Object.values(grouped);
    }
  },
  methods: {
    dropdownShouldOpen(VueSelect) {
      return VueSelect.search.length !== 0 && VueSelect.open;
    },

    // Get all provinces
    getProvinces() {
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
          this.provinces = response.data.data;
          console.log('Provinces:', this.provinces);
        })
        .catch((error) => {
          console.error('Error getting provinces:', error);
          alert('Gagal memuat data provinsi');
        })
        .finally(() => (this.loading = false));
    },

    // Get cities by province
    getCity() {
      if (!this.selectedProvince) {
        this.cities = [];
        this.districts = [];
        this.selectedCity = null;
        this.selectedDistrict = null;
        return;
      }

      this.loading = true;
      this.cities = [];
      this.districts = [];
      this.selectedCity = null;
      this.selectedDistrict = null;

      axios
        .get(`cities/${this.selectedProvince.id}`, {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.cities = response.data.data;
          console.log('Cities:', this.cities);
        })
        .catch((error) => {
          console.error('Error getting cities:', error);
          alert('Gagal memuat data kota');
        })
        .finally(() => (this.loading = false));
    },

    // Get districts by city
    getDistrict() {
      if (!this.selectedCity) {
        this.districts = [];
        this.selectedDistrict = null;
        return;
      }

      this.loading = true;
      this.districts = [];
      this.selectedDistrict = null;

      axios
        .get(`subdistricts/${this.selectedCity.id}`, {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.districts = response.data.data;
          console.log('Districts:', this.districts);
        })
        .catch((error) => {
          console.error('Error getting districts:', error);
          alert('Gagal memuat data kecamatan');
        })
        .finally(() => (this.loading = false));
    },

    // Get ongkir - SAMA PERSIS dengan checkout
    getOngkir() {
      if (!this.selectedDistrict) {
        alert('Silahkan pilih kecamatan terlebih dahulu');
        return;
      }

      if (this.qty < 1) {
        alert('Jumlah buku minimal 1');
        return;
      }

      // Debug: Cek data yang dipilih
      console.log('Selected Province:', this.selectedProvince);
      console.log('Selected City:', this.selectedCity);
      console.log('Selected District:', this.selectedDistrict);
      console.log('Districts array:', this.districts);

      // Validasi tambahan
      if (typeof this.selectedDistrict !== 'string' && typeof this.selectedDistrict !== 'number') {
        alert('District ID tidak valid: ' + this.selectedDistrict);
        return;
      }

      this.loadingOngkir = true;
      this.data_ongkir = [];
      this.hasSearched = false;

      // Format request data SAMA dengan checkout
      const requestData = {
        destination: String(this.selectedDistrict),  // Pastikan string/number
        origin: "790", // ID district asal (sama dengan checkout)  
        weight: parseInt(this.totalWeight), // Pastikan integer
        price: "lowest" // sama dengan checkout
      };

      console.log('Ongkir Request Data:', requestData);
      console.log('Request Data Types:', {
        destination: typeof requestData.destination,
        origin: typeof requestData.origin,
        weight: typeof requestData.weight,
        price: typeof requestData.price
      });

      axios
        .post("getOngkir", requestData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log('Ongkir Response:', response.data);
          
          this.hasSearched = true;
          
          // Handle response SAMA dengan checkout
          if (response.data.success && response.data.data && response.data.data.ongkir) {
            this.data_ongkir = response.data.data.ongkir;
          } else {
            console.error('Invalid ongkir response format:', response.data);
            this.data_ongkir = [];
          }
        })
        .catch((error) => {
          console.error('Error getting ongkir:', error);
          
          // Debug error response
          if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
            console.log('Error Headers:', error.response.headers);
          }
          
          this.hasSearched = true;
          this.data_ongkir = [];
          
          // Error handling dengan detail lebih banyak
          if (error.response && error.response.data) {
            if (error.response.data.message) {
              alert('Error: ' + error.response.data.message);
            } else if (error.response.data.errors) {
              // Handle validation errors
              const errors = error.response.data.errors;
              let errorMsg = 'Validation Error:\n';
              Object.keys(errors).forEach(field => {
                errorMsg += `${field}: ${errors[field].join(', ')}\n`;
              });
              alert(errorMsg);
            } else {
              alert('Server Error: ' + JSON.stringify(error.response.data));
            }
          } else {
            alert('Terjadi kesalahan saat mengecek ongkir');
          }
        })
        .finally(() => (this.loadingOngkir = false));
    }
  },

  mounted() {
    this.getProvinces();
  },

  watch: {
    qty(newVal) {
      // Reset hasil jika qty berubah
      if (this.hasSearched) {
        this.data_ongkir = [];
        this.hasSearched = false;
      }
    }
  }
};
</script>

<style scoped>
.ongkir-title {
  font-size: 0.95em;
}

.ongkir-value {
  font-size: 1.1em;
}

.ongkir-etd {
  font-size: 0.85em;
}

.main-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.service-item:last-child {
  margin-bottom: 0 !important;
}

.ongkir-item:last-child {
  margin-bottom: 0 !important;
}
</style>