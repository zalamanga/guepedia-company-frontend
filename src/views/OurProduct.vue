<template>
  <div class="book-detail">
    <div class="row g-2" v-if="!loading">
      <div class="col-md-2 col-6 mb-3" v-for="data in datas" :key="data.id_file_naskah">
        <div class="card mx-2">
          <router-link :to="{ name: 'Book', params: { id: data.id_file_naskah } }">
            <b-img-lazy v-bind="mainProps" :src="data.file_cover | cover" class="card-img-top"></b-img-lazy>
            <div class="card-body">
              <div class="book-title">{{ data.judul | titlesnip }}</div>
              <div class="book-price">{{ data.harga | currency }}</div>
              <div class="book-description" :inner-html.prop="data.sinopsis | descsnip"></div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="row" v-if="loading">
      <div class="col-6 col-sm-6 col-md-2 col-lg-2" v-for="i in 6" :key="i">
        <div class="card_skeleton shadow mb-3">
          <div class="card__image loading"></div>
          <div class="card__title loading"></div>
          <div class="card__price loading"></div>
          <div class="card__description loading"></div>
          <div class="card__description__2 loading"></div>
          <div class="card__description__3 loading"></div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <pagination :data="page" @pagination-change-page="getData" :limit="5" align="center"></pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      loading: false,
      datas: [],
      page: [],

      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        width: 185,
        height: 185,
      },
    };
  },
  metaInfo() {
    return {
      title: 'Temukan Puluhan Ribu Judul Buku Menarik',
      meta: [
        { name: 'description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
        { property: 'og:type', content: "website" },
        { property: 'og:url', content: "https://www.guepedia.com/" },
        { property: 'og:title', content: 'Penerbit buku online gratis Indonesia  | Guepedia.com' },
        { property: 'og:description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
      ]
    }
  },
  methods: {
    getData(page = 1) {
      this.loading = true;
      axios
        .post(
          "naskah/search?page=" + page,
          {
            cat: this.$route.query.cat,
            keyword: this.$route.query.keyword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.datas = response.data.data.naskah.data;
          this.page = response.data.data.naskah;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },

  mounted() {
    this.getData();
  },
  watch: {
    $route(to, from) {
      this.getData();
    },
  },
};
</script>
