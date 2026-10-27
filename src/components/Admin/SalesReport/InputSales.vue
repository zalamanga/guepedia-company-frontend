<template>
  <div class="center">
    <div id="order-form">
      <div class="search-book">
        <input
          type="text"
          class="form-control"
          placeholder="Cari Buku...."
          v-model="searchInput"
          @input="getData"
        />
        <div id="search-result" class="bg-white shadow" v-if="searchInput">
          <ul>
            <li><strong v-if="loading">Loading....</strong></li>
            <li
              v-for="item in naskah"
              :key="item.id_file_naskah"
              @click="buyItem(item)"
            >
              <div class="d-flex">
                <div class="book-title me-2">
                  <div class="cart-product-title">{{ item.judul }}</div>
                  <div class="cart-product-qty">{{ item.nama_pena }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="search-table mt-3">
        <cart-table></cart-table>
      </div>
    </div>
  </div>
</template>
<script>
import CartTable from "./CartTable.vue";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  components: {
    CartTable,
  },
  data: () => ({
    naskah: [],
    searchInput: null,
    form: {
      id: "",
      customer: "",
      status: null,
      editor: null,
      resi: null,
      ongkir: null,
    },

    loading: true,
  }),

  methods: {
    ...mapActions(["addToCart"]),
    buyItem(data) {
      var title = "Pemberitahuan";
      var text = "Produk berhasil ditambahkan ke keranjang belanja anda.";

      this.openNotification(3000, "bottom-center", "success", title, text);

      this.addToCart(data);
      this.searchInput = null
    },

    getData() {
      this.loading = false;
      this.naskah = [];
      return new Promise((resolve, reject) => {
        axios
          .post(
            "searchNaskahPublish",
            {
              keyword: this.searchInput,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:
                  "Bearer " + localStorage.getItem("admin_access_token"),
              },
            }
          )
          .then((response) => {
            this.naskah = response.data.data.data;
            this.loading = false;
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
  computed: {
    filteredRows() {
      return this.naskah.filter((row) => {
        const judul = row.judul.toString().toLowerCase();
        const searchTerm = this.searchInput.toLowerCase();

        return judul.includes(searchTerm);
      });
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

<style>
#search-result ul {
  list-style: none;
  padding: 0;
  line-height: 1.7em;
  cursor: pointer;
}
#search-result {
  position: absolute;
  z-index: 9999999;
}
#search-result ul li {
  padding: 10px 20px;
}
#search-result ul li:hover {
  background: #007bff;
  color: #fff;
}
.book-img img {
  width: 50px;
}
</style>
