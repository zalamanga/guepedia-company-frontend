<template>
  <div class="new-publish mb-4 container-fluid">
    <div class="item-title py-4">Buku Baru Terbit</div>

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
            <img
              :src="data.file_cover | cover"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <div class="book-title">{{ data.judul | titlesnip }}</div>
              <div class="book-price">{{ data.harga | currency }}</div>
              <div
                class="book-description"
                :inner-html.prop="data.sinopsis | descsnip"
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
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import axios from "axios";
export default {
  components: { VueSlickCarousel },
  data() {
    return {
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
      datas: [],
    };
  },

  methods: {
    getData() {
      this.loading = true;
      axios
        .get("naskah/new", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.datas = response.data.data.naskah;
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
a {
  color: #000 !important;
  text-decoration: none !important;
}

/* Card styles */
.card_skeleton {
  background-color: #fff;
  height: auto;
  width: auto;
  overflow: hidden;
}

/* Card image loading */
.card__image img {
  width: 100%;
  height: 100%;
}

.card__image.loading {
  height: 188px;
  width: 188px;
}

/* Card title */
.card__title {
  padding: 8px;
  font-size: 22px;
  font-weight: 700;
}

.card__title.loading {
  height: 0.5rem;
  width: 50%;
  margin: 0.5em 1rem;
  border-radius: 20px;
}

/* Card price */
.card__price {
  padding: 15px;
  font-size: 22px;
  font-weight: 700;
}

.card__price.loading {
  height: 0.8rem;
  width: 70%;
  margin: 0.8em 1rem;
  border-radius: 20px;
}

/* Card description */
.card__description {
  padding: 8px;
  font-size: 16px;
}

.card__description.loading {
  height: 0.5rem;
  margin: 0.5em 1rem;
  border-radius: 20px;
}

.card__description__2.loading {
  height: 1rem;
  margin: 0.5em 1rem;
  width: 40%;
  border-radius: 20px;
}
.card__description__3.loading {
  height: 1rem;
  margin: 0.5em 1rem;
  width: 60%;
  border-radius: 20px;
}

/* The loading Class */
.loading {
  position: relative;
  background-color: #e2e2e2;
}

/* The moving element */
.loading::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(transparent),
    color-stop(rgba(255, 255, 255, 0.2)),
    to(transparent)
  );

  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );

  /* Adding animation */
  animation: loading 0.8s infinite;
}

/* Loading Animation */
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
</style>