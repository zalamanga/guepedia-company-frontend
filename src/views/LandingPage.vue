<template>
  <div id="landing-page">
    <header class="header">
      <div class="branding">
        <div class="container-fluid position-relative py-3">
          <div class="logo-wrapper">
            <div class="site-logo">
              <a class="navbar-brand" href="/"
                ><img
                  class="logo-icon me-2"
                  src="https://www.guepedia.com/assets/img/logo-toko.png"
                  alt="logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-7 pt-5 mb-5 align-self-center">
            <div class="promo pe-md-3 pe-lg-5">
              <h1 class="headline mb-3">
                {{ data.judul }}
              </h1>
              <div class="subheadline mb-4">
                {{ data.subtitle }}
              </div>
              <div class="cta-holder row gx-md-3 gy-3 gy-md-0">
                <div class="col-12 col-md-auto">
                  <a
                    class="btn btn-lg btn-warning rounded-pill"
                    href="#benefits-section"
                    >Learn More</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-5 mb-5 align-self-center">
            <div class="book-cover-holder">
              <img
                class="img-fluid book-cover"
                :src="
                  'https://www.guepedia.com/uploads/file_cover/' +
                  data.file_cover
                "
                alt="book cover"
              />
              <!-- <div class="book-badge d-inline-block shadow">
                New<br />Release
              </div> -->
            </div>
            <div class="text-center mt-3" v-if="data.reviews">
              <a class="theme-link scrollto" href="#reviews-section"
                >See all book reviews</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="benefits-section"
      class="benefits-section theme-bg-light-gradient py-5"
      v-if="data.benefits.length"
    >
      <div class="container py-5">
        <h2 class="section-heading text-center mb-3">Benefits</h2>
        <div class="section-intro single-col-max mx-auto text-center mb-5">
          What Will You Get From This Book?
        </div>
        <div class="row text-center justify-content-center">
          <div class="item col-12 col-md-6 col-lg-4" v-for="item in data.benefits" :key="item.id">
            <div class="item-inner p-3 p-lg-4">
              <div class="item-header mb-3">
                <div class="item-icon">
                  <i class="bi bi-laptop"></i>
                </div>
                <h3 class="item-heading">
                  {{item.headline}}
                </h3>
              </div>
              <div class="item-desc">
                {{item.subheadline}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      id="content-section"
      class="content-section"
      v-if="data.features.length > 0"
    >
      <div class="container">
        <div class="single-col-max mx-auto">
          <h2 class="section-heading text-center mb-5">Features</h2>

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="figure-holder mb-5">
                <img
                  class="img-fluid"
                  :src="
                    'https://www.guepedia.com/uploads/file_cover/' +
                    data.file_cover
                  "
                  alt="image"
                />
              </div>
            </div>
            <div class="col-12 col-md-6 mb-5">
              <div class="key-points mb-4 text-center">
                <ul
                  class="key-points-list list-unstyled mb-4 mx-auto d-inline-block text-start"
                >
                  <li v-for="item in data.features" :key="item.id">
                    <i class="fas fa-check-circle me-2"></i>
                    {{item.item}}
                  </li>
                </ul>
                <div class="text-center">
                  <router-link
                    :to="{ name: 'Book', params: { id: data.id_file_naskah } }"
                    class="btn btn-primary text-light btn-lg rounded-pill"
                    >I want this book
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      id="audience-section"
      class="audience-section py-5"
      v-if="data.targets.length > 0"
    >
      <div class="container">
        <h2 class="section-heading text-center mb-4">Who This Book Is For</h2>
        <div class="section-intro single-col-max mx-auto text-center mb-5">
          This book is for you
        </div>
        <div class="audience mx-auto">
          <div class="item row gx-3" v-for="item in data.targets" :key="item.id">
            <div class="col-auto item-icon">
              <i class="fas fa-code"></i>
            </div>
            <div class="col">
              <h4 class="item-title">{{item.title}}</h4>
              <div class="item-desc">
                {{item.description}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="reviews-section"
      class="reviews-section py-5"
      v-if="data.reviews.length > 0"
    >
      <div class="container">
        <h2 class="section-heading text-center">Book Reviews</h2>
        <div class="section-intro text-center single-col-max mx-auto mb-5">
          See what our readers are saying.
        </div>
        <div class="row justify-content-center">
          <div class="item col-12 col-lg-4 p-3 mb-4" v-for="item in data.reviews" :key="item.id">
            <div class="item-inner theme-bg-light rounded p-4">
              <blockquote class="quote">
                "{{item.comment}}"
              </blockquote>
              <!--//item-->
              <div class="source row gx-md-3 gy-3 gy-md-0">
                <div class="col-12 col-md-auto text-center text-md-start">
                  <img
                    class="source-profile"
                    :src="'https://www.guepedia.com/uploads/reviewer/'+item.photo"
                    alt="image"
                    v-if="item.photo"
                  />

                  <b-avatar v-else :text="item.name | initial" size="3rem"></b-avatar>
                </div>
                <!--//col-->
                <div class="col source-info text-center text-md-start">
                  <div class="source-name">{{item.name}}</div>
                  <div class="soure-title">{{item.occupation}}</div>
                </div>
                <!--//col-->
              </div>
              <!--//source-->
              <div class="icon-holder"><i class="fas fa-quote-right"></i></div>
            </div>
            <!--//inner-->
          </div>
        </div>
        <div class="text-center">
          <router-link
            :to="{ name: 'Book', params: { id: data.id_file_naskah } }"
            class="btn btn-primary btn-lg rounded-pill text-light">
            Get This Book Now
          </router-link>
        </div>
      </div>
    </section>
    <section
      id="author-section"
      class="author-section section theme-bg-primary py-5"
    >
      <div class="container py-3">
        <div class="author-profile text-center mb-3">
          <img
            v-if="data.user.photo"
            class="author-pic"
            :src="'https://www.guepedia.com/uploads/photo_profile/' + data.user.photo"
            alt="image"
            style="border-radius: 100%"
          />
          <b-avatar
            v-else
            variant="primary"
            :text="data.user.nama_pena | initial"
            size="72px"
          ></b-avatar>
        </div>
        <h1 class="section-heading text-center text-white mb-3">
          {{ data.user.nama_lengkap }}
        </h1>
        <div class="author-bio single-col-max mx-auto text-center">
          <p>
            {{ data.user.about }}
          </p>
          <div class="author-links text-center pt-4">
            <h5 class="text-white mb-4">Contact Author</h5>
            <ul class="social-list list-unstyled">
              <li class="list-inline-item">
                <a :href="'https://www.facebook.com/' + data.user.facebook"
                  ><i class="fab fa-facebook"></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a :href="'https://www.facebook.com/' + data.user.instagram"
                  ><i class="fab fa-instagram"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "../assets/js/script";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      var user = this.$route.params.user;
      var judul = this.$route.params.judul;
      axios
        .get("landingpage/"+user+"/"+judul, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data = response.data.data.naskah;
          console.log(this.data);
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

<style scoped>
@import "../assets/styles/style_lp.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css";
@import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
@import "https://fonts.googleapis.com/css?family=Quicksand:700|Roboto:400,400i,700&display=swap";
</style>
