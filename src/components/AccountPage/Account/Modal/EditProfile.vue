<template>
  <div>
    <form @submit.prevent="updateData">
    <div class="form-item">
      <div class="form-title fw-bold">Detail Akun</div>
      <div class="row">
        <div class="col-md-5 col-lg-5">
          <div class="mb-3">
            <label for="editName" class="form-label">Nama Lengkap</label>
            <input
              type="text"
              class="form-control"
              id="editName"
              v-model="form.name"
              required
            />
          </div>
        </div>

        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="editPena" class="form-label">Nama Pena</label>
            <input
              type="text"
              class="form-control"
              id="editPena"
              v-model="form.pena"
              required
            />
          </div>
        </div>

        <div class="col-md-3 col-lg-3">
          <div class="mb-3">
            <label for="editPhone" class="form-label">Nomor Kontak</label>
            <input
              type="text"
              class="form-control"
              id="editPhone"
              v-model="form.phone"
              required
            />
          </div>
        </div>

        <div class="col-md-12 col-lg-12">
          <div class="mb-3">
            <label for="editPhone" class="form-label"
              >Ceritakan Tentang Dirimu</label
            >
            <textarea rows="3" class="form-control" v-model="form.about" required/>
          </div>
        </div>

        <div class="col-md-12 col-lg-12">
          <div class="mb-3">
            <label for="editPhone" class="form-label" 
              >Alamat Lengkap</label
            >
            <textarea rows="3" class="form-control" v-model="form.address" required/>
          </div>
        </div>
      </div>
    </div>

    <div class="form-item">
      <div class="form-title fw-bold">Nomor Rekening</div>
      <div class="row">
        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="editBankName" class="form-label">Nama Bank</label>
            <select
              class="form-control nama_bank"
              name="nama_bank"
              id="nama_bank"
              v-model="form.bank_id"
              @change="setBank($event)"
              required
            >
              <option selected disabled>Choose Bank Name</option>
              <option value="1">Bank Central Asia (BCA)</option>
              <option value="2">Bank Mandiri</option>
              <option value="3">Bank Negara Indonesia (BNI)</option>
              <option value="4">Bank Rakyat Indonesia (BRI)</option>
              <option value="5">Bank Tabungan Negara (BTN)</option>
              <option value="6">Bank BRI Agroniaga</option>
              <option value="7">Bank Anda</option>
              <option value="8">Bank Artha Graha Internasional</option>
              <option value="9">Bank Bukopin</option>
              <option value="10">Bank Bumi Arta</option>
              <option value="11">Bank Capital Indonesia</option>
              <option value="12">Bank CIMB Niaga</option>
              <option value="13">Bank Danamon Indonesia</option>
              <option value="14">Bank Ekonomi Raharja</option>
              <option value="15">Bank Ganesha</option>
              <option value="16">Bank KEB Hana</option>
              <option value="18">Bank Woori Saudara</option>
              <option value="19">Bank ICBC Indonesia</option>
              <option value="20">Bank Index Selindo</option>
              <option value="21">Bank Maybank Indonesia</option>
              <option value="22">Bank Maspion</option>
              <option value="23">Bank Mayapada</option>
              <option value="24">Bank Mega</option>
              <option value="25">Bank Mestika Dharma</option>
              <option value="26">Bank Shinhan Indonesia</option>
              <option value="27">Bank MNC Internasional</option>
              <option value="28">Bank J Trust Indonesia</option>
              <option value="29">Bank Nusantara Parahyangan</option>
              <option value="30">Bank OCBC NISP</option>
              <option value="31">Bank of India Indonesia</option>
              <option value="32">Panin Bank</option>
              <option value="33">Bank Permata</option>
              <option value="34">Bank QNB Indonesia</option>
              <option value="35">Bank SBI Indonesia</option>
              <option value="36">Bank UOB Indonesia</option>
              <option value="37">Amar Bank Indonesia</option>
              <option value="38">Bank Andara</option>
              <option value="39">Bank Artos Indonesia</option>
              <option value="40">Bank Bisnis Internasional</option>
              <option value="41">Bank Tabungan Pensiunan Nasional</option>
              <option value="42">Bank Sahabat Sampoerna</option>
              <option value="43">Bank Fama Internasional</option>
              <option value="44">Bank Harda Internasional</option>
              <option value="45">Bank Mayora</option>
              <option value="46">Bank Mitraniaga</option>
              <option value="47">Bank Multi Arta Sentosa</option>
              <option value="48">Bank Pundi Indonesia</option>
              <option value="49">Bank Royal Indonesia</option>
              <option value="50">Bank Mandiri Taspen Pos</option>
              <option value="51">Bank Yudha Bhakti</option>
              <option value="52">Bank Jambi</option>
              <option value="53">Bank Bengkulu</option>
              <option value="54">Bank Sumsel Babel</option>
              <option value="55">Bank Lampung</option>
              <option value="56">Bank DKI</option>
              <option value="57">Bank BJB</option>
              <option value="58">Bank Jateng</option>
              <option value="59">Bank BPD DIY</option>
              <option value="60">Bank Jatim</option>
              <option value="61">Bank ANZ Indonesia</option>
              <option value="62">Bank Commonwealth</option>
              <option value="62">Bank Agris</option>
              <option value="63">Bank Capital Indonesia</option>
              <option value="64">Bank Rabobank International Indonesia</option>
              <option value="65">Citibank</option>
              <option value="66">HSBC</option>
              <option value="67">Bank Mega Syariah</option>
              <option value="68">Bank Muamalat Indonesia</option>
              <option value="69">Bank Syariah Indonesia (BSI)</option>
              <option value="70">BCA Syariah</option>
              <option value="71">Bank BJB Syariah</option>
              <option value="72">Bank Syariah Indonesia (BSI)</option>
              <option value="73">Panin Bank Syariah</option>
              <option value="74">Bank Syariah Bukopin</option>
              <option value="75">Bank Victoria Syariah</option>
              <option value="76">BTPN Syariah</option>
              <option value="77">Bank Maybank Syariah Indonesia</option>
              <option value="78">Bank BTN Syariah</option>
              <option value="79">Bank Danamon Syariah</option>
              <option value="80">CIMB Niaga Syariah</option>
              <option value="81">BII Syariah</option>
              <option value="82">OCBC NISP Syariah</option>
              <option value="83">Bank Permata Syariah</option>
              <option value="84">Bank DKI Syariah</option>
              <option value="85">Bank Kalbar Syariah</option>
              <option value="86">Bank Kalsel Syariah</option>
              <option value="87">Bank NTB Syariah</option>
              <option value="88">Bank Riau Kepri Syariah</option>
              <option value="89">Bank Sumsel Babel Syariah</option>
              <option value="90">Bank Syariah Mandiri</option>
              <option value="91">Bank Rakyat Indonesia Simpedes</option>
              <option value="92">Bank Negara Indonesia (BNI) Syariah</option>
              <option value="93">Bank Sumut</option>
              <option value="93">Bank Nagari (BPD Sumbar)</option>
              <option value="94">Bank Kalsel</option>
              <option value="95">Bank Jago</option>
              <option value="96">Bank seabank</option>
            </select>
          </div>
        </div>

        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="editAccount" class="form-label">Nomor Rekening</label>
            <input
              type="text"
              class="form-control"
              id="editAccount"
              v-model="form.rekening"
              required
            />
          </div>
        </div>

        <div class="col-md-4 col-lg-4">
          <div class="mb-3">
            <label for="editUserAccount" class="form-label"
              >Nama Pemilik Rekening</label
            >
            <input
              type="text"
              class="form-control"
              id="editUserAccount"
              v-model="form.nama_pemilik"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="form-item">
      <div class="form-title fw-bold">Akun Sosial Media</div>

      <div class="row">
        <div class="col-md-6 col-lg-6">
          <div class="input-group mb-3">
            <span class="input-group-text" id="editFacebook">
              <i class="bi bi-facebook me-3"></i>facebook.com/
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Username Facebook"
              aria-label="Facebook"
              aria-describedby="editFacebook"
              v-model="form.facebook"
              required
            />
          </div>
        </div>

        <div class="col-md-6 col-lg-6">
          <div class="input-group mb-3">
            <span class="input-group-text" id="editInstagram">
              <i class="bi bi-instagram me-3"></i>instagram.com/
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Username Instagram"
              aria-label="Instagram"
              aria-describedby="editInstagram"
              v-model="form.instagram"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="login-btn mt-3 d-grid gap-2">
      <button type="submit" class="btn btn-sm">Simpan Perubahan</button>
    </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      form: {
        name: "",
        pena: "",
        phone: "",
        about: "",
        bank_id: "",
        rekening: "",
        nama_pemilik: "",
        facebook: "",
        instagram: "",
        address: "",
        nama_bank: ""
      },
    };
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .get("myAccount", {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data = response.data.data.data;

          this.form.name = this.data.nama_lengkap;
          this.form.pena = this.data.nama_pena;
          this.form.phone = this.data.nomor_kontak;
          this.form.about = this.data.about;
          this.form.bank_id = this.data.id_bank;
          this.form.rekening = this.data.nomor_rekening;
          this.form.nama_pemilik = this.data.nama_pemilik_rekening;
          this.form.facebook = this.data.facebook;
          this.form.instagram = this.data.instagram;
          this.form.address = this.data.alamat_lengkap;

          console.log(this.data);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    setBank(event) {
      this.form.nama_bank = event.target.options[event.target.selectedIndex].text;
    },

    updateData() {
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post("updateData", {
            name: this.form.name,
            pena: this.form.pena,
            about: this.form.about,
            phone: this.form.phone,
            address: this.form.address,
            bank_id: this.form.bank_id,
            pemilik_rekening: this.form.nama_pemilik,
            nomor_rekening: this.form.rekening,
            bank_name: this.form.nama_bank,
            instagram: this.form.instagram,
            facebook: this.form.facebook,
          })
          .then((response) => {
            // console.log(response);

            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );
            this.loading = false;
            this.$router.go();
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Autentikasi Gagal",
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
