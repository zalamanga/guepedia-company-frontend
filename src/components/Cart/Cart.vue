<template>
  <div class="cart">
    <div class="cart-title">Keranjang Belanja Anda</div>
    <hr class="price-line" />
    <div class="cart-area my-3">
      <div class="cart-item" v-for="item in cart" :key="item.id_file_naskah">
        <div class="row align-items-center">
          <div class="col-md-1 col-lg-1">
            <img
              :src="item.file_cover | cover"
              class="card-img-top product-image"
            />
          </div>
          <div class="col-md-6 col-lg-6">
            <div class="cart-product-title">{{item.judul}}</div>
            <div class="cart-product-qty">{{item.harga | currency}}</div>
          </div>
          <div class="col-md-3 col-lg-3">
            <div class="cart-qty-form d-flex">
              <button type="button" class="cart-btn" @click="reduceQty(item.id_file_naskah)">
                <b-icon icon="dash"></b-icon>
              </button>
              <input type="number" class="form-control cart-qty" :value="item.qty" disabled/>
              <button type="button" class="cart-btn" @click="addQty(item.id_file_naskah)">
                <b-icon icon="plus"></b-icon>
              </button>
              <button type="button" class="cart-btn" @click="removeItem(item.id_file_naskah)">
                <b-icon icon="trash"></b-icon>
              </button>
            </div>
          </div>
          <div class="col-md-2 col-lg-2">
            <div class="cart-product-price text-right">{{item.total_price_item | currency}}</div>
          </div>
        </div>
        <hr />
      </div>

    </div>
  </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: {
			...mapGetters(["cart"]),
		},
		methods: {
			...mapActions(["addQty", "reduceQty", "removeItem"])
		},
		watch: {
			cart: {
				handler(cart) {
					console.log(cart)
				},
				deep: true
			}
		}
	}
</script>
