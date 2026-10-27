<template>
  <div class="checkout-info">
    <div class="address-data">
      <div class="cart-title">Alamat Pengiriman</div>
      <hr class="price-line" />

      <div class="address-detail">
        <div class="receiver d-flex">
          <div class="receiver-detail me-3" v-if="alamat">
            <span class="fw-bold">{{ alamat.nama_penerima }}</span> ({{
              alamat.nomor_kontak
            }})
          </div>
          <button
            type="button"
            class="btn btn-light edit-address-btn fw-bold"
            @click="showAddressModal"
          >
            <span v-if="alamat">Ubah Alamat Pengiriman</span>
            <span v-else>Atur Alamat Pengiriman</span>
          </button>
        </div>

        <div class="address" v-if="alamat">
          {{ alamat.alamat_lengkap }}<br />
          {{ alamat.nama_kecamatan }} - {{ alamat.nama_kota }} -
          {{ alamat.nama_provinsi }} {{ alamat.kode_pos }}
        </div>
      </div>
    </div>

    <hr />

    <div class="shipping-detail">
      <div class="cart-title">Kurir Pengiriman</div>
      <hr class="price-line" />

      <div class="shipping">
        <div class="row align-items-center" v-if="ongkir[0]">
          <div class="col-md-6 col-lg-6 col-12 col-sm-12">
            <div class="shipping-item">
              <div class="fw-bold">
                {{ ongkir[0].service_name }} ({{ ongkir[0].service }})
              </div>
              <div class="shipping-service">
                {{ ongkir[0].description }}
                <span v-if="ongkir[0].etd">
                  Perkiraan {{ ongkir[0].etd }}
                </span>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-6 col-12 col-sm-12">
            <div class="shipping-item fw-bold text-end">
              {{ ongkir[0].cost | currency }}
            </div>
          </div>
        </div>

        <div class="col-md-3 col-lg-3 col-12 col-sm-12 mt-3">
          <button
            type="button"
            class="btn btn-light edit-address-btn fw-bold"
            @click="getOngkir"
            :disabled="!alamat || !alamat.subdistrict_id"
          >
            <span v-if="ongkir[0]">Ubah Jasa Pengiriman</span>
            <span v-else>Pilih Jasa Pengiriman</span>
          </button>
        </div>
      </div>
    </div>

    <hr />

    <div class="cart-title">Data Belanja Anda</div>
    <hr class="price-line" />

    <div class="cart-area my-3">
      <div class="cart-item" v-for="item in cart" :key="item.id_file_naskah">
        <div class="row align-items-center">
          <div class="col-md-1 col-lg-1 col-3 col-sm-3">
            <img
              :src="item.file_cover | cover"
              class="card-img-top product-image"
            />
          </div>
          <div class="col-md-6 col-lg-6">
            <div class="cart-product-title">{{ item.judul }}</div>
          </div>
          <div class="col-md-3 col-lg-3">
            <div class="qty-checkout">
              {{ item.qty }} x {{ item.harga | currency }}
            </div>
          </div>
          <div class="col-md-2 col-lg-2">
            <div class="cart-product-price text-right">
              {{ item.total_price_item | currency }}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>

    <!-- ongkir modal -->
    <b-modal
      title="Pilih Kurir Pengiriman"
      ref="ongkirModal"
      hide-footer
      hide-header-close
      size="lg"
    >
      <div v-if="loadingOngkir" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <p>Mengambil data ongkir...</p>
      </div>

      <div v-else>
        <!-- Group berdasarkan courier -->
        <div
          class="shipping-detail mb-4"
          v-for="courier in groupedOngkir"
          :key="courier.code"
        >
          <div class="cart-title">{{ courier.name }}</div>
          <hr class="price-line" />

          <div
            class="shipping mb-2 p-3 border rounded cursor-pointer"
            v-for="service in courier.services"
            :key="service.service"
            @click="selectedOngkir(service)"
            style="cursor: pointer; transition: all 0.2s;"
            @mouseover="$event.target.style.backgroundColor = '#f8f9fa'"
            @mouseleave="$event.target.style.backgroundColor = 'white'"
          >
            <div class="row align-items-center">
              <div class="col-md-6 col-lg-6 col-12 col-sm-12">
                <div class="shipping-item">
                  <div class="fw-bold">
                    {{ service.description }} ({{ service.service }})
                  </div>
                  <div class="shipping-service text-muted">
                    <span v-if="service.etd">Estimasi: {{ service.etd }}</span>
                    <span v-else>Estimasi: -</span>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-lg-4 col-12 col-sm-12">
                <div class="shipping-item fw-bold text-primary">
                  {{ service.cost | currency }}
                </div>
              </div>

              <div class="col-md-2 col-lg-2 col-12 col-sm-12 text-right">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                >
                  Pilih
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!groupedOngkir.length && !loadingOngkir" class="text-center text-muted">
          <p>Tidak ada layanan pengiriman tersedia</p>
        </div>
      </div>
    </b-modal>

    <b-modal ref="editAddress" centered scrollable hide-header hide-footer size="lg">
      <edit-address/>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

import EditAddress from "@/components/AccountPage/Account/Modal/EditAddress";
export default {
  components:{
    EditAddress
  },
  data() {
    return {
      alamat: [],
      data_ongkir: [],
      loading: false,
      loadingOngkir: false,
    };
  },
  computed: {
    ...mapGetters(["cart", "ongkir"]),
    
    // Group ongkir berdasarkan courier
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
    ...mapActions(["selectOngkir"]),

    showAddressModal() {
      this.$refs['editAddress'].show();
    },

    getAlamat() {
      this.loading = true;
      axios
        .get("myaddress", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.alamat = response.data.data.alamat;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    selectedOngkir(service) {
      // Format data sesuai dengan yang diharapkan Vuex store
      const ongkirData = {
        service: service.service,
        description: service.description,
        cost: service.cost,
        etd: service.etd,
        service_courier: service.code,
        service_name: service.name
      };

      this.selectOngkir(ongkirData);
      this.$refs["ongkirModal"].hide();
    },

    getOngkir() {
      if (!this.alamat || !this.alamat.subdistrict_id) {
        alert('Silahkan lengkapi alamat pengiriman terlebih dahulu');
        return;
      }

      this.$refs["ongkirModal"].show();
      this.loadingOngkir = true;
      
      const subdistrict = this.alamat.subdistrict_id;
      const totalWeight = this.cart.reduce((a, b) => a + (b.qty * b.berat_buku), 0);

      // Gunakan format data sesuai API baru
      const requestData = {
        destination: subdistrict,
        origin: "790", // Sesuaikan dengan lokasi toko Anda
        weight: totalWeight,
        price: "lowest" // atau "highest" sesuai kebutuhan
      };

      axios
        .post("getOngkir", requestData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log('Ongkir Response:', response.data);
          
          if (response.data.success && response.data.data.ongkir) {
            this.data_ongkir = response.data.data.ongkir;
          } else {
            console.error('Invalid ongkir response format');
            this.data_ongkir = [];
          }
        })
        .catch((error) => {
          console.error('Error getting ongkir:', error);
          this.data_ongkir = [];
          
          if (error.response && error.response.data && error.response.data.message) {
            alert('Error: ' + error.response.data.message);
          } else {
            alert('Terjadi kesalahan saat mengambil data ongkir');
          }
        })
        .finally(() => (this.loadingOngkir = false));
    },
  },

  mounted() {
    this.getAlamat();
  },
  
  watch: {
    cart: {
      handler(cart) {
        // console.log(cart);
      },
      deep: true,
    },

    ongkir: {
      handler(ongkir) {
        // console.log(ongkir);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>