<template>
  <div class="best-seller mb-4 container-fluid">
    <div class="item-title py-4">Buku Terlaris</div>

    <VueSlickCarousel
      :arrows="true"
      :dots="false"
      v-bind="settings"
      v-if="datas.length > 0"
    >
      <div v-for="data in datas" :key="data.id_file_naskah">
        <div class="card mx-2">
          <router-link
            :to="{ name: 'Book', params: { id: data.id_file_naskah } }"
          >
            <b-img-lazy
              v-bind="mainProps"
              :src="data.product.file_cover | cover"
              class="card-img-top"
            ></b-img-lazy>
            <div class="card-body">
              <div class="book-title">{{ data.product.judul | titlesnip }}</div>
              <div class="book-price">{{ data.product.harga | currency }}</div>
              <div
                class="book-description"
                :inner-html.prop="data.product.sinopsis | descsnip"
              ></div>
            </div>
          </router-link>
        </div>
      </div>
    </VueSlickCarousel>

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
  </div>
</template>

<script>
import axios from 'axios'
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  components: { VueSlickCarousel },
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        width: 185,
        height: 185,
      },
      settings: {
        swipeToSlide: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      },

      loading: false,
      datas: []
    };
  },

  methods: {
    getData() {
      this.loading = true;
      axios
        .get("naskah/best_seller", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.datas = response.data.data.naskah;
          console.log(this.datas)
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style>
.slick-prev:before,
.slick-next:before {
  color: yellowgreen !important;
}
</style>