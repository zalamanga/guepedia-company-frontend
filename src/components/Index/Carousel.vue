<template>
  <div class="carousel-area mb-4">
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333"
    >
      <!-- Slides with image only -->
      <b-carousel-slide v-for="item in banners" :key="item.id_banner"
        :img-src="'https://assets.guepedia.com/banner/'+item.nama_banner"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      banners: []
    };
  },
  mounted(){
    this.getBanner()
  },
  methods:{
    getBanner(){
      this.loading = true;
      axios
        .get("banner", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.banners = response.data.data.banner;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style>
.carousel{
  background: transparent !important;
}
</style>