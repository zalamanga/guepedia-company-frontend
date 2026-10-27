<template>
  <div class="bill">
    <div class="side-detail card shadow p-3 mb-5">
      <!-- <button
        type="button"
        class="btn btn-sm btn-outline-secondary shadow-sm promo-btn"
        data-bs-toggle="modal"
        data-bs-target="#promoModal"
      >
        Gunakan Promo atau Kupon
      </button> -->

      <div class="side-detail-item">
        <div class="side-detail-title mb-3">
          <div class="cart-title">Ringkasan Belanja Anda</div>
          <hr class="price-line" />

          <div class="cart-summary-total-item mb-2 d-flex">
            <div class="total-item-title">{{totalQty}} Barang</div>
            <div class="total-item-value ms-auto fw-bold">{{totalPrice | currency}}</div>
          </div>

          <!-- <div class="cart-summary-discount mb-2 d-flex">
            <div class="total-item-title">Diskon 12.12 (30%)</div>
            <div class="total-item-value ms-auto">Rp. 300.000</div>
          </div>

          <div class="cart-summary-total-item mb-2 d-flex">
            <div class="total-item-title fw-bold">Ongkir JNE REG</div>
            <div class="total-item-value ms-auto">Rp. 25.000</div>
          </div>

          <hr /> -->

          <!-- <div class="cart-summary-grand-total mb-2 d-flex">
            <div class="total-item-title">Total Bayar</div>
            <div class="total-item-value ms-auto">Rp. 25.000</div>
          </div> -->
        </div>

        <hr />

        <div class="login-btn text-center">
          <b-link :to="'checkout'">
            <button type="button" class="btn btn-sm">Checkout</button>
          </b-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {},
  computed: {
    ...mapGetters(["cart"]),
    totalQty() {
      return this.cart.reduce((a, b) => a + b.qty, 0);
    },
    totalPrice() {
      return this.cart.reduce((a, b) => a + b.qty * b.harga, 0);
    },
  },
  watch: {
    cart: {
      handler(cart) {
        console.log(cart);
      },
      deep: true,
    },
  },
};
</script>
