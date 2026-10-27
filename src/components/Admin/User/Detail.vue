<template>
  <div id="statistics" class="mt-3">
    <!-- Default Light Table -->
    <div class="row">
      <div class="col-lg-4">
        <div class="card card-small mb-4 pt-3">
          <div class="card-header border-bottom text-center">
            <div class="mb-3 mx-auto">
              <img
                class="rounded-circle"
                src="images/avatars/0.jpg"
                alt="User Avatar"
                width="110"
              />
            </div>
            <h4 class="mb-0">Sierra Brooks</h4>
            <span class="text-muted d-block mb-2">Project Manager</span>
            <button
              type="button"
              class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"
            >
              <i class="material-icons mr-1">person_add</i>Follow
            </button>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item px-4">
              <div class="progress-wrapper">
                <strong class="text-muted d-block mb-2">Workload</strong>
                <div class="progress progress-sm">
                  <div
                    class="progress-bar bg-primary"
                    role="progressbar"
                    aria-valuenow="74"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 74%"
                  >
                    <span class="progress-value">74%</span>
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item p-4">
              <strong class="text-muted d-block mb-2">Description</strong>
              <span
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                eaque, quidem, commodi soluta qui quae minima obcaecati quod
                dolorum sint alias, possimus illum assumenda eligendi
                cumque?</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">Detail Naskah</h6>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
              <div class="row">
                <div class="col">
                  <form>
                    <div class="form-area">
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
                            <i class="bi bi-info-circle-fill"></i> Akan
                            digunakan pada cover buku dan ISBN
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
                            <i class="bi bi-info-circle-fill"></i> Akan
                            digunakan pada bagian belakang cover buku
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
                            <i class="bi bi-info-circle-fill"></i> File
                            Microsoft Word (.doc / .docx)
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
                            <i class="bi bi-info-circle-fill"></i> File
                            Photoshop (.psd) Kosongkan jika tidak ada
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
                            <i class="bi bi-info-circle-fill"></i> Jika tidak
                            diisi, desain cover sepenuhnya ide tim Guepedia
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

                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="tipe_id"
                              id="isbn"
                              value="ISBN"
                              v-model="form.tipe_id"
                            />
                            <label class="form-check-label" for="inlineRadio1"
                              >ISBN</label
                            >
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="tipe_id"
                              id="qrcode"
                              value="QR CODE"
                              v-model="form.tipe_id"
                            />
                            <label class="form-check-label" for="inlineRadio1"
                              >QRCODE</label
                            >
                          </div>
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
                      <label
                        class="form-check-label checkbox-label"
                        for="flexCheckDefault"
                      >
                        Dengan mencentang bagian ini, maka anda telah menyetujui
                        dan bersedia mematuhi syarat dan ketentuan (Perjanjian
                        Guepedia dan Penulis) dari guepedia.com
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End Default Light Table -->
  </div>
</template>

<script>
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
        cover: "",
        naskah: "",
        category: "",
        request_cover: "",
        pembuat_cover: "",
        tipe_id: "ISBN",
        tipe_kepenulisan: 1,
        penanggung_jawab: "",
        phone_jawab: "",
        agreement: "",
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
    };
  },
};
</script>
