<template>
  <div class="term-area p-3">
    <div class="term-title">
      <h4 class="fw-bold">Upload Form</h4>
      <hr class="price-line" />

      <!-- Form Start -->
      <form @submit.prevent="uploadNaskah">
        <div class="form-areas">
          <div class="row">
            <div class="col-12 col-md-6 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Nama Penulis</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.name"
                required
              />
            </div>
            <div class="col-12 col-md-6 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Nama Pena</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.pena"
                required
              />
              <p class="helper-text">
                <i class="bi bi-info-circle-fill"></i> Akan digunakan pada cover
                buku dan ISBN
              </p>
            </div>
            <div class="col-12 col-md-8 col-lg-8 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Judul Buku</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.title"
                required
              />
            </div>
            <div class="col-12 col-md-4 col-ld-4 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Kategori</label
              >
              <select
                class="form-control"
                name="nama_bank"
                id="nama_bank"
                v-model="form.category"
                required
              >
                <option selected disabled>Choose Category</option>
                <option
                  v-for="item in categories"
                  :key="item.id_kategori"
                  :value="item.id_kategori_naskah"
                >
                  {{ item.nama_kategori }}
                </option>
              </select>
            </div>
            <div class="col-12 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Sinopsis</label
              >
              <vue-editor
                v-model="form.blurp"
                :editorToolbar="customToolbar"
                required
              ></vue-editor>
              <p class="helper-text">
                <i class="bi bi-info-circle-fill"></i> Akan digunakan pada
                bagian belakang cover buku
              </p>
            </div>

            <div class="col-12 col-md-6 col-lg-6 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >File Naskah</label
              >
              <input
                type="file"
                class="form-control"
                id="naskah"
                accept=".doc, .docx"
                v-on:change="naskahChange()"
                required
              />
              <p class="helper-text">
                <i class="bi bi-info-circle-fill"></i> File Microsoft Word (.doc
                / .docx)
              </p>
            </div>

            <div class="col-12 col-md-6 col-lg-6 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >File Cover</label
              >
              <input
                type="file"
                class="form-control"
                id="cover"
                accept=".psd"
                v-on:change="coverChange()"
              />
              <p class="helper-text">
                <i class="bi bi-info-circle-fill"></i> File Photoshop (.psd)
                Kosongkan jika tidak ada
              </p>
            </div>

            <div class="col-12 mb-2" v-if="!form.cover">
              <label for="exampleInputEmail1" class="form-label"
                >Request Cover</label
              >
              <textarea
                class="form-control"
                v-model="form.request_cover"
              ></textarea>
              <p class="helper-text">
                <i class="bi bi-info-circle-fill"></i> Jika tidak diisi, desain
                cover sepenuhnya ide tim Guepedia
              </p>
            </div>

            <div class="col-12 mb-2" v-else>
              <label for="exampleInputEmail1" class="form-label"
                >Nama Pembuat Cover</label
              >
              <textarea
                class="form-control"
                v-model="form.pembuat_cover"
              ></textarea>
            </div>

            <div class="col-12 mb-2">
              <div>
                <label for="exampleInputEmail1" class="form-label"
                  >Tipe Identifikasi</label
                >
              </div>

              <div v-if="form.category == 'N_031' || form.category == 'N_007' || form.category == 'N_013' || form.category == 'N_024'
                  || form.category == 'N_035' || form.category == 'N_036'">
                <p class="helper-text">
                  <i class="bi bi-info-circle-fill"></i> Kategori naskah anda tidak dapat kami daftarkan ISBN.
                </p>
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="tipe_id"
                  id="isbn"
                  value="ISBN"
                  v-model="form.tipe_id"
                  :disabled="form.category == 'N_031' || form.category == 'N_007' || form.category == 'N_013' || form.category == 'N_024'
                  || form.category == 'N_035' || form.category == 'N_036'"
                  v-on:change="checkTipe(true)"
                />
                <label class="form-check-label" for="inlineRadio1">ISBN</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="tipe_id"
                  id="qrcode"
                  value="QR CODE"
                  v-model="form.tipe_id"
                  v-on:change="checkTipe(false)"
                />
                <label class="form-check-label" for="inlineRadio1"
                  >QRCODE</label
                >
              </div>

              <div>
                <p class="helper-text">
                  <i class="bi bi-info-circle-fill"></i> Saat ini, PERPUSNAS
                  mengeluarkan beberapa peraturan baru dalam penerbitan ISBN.
                  Pihak Guepedia tidak dapat menjamin naskah yang didaftarkan
                  ISBN akan mendapatkan nomor ISBN dari PERPUSNAS. Untuk itu
                  naskah yang didaftarkan dengan tipe identifikasi ISBN akan
                  otomatis juga didaftarkan QRCBN untuk mempercepat proses
                  penerbitan naskah. Untuk informasi lebih jelas, silahkan
                  hubungi admin sebelum melakukan pendaftaran naskah anda.
                </p>
              </div>
            </div>

            <div class="col-12 col-md-12 mb-2" v-if="form.tipe_id == 'ISBN'">
              <label for="exampleInputEmail1" class="form-label"
                >Surat Pernyataan Keaslian Karya</label
              >
              <input
                type="file"
                class="form-control"
                id="surat"
                accept=".jpg, .jpeg, .png, .pdf"
                v-on:change="suratChange()"
                :required="form.tipe_id == 'isbn'"
              />
            </div>

            <div class="col-12 mb-2">
              <div>
                <label for="exampleInputEmail1" class="form-label"
                  >Tipe Kepenulisan</label
                >
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="tipe_kepenulisan"
                  id="pribadi"
                  value="1"
                  v-model="form.tipe_kepenulisan"
                />
                <label class="form-check-label" for="inlineRadio1"
                  >Naskah Pribadi</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="tipe_kepenulisan"
                  id="lebih_satu"
                  value="2"
                  v-model="form.tipe_kepenulisan"
                />
                <label class="form-check-label" for="inlineRadio1"
                  >Lebih dari 1 penulis</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="tipe_kepenulisan"
                  id="komunitas"
                  value="3"
                  v-model="form.tipe_kepenulisan"
                />
                <label class="form-check-label" for="inlineRadio1"
                  >Naskah Komunitas</label
                >
              </div>
            </div>

            <div
              class="col-12 col-md-6 col-lg-6 mb-2"
              v-if="form.tipe_kepenulisan != 1"
            >
              <label for="exampleInputEmail1" class="form-label"
                >Penanggung Jawab Naskah</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.penanggung_jawab"
              />
            </div>

            <div
              class="col-12 col-md-6 col-lg-6 mb-2"
              v-if="form.tipe_kepenulisan != 1"
            >
              <label for="exampleInputEmail1" class="form-label"
                >Nomor HP Penanggung Jawab</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.phone_jawab"
              />
            </div>
          </div>
        </div>
        <hr />
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="form.agreement"
          />
        <label class="form-check-label checkbox-label" for="flexCheckDefault">
          Dengan mencentang bagian ini, maka anda telah menyetujui dan
          bersedia mematuhi 
          <a href="https://guepedia.com/privacy" target="_blank" style="color: blue !important; text-decoration: underline;">
          syarat dan ketentuan (Perjanjian Guepedia dan Penulis)
          </a>
          dari guepedia.com
        </label>

        </div>
        <div class="login-btn mt-3 d-grid gap-2">
          <button
            type="submit"
            class="btn btn-sm"
            :disabled="loading || !form.agreement"
          >
            <span v-if="loading"
              >Loading ... Mohon untuk tidak merefresh halaman ini</span
            >
            <span v-else>Kirim Naskah Sekarang</span>
          </button>

          <b-progress
            :value="progress"
            max="100"
            show-progress
            animated
          ></b-progress>
        </div>
      </form>
      <!-- Form End -->
    </div>

    <b-modal
      id="ISBNModal"
      hide-header-close
      hide-footer
      centered
      title="INFORMASI ISBN"
    >
      <p>Untuk melanjutkan pendaftaran dengan nomor identifikasi ISBN, PERPUSNAS mewajibkan anda mengisi SURAT PERNYATAAN KEASLIAN KARYA, Silahkan download surat pernyataan dengan menekan tombol dibawah ini.</p>
      <p style="color:red;">Jika anda ingin mendaftar dengan QRCBN anda tidak perlu melampirkan surat pernyataan ini.</p>

      <div class="mb-3">
        <div class="login-btn">
          <a href="https://admin-isbn.perpusnas.go.id/files/dokumen_surat/Surat%20Keaslian%20Karya%20-%2020221027.docx"><button class="btn btn-sm">Download Surat Pernyataan Keaslian Karya</button></a>
        </div>
      </div>
    </b-modal>

  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  name: "HelloWorld",
  components: {
    VueEditor,
  },
  data: () => ({
    form: {
      name: "",
      pena: "",
      title: "",
      blurp: "",
      cover: "",
      naskah: "",
      category: "",
      request_cover: "",
      pembuat_cover: "",
      tipe_id: "QR CODE",
      tipe_kepenulisan: 1,
      penanggung_jawab: "",
      phone_jawab: "",
      agreement: "",

      surat: "",
    },

    categories: [],

    customToolbar: [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["blockquote", "code-block"],
      [{ color: [] }],
    ],

    loading: false,
    progress: 0,
  }),

  methods: {
    getCategory() {
      this.loading = true;
      axios
        .get("getCategory", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.categories = response.data.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    naskahChange() {
      this.form.naskah = document.getElementById("naskah").files[0];
    },
    coverChange() {
      this.form.cover = document.getElementById("cover").files[0];
    },
    suratChange() {
      this.form.surat = document.getElementById("surat").files[0];
    },

    uploadNaskah(e) {
      this.loading = true;
      this.$Progress.start();

      var formData = new FormData(e.target);
      formData.append("penulis", this.form.name);
      formData.append("nama_pena", this.form.pena);
      formData.append("judul", this.form.title);
      formData.append("sinopsis", this.form.blurp);
      formData.append("id_kategori_naskah", this.form.category);
      formData.append("file_cover", this.form.cover);
      formData.append("file_naskah", this.form.naskah);
      formData.append("request_cover", this.form.request_cover);
      formData.append("pembuat_cover", this.form.pembuat_cover);
      formData.append("tipe_id", this.form.tipe_id);
      formData.append("type_kepenulisan", this.form.tipe_kepenulisan);
      formData.append("penanggung_jawab", this.form.penanggung_jawab);
      formData.append("hp", this.form.phone_jawab);

      formData.append("surat", this.form.surat);

      return new Promise((resolve, reject) => {
        axios
          .post("uploadNaskah", formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
            onUploadProgress: function (progressEvent) {
              this.progress = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }.bind(this),
          })
          .then((response) => {
            console.log(response);

            this.$router.push({ name: "Project" });
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
              error.response.data.message
            );
            reject(error);
            this.loading = false;
            this.$Progress.fail();
          });
      });
    },
  },

  mounted() {
    this.getCategory();
    this.$bvModal.show('ISBNModal');
  },
};
</script>

<style>
.checkbox-label {
  font-size: 0.65em;
}
</style>
