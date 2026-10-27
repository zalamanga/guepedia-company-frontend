<template>
  <div id="daftar-haki">
    <div class="item-title pt-4">Daftar Hak Cipta Naskah</div>
    <hr class="price-line" />

    <div class="row">
      <div class="col-md-4 col-12">
        <img
          :src="'https://assets.guepedia.com/file_cover/'+selectedCover"
          width="100%"
          v-if="selectedCover"
        />
      </div>
      <div class="col-md-8 col-12">
        <b-form @submit.prevent="storeHAKI">
          <div id="form-areas">
            <b-row>
              <b-col cols="12" md="12">
                <label for="exampleInputEmail1" class="form-label"
                  >Judul Naskah</label
                >
                <select
                  class="form-control"
                  name="title"
                  id="title"
                  v-model="form.naskah"
                  required
                  @change="getCover()"
                >
                  <option selected disabled>Pilih Judul Naskah</option>
                  <option
                    v-for="book in books"
                    :key="book.id_file_naskah"
                    :value="book"
                  >
                    {{ book.judul }}
                  </option>
                </select>
              </b-col>
              <b-col cols="12" md="6" class="mt-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Surat Pernyataan</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="surat"
                  accept=".doc, .docx"
                  v-on:change="suratChange()"
                  required
                />
                <p class="helper-text">
                  <i class="bi bi-info-circle-fill"></i> Surat pernyataan yang
                  sudah ditandatangani diatas materai
                </p>
              </b-col>

              <b-col cols="12" md="6" class="mt-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Scan KTP Penulis</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="ktp"
                  accept=".pdf"
                  v-on:change="KTPChange()"
                  required
                />
                <p class="helper-text">
                  <i class="bi bi-info-circle-fill"></i> File pdf, jika penulis
                  lebih dari satu harap file scan dijadikan satu file
                </p>
              </b-col>

              <b-col cols="12" class="my-4">
                <div class="text-center">
                  Biaya pendaftaran HAK CIPTA adalah sebesar Rp. 580,000 .
                  Silahkan transfer ke rekening BCA a/n : Dianata Eka Putra 740
                  1486 074
                </div>
              </b-col>
            </b-row>

            <b-button variant="success" :disabled="loading" type="submit"
              >Daftarkan Hak Cipta</b-button
            >

            <b-progress
              :value="progress"
              max="100"
              show-progress
              animated
            ></b-progress>
          </div>
        </b-form>
      </div>
    </div>

    <b-modal
      ref="news-modal"
      hide-footer
      hide-header-close
      title="Informasi Pendaftaran Hak Cipta"
    >
      <div class="d-block">
        <div class="font-weight-bold">
          Sebelum anda melakukan pendaftaran hak cipta, silahkan baca informasi
          dibawah ini!
        </div>
      </div>

      <ol>
        <li>
          Biaya pendaftaran Hak Cipta sebesar Rp. 580,000 ke Rekening BCA a/n :
          Dianata Eka Putra 740 1486 074
        </li>
        <li>
          Penulis akan mendapatkan sertifikat Hak Cipta berupa soft copy yang
          dikirimkan melalui email
        </li>
        <li>
          Pihak Guepedia tidak dapat memastikan berapa lama waktu yang
          dibutuhkan dalam proses pendaftaran Hak Cipta.
        </li>
        <li>
          Sebelum anda melakukan pendaftaran Hak Cipta, pastikan anda
          mendownload Surat Pernyataan dengan menekan tombol dibawah ini.<br />
          <b-button
            class="btn btn-sm btn-success text-light mt-2"
            href="https://e-hakcipta.dgip.go.id/assets/download/pernyataan_hak_cipta.docx"
            >Download Surat Pernyataan</b-button
          >
        </li>
      </ol>
      <p>
        Jika anda setuju dengan ketentuan diatas silahkan lanjutkan pengisian
        formulir pendaftaran Hak Cipta.
      </p>
      <div class="mt-3">
        <b-button
          class="mt-3"
          variant="danger"
          block
          @click="$refs['news-modal'].hide()"
          >Lanjutkan Pendaftaran</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        naskah: [],
        surat: null,
        id: null,
      },
      selectedCover: "",
      books: [],

      loading: false,
      progress: 0,
    };
  },
  methods: {
    getCover() {
      this.selectedCover = this.form.naskah.file_cover;
    },
    suratChange() {
      this.form.surat = document.getElementById("surat").files[0];
    },
    KTPChange() {
      this.form.id = document.getElementById("ktp").files[0];
    },
    getPublishedBooks() {
      this.loading = true;

      axios
        .get("myNaskah/publish", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
            crossDomain: true
          },
        })
        .then((response) => {
          this.books = response.data.data.data;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    storeHAKI(e) {
      this.loading = true;
      this.$Progress.start();

      var formData2 = new FormData(e.target);
      formData2.append("id", this.form.naskah.id_file_naskah);
      formData2.append("surat", this.form.surat);
      formData2.append("identity", this.form.id);

      return new Promise((resolve, reject) => {
        axios
          .post("haki", formData2, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "multipart/form-data",
              "Accept": "application/json",
            },
            onUploadProgress: function (progressEvent) {
              this.progress = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }.bind(this),
          })
          .then((response) => {
            console.log(response);

            this.$router.push({ name: "Haki" });
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );

            this.loading = false;
            this.$Progress.finish();
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              error.response.data.data.error
            );
            reject(error);
            this.loading = false;
            this.$Progress.fail();
          });
      });
    },
  },
  mounted() {
    this.$refs["news-modal"].show();
    this.getPublishedBooks();
  },
};
</script>