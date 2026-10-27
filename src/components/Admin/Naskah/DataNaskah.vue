<template>
  <div id="statistics" class="mt-3">
    <!-- Default Light Table -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom d-flex">
            <div class="detail-title me-auto">
              <h6 class="m-0">Detail Naskah</h6>
            </div>

            <div class="detail-tipe">
              <span class="badge bg-danger" v-if="data.tipe_id == 'ISBN'">ISBN</span>
              <span class="badge bg-warning text-dark" v-if="data.tipe_id == 'QR CODE'">QRCODE</span>
            </div>

            <div class="detail-akun-penulis ms-auto">
              <router-link :to="{name: 'DetailUser', params:{id: data.user.id_account}}" class="btn btn-sm btn-warning dark-text"><strong>Detail Penulis</strong></router-link>
            </div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
              <div class="row">
                <div class="col">
                  <form @submit.prevent="updateNaskah">
                    <div class="form-areas">
                      <div class="row">
                        <div class="col-md-6">
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
                                :disabled="!editing"
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
                                :disabled="!editing"
                              />
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
                                :disabled="!editing"
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
                                :disabled="!editing"
                              >
                                <option selected disabled>
                                  Choose Category
                                </option>
                                <option
                                  v-for="item in categories"
                                  :key="item.id_kategori"
                                  :value="item.id_kategori_naskah"
                                  :selected="
                                    item.id_kategori_naskah == form.category
                                  "
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
                                id="sinopsis"
                                :disabled="!editing"
                              ></vue-editor>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-12 col-md-4 mb-2">
                              <label for="exampleInputEmail1" class="form-label"
                                >Status Naskah</label
                              >
                              <select
                                class="form-control"
                                name="nama_bank"
                                id="nama_bank"
                                v-model="form.status_naskah"
                                required
                                :disabled="!editing"
                              >
                                <option
                                  value="Dalam Antrian"
                                  :selected="data.status == 'Dalam Antrian'"
                                >
                                  Dalam antrian
                                </option>
                                <option
                                  value="Proses"
                                  :selected="data.status == 'Proses'"
                                >
                                  Proses
                                </option>
                                <option
                                  value="Publish"
                                  :selected="data.status == 'Publish'"
                                >
                                  Publish
                                </option>
                                <option
                                  value="Di Tarik"
                                  :selected="data.status == 'Di Tarik'"
                                >
                                  Di Tarik
                                </option>
                                <option
                                  value="Di Tolak"
                                  :selected="data.status == 'Di Tolak'"
                                >
                                  Di Tolak
                                </option>
                                <option
                                  value="Pending"
                                  :selected="data.status == 'Pending'"
                                >
                                  Pending
                                </option>
                              </select>
                            </div>
                            <div class="col-12 col-md-4 mb-2">
                              <label for="exampleInputEmail1" class="form-label"
                                >Harga Buku</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                v-model="form.harga"
                                :required="form.status_naskah == 'Publish'"
                                :disabled="!editing"
                              />
                            </div>
                            <div class="col-12 col-md-4 mb-2">
                              <label for="exampleInputEmail1" class="form-label"
                                >Berat Buku</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                v-model="form.berat"
                                :required="form.status_naskah == 'Publish'"
                                :disabled="!editing"
                              />
                            </div>

                            <div class="col-12 col-md-6 mb-2">
                              <label for="exampleInputEmail1" class="form-label"
                                >Editor</label
                              >
                              <select
                                class="form-control"
                                name="nama_bank"
                                id="nama_bank"
                                v-model="form.editor"
                                :disabled="!editing"
                              >
                                <option
                                  value="Lusi"
                                  :selected="form.editor == 'Lusi'"
                                >
                                  Lusi
                                </option>
                                <option
                                  value="Bernika"
                                  :selected="form.editor == 'Bernika'"
                                >
                                  Bernika
                                </option>
                                <option
                                  value="Agil"
                                  :selected="form.editor == 'Agil'"
                                >
                                  Agil
                                </option>
                              </select>
                            </div>
                            <div class="col-12 col-md-6 mb-2">
                              <label for="exampleInputEmail1" class="form-label"
                                >Pembuat Cover</label
                              >
                              <select
                                class="form-control"
                                name="nama_bank"
                                id="nama_bank"
                                v-model="form.cover"
                                :disabled="!editing"
                              >
                                <option value="Risyad">Risyad</option>
                              </select>
                            </div>

                            <div class="col-12 col-md-12 mb-2">
                              <label for="exampleInputEmail1" class="form-label"
                                >File Cover</label
                              >
                              <input
                                type="file"
                                class="form-control"
                                accept="image/png, image/gif, image/jpeg"
                                id="cover"
                                v-on:change="fileCoverChange()"
                                :disabled="!editing"
                                 :required="form.status_naskah == 'Publish'"
                              />
                            </div>

                            <div class="col-12 col-md-12 mb-2" v-if="form.status_naskah == 'Di Tolak'">
                              <label for="exampleInputEmail1" class="form-label"
                                >Alasan Tolak</label
                              >
                              <textarea v-model="form.alasan_tolak" class="form-control" :required="form.status_naskah == 'Di Tolak'"></textarea>
                            </div>

                            <div class="col-12 col-md-4 col-lg-4 mb-2">
                              <label for="exampleInputEmail1" class="form-label"
                                >File Naskah</label
                              >
                              <div class="d-grid mx-auto">
                                <a :href="'https://assets.guepedia.com/dokumen_naskah/'+data.file_naskah">
                                <button class="btn btn-info btn-sm" type="button">
                                  Download Naskah
                                </button>
                                </a>
                              </div>
                            </div>

                            <div class="col-12 col-md-4 col-lg-4 mb-2">
                              <label for="exampleInputEmail1" class="form-label"
                                >File Cover</label
                              >
                              <div class="d-grid mx-auto">
                                <a :href="'https://assets.guepedia.com/file_cover/'+data.file_cover">
                                <button class="btn btn-warning btn-sm" type="button">
                                  Download Cover
                                </button>
                                </a>
                              </div>
                            </div>

                            <div class="col-12 col-md-4 col-lg-4 mb-2" v-if="data.surat">
                              <label for="exampleInputEmail1" class="form-label"
                                >Surat Pernyataan</label
                              >
                              <div class="d-grid mx-auto">
                                <a :href="'https://assets.guepedia.com/surat_pernyataan/'+data.surat">
                                <button class="btn btn-success btn-sm" type="button">
                                  Download Surat
                                </button>
                                </a>
                              </div>
                            </div>

                            <div class="col-12 mb-2" v-if="data.request">
                              <label for="exampleInputEmail1" class="form-label"
                                >Request Cover</label
                              >
                              <p class="text-danger">
                                <i class="bi bi-info-circle-fill"></i>
                                {{ data.request }}
                              </p>
                            </div>

                            <div class="col-12 mb-2">
                              <div>
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                  >Tipe Kepenulisan</label
                                >
                              </div>

                              <div class="me-4 card text-center fw-bold">
                                <div class="card-header">
                                  <span
                                    class="badge bg-primary"
                                    v-if="data.type_kepenulisan == 1"
                                    >Naskah Pribadi</span
                                  >
                                  <span
                                    class="badge bg-warning"
                                    v-if="data.type_kepenulisan == 2"
                                    >Penulis Lebih dari 1 Orang</span
                                  >
                                  <span
                                    class="badge bg-danger"
                                    v-if="data.type_kepenulisan == 3"
                                    >Naskah Komunitas</span
                                  >
                                  <div v-if="data.type_kepenulisan != 1">
                                    <span>{{ data.penanggung_jawab }}</span> -
                                    <span>{{ data.hp }}</span>
                                  </div>

                                  <div v-else>
                                    <span>{{ data.user.nama_lengkap }}</span> -
                                    <span>{{ data.user.nomor_kontak }}</span>
                                  </div>
                                </div>
                              </div>

                              <div class="me-4 card text-center fw-bold bg-danger" v-if="data.alasan_tolak && data.alasan_tolak != 'null'">
                                <div class="card-header">
                                  <div>
                                    <span>{{ data.alasan_tolak }}</span>
                                  </div>
                                </div>
                              </div>

                              <div class="mt-3" v-if="form.status_naskah == 'Proses'">
                                <label for="flexCheckDefault">
                                  Catatan Untuk Penulis
                                </label>
                                <textarea class="form-control" id="flexCheckDefault" v-model="form.catatan"></textarea>
                              </div>

                              <div class="form-check mt-2" v-if="editing">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="form.mail">
                                <label class="form-check-label" for="flexCheckDefault">
                                  Infokan Status Naskah
                                </label>
                              </div>

                              <div
                                class="d-grid gap-2 d-md-block text-end mt-5"
                              >
                                <button class="btn btn-success" type="submit" v-if="editing">
                                  Simpan Perubahan Naskah
                                </button>
                                <div class="btn btn-danger" type="button" v-else @click="editing = !editing">
                                  Edit Naskah
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </li>
          </ul>

          <!-- <div class="action-btn p-3 d-flex bg-secondary">
            <button class="btn btn-success login-btn btn-sm">
              Publish Naskah
            </button>

            <button class="btn btn-warning btn-sm ms-auto">
              Infokan Status Naskah
            </button>
            <button class="btn btn-info btn-sm ms-3 me-auto">
              Kirim Email Penulis
            </button>

            <button class="btn btn-danger btn-sm">Tolak Naskah</button>
          </div> -->
        </div>
      </div>
    </div>
    <!-- End Default Light Table -->
  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      form: {
        name: "",
        pena: "",
        title: "",
        blurp: "",
        category: "",
        status_naskah: "",
        harga: "",
        berat: "",
        cover: "",
        editor: "",
        file_cover: null,
        alasan_tolak: "",
        mail: false,
        catatan: ""
      },
      editing: false,
      data: [],
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
    };
  },
  methods: {
    fileCoverChange() {
      this.form.file_cover = document.getElementById("cover").files[0];
    },
    getData() {
      this.loading = true;
      var id = this.$route.params.id;
      axios
        .get("naskahDetail/" + id, {
          headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.data;

          this.form.title = this.data.judul;
          this.form.name = this.data.penulis;
          this.form.pena = this.data.nama_pena;
          this.form.blurp = this.data.sinopsis;
          this.form.category = this.data.id_kategori_naskah;
          this.form.status_naskah = this.data.status;
          this.form.harga = this.data.harga;
          this.form.berat = this.data.berat_buku;
          this.form.cover = this.data.cover;
          this.form.editor = this.data.editor;
          this.form.alasan_tolak = this.data.alasan_tolak;
          this.form.catatan = this.data.catatan;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    getCategory() {
      this.loading = true;
      axios
        .get("getCategory", {
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
          },
        })
        .then((response) => {
          this.categories = response.data.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    updateNaskah(e){
      this.loading = false;

      var formData = new FormData(e.target);
      formData.append('id', this.$route.params.id);
      formData.append('judul', this.form.title);
      formData.append('penulis', this.form.name);
      formData.append('nama_pena', this.form.pena);
      formData.append('sinopsis', this.form.blurp);
      formData.append('id_kategori_naskah', this.form.category);
      formData.append('status', this.form.status_naskah);
      formData.append('harga', this.form.harga);
      formData.append('berat_buku', this.form.berat);
      formData.append('cover', this.form.cover);
      formData.append('editor', this.form.editor);
      formData.append('file_cover', this.form.file_cover);
      formData.append('alasan_tolak', this.form.alasan_tolak);
      formData.append('mail', this.form.mail);
      formData.append('catatan', this.form.catatan);

      return new Promise((resolve, reject) => {
        axios
          .post("admin/updateNaskah", formData ,{
            headers: {
              "Content-Type": "application/json",
              'Accept': "application/json",
              Authorization: "Bearer " + localStorage.getItem("admin_access_token"),
            },
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              'Berhasil',
              response.data.message
            );

            this.getData()
            this.editing = false
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Gagal',
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    }
  },
  mounted() {
    this.getData();
    this.getCategory();
  },
};
</script>

<style>
.detail-tipe span {
  font-size: 1em;
}
#sinopsis {
  height: 300px;
}
</style>
