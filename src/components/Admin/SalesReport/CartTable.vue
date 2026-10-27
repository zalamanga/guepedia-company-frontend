<template>
  <div class="cart">
    <div class="cart-title">Keranjang Belanja Anda</div>
    <hr class="price-line" />
    <div class="cart-area my-3">
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th> Id Penulis </vs-th>
            <vs-th> Judul Buku </vs-th>
            <vs-th> Penulis </vs-th>
            <vs-th> QTY </vs-th>
            <vs-th> Sub Total </vs-th>
            <vs-th> Diskon </vs-th>
            <vs-th> Nilai Diskon </vs-th>
            <vs-th> Bagi Hasil </vs-th>
            <vs-th> Bersih </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(item, i) in cart" :data="item">
            <vs-td>{{ item.id_account }}</vs-td>
            <vs-td>
              <div class="row align-items-center">
                <div class="col-md-2 col-lg-2">
                  <img
                    :src="item.file_cover | cover"
                    class="card-img-top product-image"
                  />
                </div>
                <div class="col-md-10 col-lg-10">
                  <div class="cart-product-title">{{ item.judul }}</div>
                  <div class="cart-product-qty">
                    {{ item.harga | currency }}
                  </div>
                </div>
              </div>
            </vs-td>
            <vs-td>{{ item.penulis }}</vs-td>
            <vs-td style="width: 15%">
              <div class="cart-qty-form d-flex">
                <button
                  type="button"
                  class="cart-btn"
                  @click="reduceQty(item.id_file_naskah)"
                >
                  <b-icon icon="dash"></b-icon>
                </button>
                <input
                  type="number"
                  class="form-control cart-qty"
                  :value="item.qty"
                  disabled
                />
                <button
                  type="button"
                  class="cart-btn"
                  @click="addQty(item.id_file_naskah)"
                >
                  <b-icon icon="plus"></b-icon>
                </button>
                <button
                  type="button"
                  class="cart-btn"
                  @click="removeItem(item.id_file_naskah)"
                >
                  <b-icon icon="trash"></b-icon>
                </button>
              </div>
            </vs-td>

            <vs-td style="width: 15%">
              {{ hitungSubTotal(item) | currency }}
            </vs-td>

            <vs-td style="width: 15%">
              <div class="cart-qty-form d-flex">
                <input
                  type="number"
                  class="form-control cart-qty"
                  :value="item.discount"
                  @input="e => setDiscount(item.id_file_naskah, e)"
                  min="0"
                  max="100"
                />
              </div>
            </vs-td>

            <vs-td id="diskon" style="width: 10%">
              {{ hitungNilaiDiskon(item) | currency }}
            </vs-td>
            <vs-td id="bagi-hasil" style="width: 10%">
              {{ hitungBagiHasil(item) | currency }}
            </vs-td>
            <vs-td id="bersih" style="width: 10%">
              {{ hitungBersih(item) | currency }}
            </vs-td>
          </vs-tr>
          <vs-tr class="fw-bold">
            <vs-td colspan="4" class="text-end">Sub Total Barang</vs-td>
            <vs-td colspan="4">{{ totalPrice | currency }}</vs-td>
          </vs-tr>
          <vs-tr class="fw-bold text-danger">
            <vs-td colspan="4" class="text-end">Total Diskon</vs-td>
            <vs-td colspan="4">{{ totalDiskon | currency }}</vs-td>
          </vs-tr>
          <vs-tr class="fw-bold">
            <vs-td colspan="2" class="text-end">Jasa Pengiriman</vs-td>
            <vs-td colspan="2" class="text-end">
              <select
                class="form-control text-end"
                aria-label="Default select example"
                v-model="ongkir.service"
              >
                <option selected disabled>Jasa Pengiriman</option>
                <option value="JNE OKE">JNE OKE</option>
                <option value="JNE REG">JNE REG</option>
                <option value="JNE YES">JNE YES</option>
                <option value="JNE CTC">JNE CTC</option>
                <option value="JNE JTR">JNE JTR</option>
                <option value="SICEPAT REG">SICEPAT REG</option>
                <option value="SICEPAT BEST">SICEPAT BEST</option>
                <option value="SICEPAT HALU">SICEPAT HALU</option>
                <option value="SICEPAT GOKIL">SICEPAT GOKIL</option>
                <option value="SICEPAT SI UNTUNG">SICEPAT SI UNTUNG</option>
                <option value="JNT REGULER">JNT REGULER</option>
                <option value="ANTER AJA REGULER">ANTER AJA REGULER</option>
                <option value="ANTER AJA NEXT DAY">ANTER AJA NEXT DAY</option>
                <option value="ANTER AJA ECONOMY">ANTER AJA ECONOMY</option>
                <option value="SHOPEE EXPRESS">SHOPEE EXPRESS</option>
                <option value="LION PARCEL REGPACK">LION PARCEL REGPACK</option>
                <option value="LION PARCEL ONEPACK">LION PARCEL ONEPACK</option>
                <option value="LION PARCEL JAGOPACK">LION PARCEL JAGOPACK</option>
                <option value="LION PARCEL BIGPACK">LION PARCEL BIGPACK</option>
                <option value="NINJA REGULER">NINJA REGULER</option>
                <option value="NINJA SAMEDAY">NINJA SAMEDAY</option>
                <option value="NINJA CARGO">NINJA CARGO</option>
                <option value="LAZADA EXPRESS">LAZADA EXPRESS</option>
                <option value="LAZADA EKONOMI">LAZADA EKONOMI</option>
                <option value="LAZADA STANDARD">LAZADA STANDARD</option>
                <option value="GRAB">Grab</option>
                <option value="GOJEK">Gojek</option>
              </select>
            </vs-td>
            <vs-td>
              <input
                type="number"
                class="form-control"
                v-model.number="ongkir.amount"
                min="0"
              />
            </vs-td>
          </vs-tr>
          <vs-tr class="fw-bold">
            <vs-td colspan="2" class="text-end">Pemasukan</vs-td>
            <vs-td colspan="3">
              <input
                type="number"
                class="form-control"
                v-model.number="form.pemasukan"
                min="0"
              />
            </vs-td>
          </vs-tr>
          <vs-tr class="fw-bold">
            <vs-td colspan="4" class="text-end">Total Bayar</vs-td>
            <vs-td colspan="4">{{ totalBayar | currency }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <hr />

    <div class="row">
      <div class="col-md-6">
        <h5>Detail Pengiriman</h5>
        <hr class="price-line" />

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Nama Penerima</label
            >
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              v-model="form.penerima"
              :class="{ 'is-invalid': validationErrors.penerima }"
            />
            <div v-if="validationErrors.penerima" class="invalid-feedback">
              {{ validationErrors.penerima }}
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Nomor Kontak</label
            >
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              v-model="form.kontak"
              :class="{ 'is-invalid': validationErrors.kontak }"
            />
            <div v-if="validationErrors.kontak" class="invalid-feedback">
              {{ validationErrors.kontak }}
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Alamat Lengkap</label
            >
            <textarea 
              class="form-control" 
              rows="6" 
              v-model="form.alamat"
              :class="{ 'is-invalid': validationErrors.alamat }"
            ></textarea>
            <div v-if="validationErrors.alamat" class="invalid-feedback">
              {{ validationErrors.alamat }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-check-label" for="flexCheckDefault">
            Platform Pesanan
          </label>
          <select 
            class="form-control" 
            v-model="form.penjualan"
            :class="{ 'is-invalid': validationErrors.penjualan }"
          >
            <option selected disabled>Pilih Platform</option>
            <option value="Store Guepedia">Store Guepedia</option>
            <option value="Guepedia.com">Guepedia.com</option>
            <option value="Bukalapak">Bukalapak</option>
            <option value="Tokopedia">Tokopedia</option>
            <option value="Shopee">Shopee</option>
            <option value="Lazada">Lazada</option>
            <option value="Tiktok">TikTok</option>
            <option value="Whatsapp">Whatsapp</option>
            <option value="Instagram">Instagram</option>
            <option value="Retur">Retur</option>
            <option value="FREE ISBN">FREE ISBN</option>
            <option value="FREE REVIEW">FREE REVIEW</option>
          </select>
          <div v-if="validationErrors.penjualan" class="invalid-feedback">
            {{ validationErrors.penjualan }}
          </div>
        </div>
        <div class="mb-3">
          <b-form-checkbox
            v-model="form.cashless"
            name="checkbox-1"
            value="1"
            unchecked-value="0"
          >
          <label class="form-check-label ms-3" for="flexCheckDefault">
            Cashless
          </label>
          </b-form-checkbox>
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Kode Booking</label
          >
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            v-model="form.booking"
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Catatan Pengiriman</label
          >
          <textarea class="form-control" v-model="form.catatan"></textarea>
        </div>

        <div class="center">
          <vs-button 
            type="submit" 
            success 
            block 
            class="text-uppercase" 
            @click="SimpanPenjualan"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Menyimpan...</span>
            <span v-if="!isSubmitting">Simpan Pesanan</span>
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["cart"]),
    
    totalPrice() {
      return this.cart.reduce((a, b) => {
        const harga = parseFloat(b.harga) || 0;
        const qty = parseInt(b.qty) || 0;
        return a + (qty * harga);
      }, 0);
    },

    totalDiskon() {
      return this.cart.reduce((a, b) => {
        const harga = parseFloat(b.harga) || 0;
        const qty = parseInt(b.qty) || 0;
        const discount = parseFloat(b.discount) || 0;
        return a + (qty * harga * discount / 100);
      }, 0);
    },

    totalBayar() {
      const ongkirAmount = parseFloat(this.ongkir.amount) || 0;
      return this.totalPrice + ongkirAmount - this.totalDiskon;
    },
  },
  
  data() {
    return {
      ongkir: {
        service: "",
        amount: 0,
      },
      form: {
        penerima: "",
        kontak: "",
        alamat: "",
        note: "",
        penjualan: "",
        booking: "",
        cashless: "",
        catatan: "",
        pemasukan: 0,
      },
      selectedItemId: null,
      isSubmitting: false,
      validationErrors: {}
    };
  },
  
  methods: {
    ...mapActions(["addQty", "reduceQty", "removeItem", "setProductDiscount", "clearState"]),
    
    setDiscount(id, e) {
      // Pastikan nilai discount adalah number dan dalam range 0-100
      let discountValue = parseFloat(e.target.value) || 0;
      if (discountValue < 0) discountValue = 0;
      if (discountValue > 100) discountValue = 100;
      
      this.setProductDiscount({id, value: discountValue});
      console.log(this.cart);
    },
    
    updateHargaMp(value) {
      if(value) {
          this.cart.forEach((item)=> {
            item.harga_mp = parseFloat(value) || 0;
          })
      }
    },

    // Hitung subtotal untuk setiap item
    hitungSubTotal(item) {
      const harga = parseFloat(item.harga) || 0;
      const qty = parseInt(item.qty) || 0;
      return harga * qty;
    },

    hitungNilaiDiskon(item) {
      // Pastikan semua nilai adalah number
      const harga = parseFloat(item.harga) || 0;
      const qty = parseInt(item.qty) || 0;
      const discount = parseFloat(item.discount) || 0;
      
      const totalHargaBuku = harga * qty;
      const nilaiDiskon = totalHargaBuku * (discount / 100);
      return nilaiDiskon;
    },

    hitungBagiHasil(item) {
      // Pastikan semua nilai adalah number
      const harga = parseFloat(item.harga) || 0;
      const qty = parseInt(item.qty) || 0;
      const discount = parseFloat(item.discount) || 0;
      
      // Harga Jual setelah diskon
      const hargaJualSetelahDiskon = harga * qty * (1 - (discount / 100));
      
      // Bagi Hasil Penulis: (Harga Jual setelah diskon) * 15%
      // Tapi jika platform tertentu, bagi hasil = 0
      if (this.form.penjualan && ['Retur', 'FREE ISBN', 'FREE REVIEW'].includes(this.form.penjualan)) {
        return 0;
      }
      
      return hargaJualSetelahDiskon * 0.15;
    },

    hitungBersih(item) {
      // Pastikan semua nilai adalah number
      const harga = parseFloat(item.harga) || 0;
      const qty = parseInt(item.qty) || 0;
      const discount = parseFloat(item.discount) || 0;
      
      const totalHargaBuku = harga * qty;
      const nilaiDiskon = totalHargaBuku * (discount / 100);
      const bagiHasil = this.hitungBagiHasil(item);
      
      // Bersih = total harga - diskon - bagi hasil
      const bersih = totalHargaBuku - nilaiDiskon - bagiHasil;
      
      return bersih;
    },

    // Method tambahan untuk memastikan data numeric di seluruh cart
    ensureNumericCart() {
      this.cart.forEach(item => {
        item.harga = parseFloat(item.harga) || 0;
        item.qty = parseInt(item.qty) || 0;
        item.discount = parseFloat(item.discount) || 0;
      });
    },

    // RESET SEMUA DATA OTOMATIS - DIPANGGIL SETELAH SUKSES SIMPAN
    resetAllData() {
      // Reset form pengiriman
      this.form = {
        penerima: "",
        kontak: "",
        alamat: "",
        note: "",
        penjualan: "",
        booking: "",
        cashless: "",
        catatan: "",
        pemasukan: 0,
      };

      // Reset ongkir
      this.ongkir = {
        service: "",
        amount: 0,
      };

      // Clear validation errors
      this.validationErrors = {};

      // Clear cart dari Vuex store
      this.clearState();

      // Reset submitting state
      this.isSubmitting = false;
    },

    // Validasi form sebelum submit
    validateForm() {
      this.validationErrors = {};

      // Validasi Cart
      if (this.cart.length === 0) {
        this.openNotification(
          6000,
          "top-right",
          "danger",
          "Gagal",
          "Keranjang belanja masih kosong"
        );
        return false;
      }

      // Validasi Detail Pengiriman
      const requiredFields = [
        { field: 'penerima', message: 'Nama Penerima harus diisi' },
        { field: 'kontak', message: 'Nama Kontak harus diisi' },
        { field: 'alamat', message: 'Alamat Lengkap harus diisi' },
        { field: 'penjualan', message: 'Platform Pesanan harus dipilih' }
      ];

      let hasError = false;
      for (let item of requiredFields) {
        if (!this.form[item.field] || this.form[item.field].trim() === '') {
          this.validationErrors[item.field] = item.message;
          hasError = true;
        }
      }

      // Validasi Ongkir
      if (!this.ongkir.service) {
        this.openNotification(
          6000,
          "top-right",
          "danger",
          "Gagal",
          "Harap pilih Jasa Pengiriman"
        );
        return false;
      }

      // Validasi Pemasukan - harus lebih besar dari 0
      const pemasukan = parseFloat(this.form.pemasukan) || 0;
      if (pemasukan <= 0) {
        this.openNotification(
          6000,
          "top-right",
          "danger",
          "Gagal",
          "Harap isi Pemasukan dengan benar (harus lebih dari 0)"
        );
        return false;
      }

      if (hasError) {
        this.openNotification(
          6000,
          "top-right",
          "danger",
          "Gagal",
          "Harap lengkapi semua field yang wajib diisi"
        );
        return false;
      }

      return true;
    },

    SimpanPenjualan() {
      // Validasi form
      if (!this.validateForm()) {
        return;
      }

      // Pastikan semua data cart numeric sebelum dikirim
      this.ensureNumericCart();

      this.isSubmitting = true;

      let cartToSend = JSON.parse(JSON.stringify(this.cart));
      
      cartToSend = cartToSend.map(item => {
        // Pastikan semua nilai adalah number - PENTING!
        const harga = parseFloat(item.harga) || 0;
        const qty = parseInt(item.qty) || 0;
        const discount = parseFloat(item.discount) || 0;
        
        // Hitung total harga buku
        const totalHargaBuku = harga * qty;
        
        // Hitung nilai diskon
        const nilaiDiskon = totalHargaBuku * (discount / 100);
        
        // Hitung royalti - bergantung platform
        let royalti = 0;
        if (!['Retur', 'FREE ISBN', 'FREE REVIEW'].includes(this.form.penjualan)) {
          royalti = (totalHargaBuku - nilaiDiskon) * 0.15;
        }
        
        // Hitung bersih: total harga - diskon - royalti
        const bersih = totalHargaBuku - nilaiDiskon - royalti;
        
        return {
          ...item,
          harga: harga,           // Pastikan numeric
          qty: qty,               // Pastikan numeric
          discount: discount,     // Pastikan numeric
          harga_mp: harga,
          total_price_item: totalHargaBuku,
          nilai_diskon: nilaiDiskon,
          royalti: royalti,
          bersih: bersih
        };
      });
      
      // Pastikan totalDiscount numeric
      var totalDiscount = this.cart.reduce((a, b) => {
        const discount = parseFloat(b.discount) || 0;
        return a + discount;
      }, 0);

      var formData = new FormData();

      // Gunakan cartToSend yang sudah diperbaiki
      formData.append("cart", JSON.stringify(cartToSend));
      formData.append("totalDiskon", this.totalDiskon.toString());
      formData.append("penerima", this.form.penerima);
      formData.append("kontak", this.form.kontak);
      formData.append("alamat", this.form.alamat);
      formData.append("totalBayar", this.totalBayar.toString());
      formData.append("service", this.ongkir.service);
      formData.append("ongkir", (parseFloat(this.ongkir.amount) || 0).toString()); // Pastikan numeric
      formData.append("diskon_total", totalDiscount.toString());
      formData.append("totalBelanja", this.totalPrice.toString());
      formData.append("penjualan", this.form.penjualan);
      formData.append("kode_booking", this.form.booking || "");
      formData.append("cashless", this.form.cashless.toString());
      formData.append("catatan", this.form.catatan || "");
      formData.append("pemasukan", (parseFloat(this.form.pemasukan) || 0).toString()); // Pastikan numeric

      axios
        .post("simpanPenjualan", formData, {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
            'Authorization': 'Bearer '+ localStorage.getItem('admin_access_token')
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
          
          // OTOMATIS RESET SEMUA DATA SETELAH BERHASIL SIMPAN
          this.resetAllData();
        })
        .catch((error) => {
          this.isSubmitting = false;
          console.error('Error details:', error.response?.data);
          this.openNotification(
            6000,
            "top-right",
            "danger",
            "Autentikasi Gagal",
            error.response?.data?.message || "Terjadi kesalahan saat menyimpan data"
          );
        });
    },
  },
  
  watch: {
    cart: {
      handler(cart) {
        console.log("Cart updated:", cart);
      },
      deep: true,
    },
    
    // Watch perubahan platform untuk mempengaruhi perhitungan bagi hasil
    'form.penjualan': {
      handler(newPlatform) {
        // Trigger recalculation ketika platform berubah
        // karena bagi hasil berbeda untuk platform tertentu
        this.$forceUpdate();
      }
    }
  },
  
  mounted() {
    // Pastikan semua data numeric saat component di-mount
    this.ensureNumericCart();
    
    // Set default pemasukan sama dengan total price jika belum diisi
    if (this.form.pemasukan <= 0 && this.totalPrice > 0) {
      this.form.pemasukan = this.totalPrice;
    }
  }
};
</script>

<style>
.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.cart-btn {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: #f8f9fa;
  cursor: pointer;
}

.cart-btn:hover {
  background: #e9ecef;
}

.cart-qty {
  width: 60px;
  text-align: center;
}

.product-image {
  width: 50px;
  height: 70px;
  object-fit: cover;
}

.cart-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.price-line {
  border: 1px solid #e0e0e0;
  margin: 1rem 0;
}

.fw-bold {
  font-weight: bold !important;
}

.text-danger {
  color: #dc3545 !important;
}

.text-end {
  text-align: right !important;
}

/* Styling tambahan untuk form input */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Responsive table */
@media (max-width: 768px) {
  .cart-qty {
    width: 50px;
  }
  
  .product-image {
    width: 40px;
    height: 60px;
  }
}
</style>