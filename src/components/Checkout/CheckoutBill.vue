<template>
  <div class="checkout-bill">
    <div class="side-detail card shadow p-3 mb-5">
      <b-button
        type="button"
        class="btn btn-sm border-0 shadow-sm promo-btn"
        @click="getDiscount"
      >
        Gunakan Promo atau Kupon
      </b-button>

      <div class="side-detail-item mt-4">
        <div class="side-detail-title mb-3">
          <div class="cart-title">Ringkasan Belanja Anda</div>
          <hr class="price-line" />

          <div class="cart-summary-total-item mb-2 d-flex">
            <div class="total-item-title">{{ totalQty }} Barang</div>
            <div class="total-item-value ms-auto fw-bold">
              {{ totalPrice | currency }}
            </div>
          </div>

          <div class="cart-summary-discount mb-2 d-flex" v-if="discount[0]">
            <div class="total-item-title">
              Diskon {{ discount[0].name }} <span v-if="discount[0].value <= 100">({{ discount[0].value }}%)</span>
            </div>
            <div class="total-item-value ms-auto">
              <span v-if="discount[0].value <= 100">
                {{ ((discount[0].value / 100) * totalPrice) | currency }}
              </span>
              <span v-else>
                {{ discount[0].value | currency }}
              </span>
            </div>
          </div>

          <div class="cart-summary-discount mb-2 d-flex" v-if="reseller">
            <div class="total-item-title">
              Saldo Deposit Reseller
            </div>
            <div class="total-item-value ms-auto">
              {{ reseller.deposit | currency}}
            </div>
          </div>

          <!-- Fixed Ongkir Display untuk API baru -->
          <div class="cart-summary-total-item mb-2 d-flex" v-if="ongkir[0]">
            <div class="total-item-title fw-bold">
              Ongkir
              <span style="text-transform: uppercase">{{
                ongkir[0].service_courier || ongkir[0].code
              }}</span>
              {{ ongkir[0].service }}
            </div>
            <div class="total-item-value ms-auto">
              {{ ongkir[0].cost | currency }}
            </div>
          </div>

          <div
            class="cart-summary-discount mb-2 d-flex"
            v-if="discount[0] && discount[0].free_ongkir == 1"
          >
            <div class="total-item-title">Promo Free Ongkir</div>
            <div class="total-item-value ms-auto">
              {{ ongkir[0].cost | currency }}
            </div>
          </div>

          <hr />

          <div class="cart-summary-grand-total mb-2 d-flex">
            <div class="total-item-title">Total Bayar</div>
            <div class="total-item-value total ms-auto">
              <span v-if="!reseller">{{ totalBayar | currency }}</span>
              <span v-else>
                <i v-if="totalBayar - reseller.deposit > 0">{{ totalBayar - reseller.deposit | currency }}</i>
                <i v-else>{{ 0 | currency }}</i>
              </span>
            </div>
          </div>
        </div>

        <hr />

        <div class="payment-method">
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="paymentmethod"
          >
            <optgroup>
              <option value="" selected disabled>
                Pilih Metode Pembayaran
              </option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Saldo Royalti" v-if="!reseller">Saldo Royalti</option>
            </optgroup>
          </select>
        </div>
        <hr />
        <p>
          Silahkan melakukan pembayaran dan transfer ke : <br/>
          bank BNI a/n: <b>GUE MEDIA GROUP PT</b> <br />
          <b>NO REKENING : 1819 2000 83</b>
        </p>
        <div class="login-btn text-center" v-if="paymentmethod">
          <button
            type="button"
            class="btn btn-sm"
            v-if="ongkir[0]"
            :disabled="loading"
            @click="postOrder"
          >
            <span v-if="!loading">Proses Pesanan</span>
            <b-spinner
              variant="light"
              small
              label="Spinning"
              v-if="loading"
            ></b-spinner>
          </button>
          <span v-else style="color: red"
            >Silahkan pilih jasa pengiriman untuk dapat melanjutkan
            pemesanan</span
          >
        </div>
      </div>
    </div>

    <!-- Promo Modal -->
    <b-modal
      ref="promoModal"
      title="Gunakan Promo atau Kupon"
      hide-footer
      hide-header-close
      scrollable
      centered
    >
      <div class="input-group promo-form">
        <input
          type="text"
          class="form-control"
          placeholder="Masukkan Kode Promo"
          v-model="promoCode"
        />
        <button
          class="btn btn-outline-secondary px-3"
          type="button"
          @click="applyPromo"
        >
          Terapkan
        </button>
      </div>

      <hr />
      <div class="cart-title">Kupon Saya</div>
      <hr class="price-line" />

      <div class="coupon-area">
        <div
          class="coupon-item shadow-sm border border-3 p-3 mb-3"
          v-for="kupon in coupons"
          :key="kupon.id_data_kupon"
          @click="applyCoupon(kupon)"
        >
          <div class="coupon-title fw-bold">
            <span>{{ kupon.nama_kupon }}</span> (Diskon
            {{ kupon.nilai_kupon }}%)
          </div>
          <div class="coupon-description mb-2">
            <span v-if="kupon.syarat_kupon == 0"
              >Dapatkan potongan harga {{ kupon.nilai_kupon }}% tanpa minimal
              belanja</span
            >
            <span v-else
              >Dapatkan potongan harga {{ kupon.nilai_kupon }}% minimal
              pembelian {{ kupon.syarat_kupon }} buku</span
            >
          </div>
          <div class="coupon-exp" v-if="kupon.tanggal_expired">
            Berlaku sampai tanggal {{ kupon.tanggal_expired }}
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "CheckoutBill",
  components: {},
  data() {
    return {
      loading: false,
      loadingPromo: false,
      coupons: [],
      discounts: [],
      promo: [],

      promoCode: "",
      paymentmethod: "",

      reseller: [],
    };
  },
  methods: {
    ...mapActions(["applyDiscount", "clearState"]),
    
    getDiscount() {
      this.$refs["promoModal"].show();
      this.loading = true;
      axios
        .get("myCoupon", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.coupons = response.data.data.kupon;
          console.log(this.coupons);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    checkReseller(){
      const token = localStorage.getItem('access_token')
      const AuthStr = 'Bearer '+ token; 
      axios.get('checkReseller', { headers: {
          "Access-Control-Allow-Headers" : "*",
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : AuthStr
          }
      }).then(response => {
          this.reseller = response.data.data.isReseller

          if (!this.discount[0]) {
            if(this.reseller != null) {
              var diskon = [];
              diskon["value"] = 15;
              diskon["name"] = 'Reseller';
              diskon["type"] = "promo";
              diskon["reseller"] = this.reseller.slug;

              this.applyDiscount(diskon);
            }
          }
        })
      .catch(error => console.log(error));
    },

    applyPromo() {
      this.loadingPromo = true;

      var formData = new FormData();
      formData.append("kode", this.promoCode);

      axios
        .post("getPromo", formData, {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.promo = response.data.data.promo;
          if (this.totalQty < this.promo.minimum) {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              "Jumlah belanja anda tidak memenuhi syarat penggunaan promo ini"
            );
          } else {
            console.log(this.promo);

            var diskon = [];
            diskon["id"] = this.promo.id_data_kode_promo;
            diskon["value"] = this.promo.nilai_promo;
            diskon["name"] = this.promo.kode_promo;
            diskon["type"] = "promo";
            diskon["free_ongkir"] = this.promo.free_ongkir;

            this.applyDiscount(diskon);

            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              "Kode Promo Berhasil Ditambahkan"
            );
          }
        })
        .catch((error) => {
          this.openNotification(
            6000,
            "top-right",
            "danger",
            "Failed",
            error.response.data.message
          );
        })
        .finally(() => (this.loadingPromo = false));
    },

    applyCoupon(coupon) {
      if (this.totalQty < coupon.syarat_kupon) {
        this.openNotification(
          6000,
          "top-right",
          "danger",
          "Failed",
          "Quantity Belanja Anda Tidak Memenuhi Syarat Penggunaan Kupon Ini, Silahkan Gunakan Kupon yang Lainnya"
        );
      } else {
        var diskon = [];
        diskon["id"] = coupon.id_data_kupon;
        diskon["value"] = coupon.nilai_kupon;
        diskon["name"] = coupon.nama_kupon;
        diskon["type"] = "kupon";

        this.applyDiscount(diskon);

        this.openNotification(
          6000,
          "top-right",
          "success",
          "Success",
          "Kupon Berhasil Digunakan"
        );

        this.$refs['promoModal'].hide();
      }
    },

    // FIXED: Perbaikan postOrder method
  postOrder() {
  // Validate required data
  if (!this.ongkir || !this.ongkir[0]) {
    this.openNotification(
      6000,
      "top-right",
      "danger",
      "Error",
      "Silahkan pilih jasa pengiriman terlebih dahulu"
    );
    return;
  }

  if (!this.cart || this.cart.length === 0) {
    this.openNotification(
      6000,
      "top-right",
      "danger", 
      "Error",
      "Keranjang belanja kosong"
    );
    return;
  }

  this.loading = true;

  // Prepare data dalam format yang sama dengan kode lama
  var cart = JSON.stringify(this.cart);
  var discount = JSON.stringify(this.discount);
  var ongkir = JSON.stringify(this.ongkir);
  var totalWeight = this.cart.reduce((a, b) => a + (parseInt(b.qty) * parseInt(b.berat_buku)), 0);

  // Menggunakan FormData seperti kode lama
  var formData = new FormData();
  formData.append("cart", cart);
  formData.append("discount", discount);
  formData.append("ongkir", ongkir);
  formData.append("metode_pembayaran", this.paymentmethod);
  formData.append("total_payment", this.totalBayar);
  formData.append("total_weight", totalWeight);
  formData.append("subtotal", this.totalPrice);

  if(this.reseller && this.reseller.deposit){
    formData.append("deposit", this.reseller.deposit);
  }

  console.log('FormData contents:');
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  axios
    .post("order", formData, {
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "multipart/form-data", // Penting: gunakan multipart/form-data untuk FormData
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

      this.$router.push({ name: "Transaction" });

      // Kosongi Vuex State
      this.clearState();
    })
    .catch((error) => {
      console.error('Order Error:', error);
      
      let errorMessage = 'Terjadi kesalahan saat memproses pesanan';
      
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.errors) {
          // Handle validation errors
          const errors = error.response.data.errors;
          errorMessage = Object.keys(errors).map(key => 
            `${key}: ${errors[key].join(', ')}`
          ).join('\n');
        }
      }

      this.openNotification(
        6000,
        "top-right",
        "danger",
        "Error",
        errorMessage
      );
    })
    .finally(() => {
      this.loading = false;
    });
},
  },
  
  mounted(){
    this.checkReseller()
    if (this.discount[0] && this.discount[0].value) {
      console.log(this.discount[0].value)
    }
  },
  
  computed: {
    ...mapGetters(["cart", "ongkir", "discount"]),
    
    totalQty() {
      return this.cart.reduce((a, b) => a + parseInt(b.qty), 0);
    },
    
    totalPrice() {
      return this.cart.reduce((a, b) => a + (parseInt(b.qty) * parseInt(b.harga)), 0);
    },
    
    totalBayar() {
      let total = this.totalPrice;
      
      // Apply discount
      if (this.discount[0]) {
        const discountValue = parseFloat(this.discount[0].value) || 0;
        
        if (discountValue <= 100) {
          // Percentage discount
          total = total - ((discountValue / 100) * total);
        } else {
          // Fixed amount discount
          total = total - discountValue;
        }
      }
      
      // Add shipping cost (if not free shipping)
      if (this.ongkir[0]) {
        const shippingCost = parseInt(this.ongkir[0].cost) || 0;
        
        // Check if discount includes free shipping
        if (!this.discount[0] || this.discount[0].free_ongkir != "1") {
          total = total + shippingCost;
        }
      }
      
      return Math.max(0, total); // Ensure total is not negative
    },
  },
  
  watch: {
    cart: {
      handler(cart) {
        console.log('Cart updated:', cart);
      },
      deep: true,
    },

    ongkir: {
      handler(ongkir) {
        console.log('Ongkir updated:', ongkir);
      },
      deep: true,
    },

    discount: {
      handler(discount) {
        console.log('Discount updated:', discount);
      },
      deep: true,
    },
  },
};
</script>

<style>
.total {
  font-size: 1.5em;
}
</style>