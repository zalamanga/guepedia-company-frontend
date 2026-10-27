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
        <div class="text-center mb-2">
          <i>Anda dapat mengatur halaman ini untuk menarik pembaca, halaman ini dapat di akses oleh pembaca, melalui halaman detail naskah. Silahkan isi data data dibawah ini sesuai dengan naskah anda.</i>
        </div>
        <div class="row">
          <div class="col-12 col-md-7 pt-5 mb-5 align-self-center">
            <div class="promo pe-md-3 pe-lg-5">
              
              <h1 class="headline mb-3">
                {{ data.judul }}
              </h1>
              <div class="subheadline mb-4" v-if="data.subtitle">
                {{ data.subtitle }}
              </div>
              <div class="subheadline mb-4" v-else>
                Ceritakan kepada pembaca mengenai isi buku ini secara singkat
                dan padat, sehingga pembaca lebih tertarik untuk membaca buku
                ini.
              </div>

              <b-button v-b-modal.subtitleModal variant="info" class="rounded-pill">Ubah Subtitle Buku ini</b-button>

              <b-modal id="subtitleModal" title="Edit Subtitle" hide-footer hide-header-close>
                <div class="mb-3">
                  <label class="form-label">Jelaskan Secara Singkat Tentang Buku Ini</label>
                  <textarea class="form-control" rows="5" v-model="form.subtitle"></textarea>
                </div>

                <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="button" @click="updateSubTitle">Perbarui Subtitle Buku</button>
                </div>
              </b-modal>

              
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
              <a class="btn btn-outline-success btn-sm" href="#reviews-section"
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
    >
      <div class="container py-5">
        <h2 class="section-heading text-center mb-3">Benefits</h2>
        <div class="section-intro single-col-max mx-auto text-center mb-5">
          What Will Readers Get From This Book?
        </div>
        <div class="row text-center justify-content-center">
          <div class="item col-12 col-md-6 col-lg-4" v-for="item in data.benefits" :key="item.id">
            <div class="item-inner p-3 p-lg-4">
              <div class="item-header mb-3">
                <div class="item-icon">
                  <i class="bi bi-laptop"></i>
                </div>
                <h3 class="item-heading">
                  {{ item.headline }}
                </h3>
              </div>
              <div class="item-desc">
                {{ item.subheadline }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-call-btn text-center">
          <button class="btn btn-lg btn-warning rounded-pill" v-b-modal.benefitModal>
            Add Benefit
          </button>
        </div>

        <b-modal id="benefitModal" title="Add Benefit" hide-footer hide-header-close>
          <div class="mb-3">
            <label class="form-label">Benefit Headline</label>
            <input type="text" class="form-control"  v-model="form.benefit.headline">
          </div>

          <div class="mb-3">
            <label class="form-label">Benefit Sub Headline</label>
            <textarea class="form-control" rows="5"  v-model="form.benefit.subheadline"></textarea>
          </div>

          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button" @click="addBenefit">Add Benefit For This Book</button>
          </div>
        </b-modal>
      </div>
    </section>

    <section id="content-section" class="content-section">
      <div class="container">
        <div class="single-col-max mx-auto">
          <h2 class="section-heading text-center">Features</h2>
          <div class="section-intro single-col-max mx-auto text-center mb-5">
            What is The Content Of This Book ?
          </div>
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
                    <i class="fas fa-check-circle me-2"></i>{{ item.item }}
                  </li>
                </ul>
                <div class="text-center">
                  <button class="btn btn-lg btn-warning rounded-pill" v-b-modal.featureModal>
                    Add Feature
                  </button>
                </div>
              </div>
            </div>
          </div>

          <b-modal id="featureModal" title="Add Benefit" hide-footer hide-header-close>
            <div class="mb-3">
              <label class="form-label">Feature Item</label>
              <input type="text" class="form-control"  v-model="form.feature.item">
            </div>

            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="button" @click="addFeature">Add Feature For This Book</button>
            </div>
          </b-modal>
        </div>
      </div>
    </section>

    <section id="audience-section" class="audience-section py-5">
      <div class="container">
        <h2 class="section-heading text-center mb-4">Who This Book Is For</h2>
        <div class="section-intro single-col-max mx-auto text-center mb-5">
          List Who Should Read This Book.
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

          <div class="form-call-btn text-center">
            <button class="btn btn-lg btn-warning rounded-pill" v-b-modal.targetModal>
              Add Target Reader
            </button>
          </div>
        </div>
      </div>

      <b-modal id="targetModal" title="Add Target" hide-footer hide-header-close>
        <div class="mb-3">
          <label class="form-label">Target Title</label>
          <input type="text" class="form-control"  v-model="form.target.title">
        </div>
        <div class="mb-3">
          <label class="form-label">Target Description</label>
          <textarea rows="5" class="form-control"  v-model="form.target.description"></textarea>
        </div>

        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button" @click="addTarget">Add Target Reader For This Book</button>
        </div>
      </b-modal>
    </section>

    <section id="reviews-section" class="reviews-section py-5">
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
        <!--//row-->
        <div class="form-call-btn text-center">
          <button class="btn btn-lg btn-warning rounded-pill" v-b-modal.reviewModal>
            Add Reviewer
          </button>
        </div>
      </div>

      <b-modal id="reviewModal" title="Add Reviewer" hide-footer hide-header-close>
        <form @submit.prevent="addReview">
          <div class="mb-3">
            <label class="form-label">Reviewer Name</label>
            <input type="text" class="form-control"  v-model="form.review.name">
          </div>
          <div class="mb-3">
            <label class="form-label">Reviewer Occupation</label>
            <input type="text" class="form-control"  v-model="form.review.occupation">
          </div>
          <div class="mb-3">
            <label class="form-label">Reviewer Photo</label>
            <input type="file" class="form-control" id="reviewerPhoto" v-on:change="photoChange" accept="image/png, image/jpeg">
          </div>
          <div class="mb-3">
            <label class="form-label">Comment About This Book</label>
            <textarea rows="5" class="form-control"  v-model="form.review.comment"></textarea>
          </div>

          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="submit">Add Review For This Book</button>
          </div>
        </form>
      </b-modal>
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
          <p v-if="data.user.about">{{ data.user.about }}</p>
          <p v-else>Tell about yourself, so that readers know you better, set this section on the profile settings page</p>
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

      form:{
        subtitle: '',

        benefit:{
          headline: '',
          subheadline: ''
        },
        feature:{
          item: ''
        },
        target:{
          title: '',
          description: ''
        },
        review:{
          name: '',
          occupation: '',
          photo: '',
          comment: ''
        }
      }
    };
  },
  methods: {
    getData() {
      this.loading = true;
      var id = this.$route.params.id;
      axios
        .get("page/naskah/" + id, {
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

    updateSubTitle(){
      this.loading = false;
      var id = this.$route.params.id;
      return new Promise((resolve, reject) => {
        axios
          .post("updateSubTitle/"+id, {
            subtitle: this.form.subtitle
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              'Success',
              response.data.data.message
            );

            this.getData()
            this.loading = false;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Error',
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },

    addBenefit(){
      this.loading = false;
      var id = this.$route.params.id;
      return new Promise((resolve, reject) => {
        axios
          .post("addBenefit/"+id, {
            headline: this.form.benefit.headline,
            subheadline: this.form.benefit.subheadline
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              'Success',
              response.data.data.message
            );

            this.form.benefit.headline = ''
            this.form.benefit.subheadline = ''

            this.getData()
            this.loading = false;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Error',
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },

    addFeature(){
      this.loading = false;
      var id = this.$route.params.id;
      return new Promise((resolve, reject) => {
        axios
          .post("addFeature/"+id, {
            item: this.form.feature.item
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              'Success',
              response.data.message
            );

            this.form.feature.item = ''

            this.getData()
            this.loading = false;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Error',
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },

    addTarget(){
      this.loading = false;
      var id = this.$route.params.id;
      return new Promise((resolve, reject) => {
        axios
          .post("addTarget/"+id, {
            title: this.form.target.title,
            description: this.form.target.description
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              'Success',
              response.data.message
            );

            this.form.target.title = ''
            this.form.target.description = ''

            this.getData()
            this.loading = false;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Error',
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },

    photoChange() {
      this.form.review.photo = document.getElementById("reviewerPhoto").files[0];
      console.log(this.form.review.photo);
    },

    addReview(e) {
      this.sending = true;
      var id = this.$route.params.id;
      var formData = new FormData(e.target);
      formData.append("name", this.form.review.name);
      formData.append("occupation", this.form.review.occupation);
      formData.append("photo", this.form.review.photo);
      formData.append("comment", this.form.review.comment);

      return new Promise((resolve, reject) => {
        axios
          .post("addReview/"+id, formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "multipart/form-data",
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
            this.getData()

            this.form.review.name = ''
            this.form.review.occupation = ''
            this.form.review.photo = null
            this.form.review.comment = ''
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              error.response.data.message
            );
            this.sending = false;
          });
      });
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
