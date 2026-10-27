<template>
    <div id="app">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content fade-in-up">
            <div class="hero-text">
              <h1>Wujudkan Buku Impian Anda dengan Guepedia GhostWriting</h1>
              <p>Kami membantu Anda mengubah ide menjadi buku yang siap diterbitkan. Dari konsep hingga halaman terakhir, kami hadir untuk membuatnya nyata.</p>
              <a href="ghost-writing/#form" class="cta-button">Mulai Proyek Anda Sekarang</a>
            </div>
            <div class="hero-image">
              <img src="@/assets/image/ghost.png" alt="Professional Writer">
            </div>
          </div>
        </div>
      </section>
  
      <!-- Ghostwriting Section -->
      <section class="section ghostwriting">
        <div class="container">
          <h2 class="section-title">Apa Itu Ghostwriting?</h2>
          <p class="section-subtitle">
            Ghostwriting adalah layanan penulisan buku di mana penulis profesional menulis buku atas nama klien. Klien tetap menjadi penulis resmi buku, sementara kami membantu mewujudkan ide, cerita, atau pengetahuan mereka dalam bentuk buku yang siap terbit.
          </p>
          
          <div class="benefits">
            <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Process Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Proses Kerja Guepedia Ghostwriter</h2>
          <p class="section-subtitle">
            Kami bekerja sama dengan Anda melalui proses yang terstruktur dan jelas. Berikut adalah langkah-langkah yang akan kami lakukan untuk mewujudkan buku Anda.
          </p>
          
          <div class="process-steps">
            <div class="step" v-for="(step, index) in processSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Form Section -->
      <section id="form" class="section form-section">
        <div class="container">
          <h2 class="section-title">Isi Form Berikut untuk Memulai Proyek Buku Anda</h2>
          <p class="section-subtitle">
            Lengkapi form di bawah agar kami bisa mulai bekerja bersama Anda. Kami akan segera menghubungi Anda untuk membahas detail lebih lanjut.
          </p>
          
          <!-- Success Message -->
          <div v-if="submitSuccess" class="success-message">
            <h3>✅ Terima kasih!</h3>
            <p>Form Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda dalam 1x24 jam.</p>
          </div>

          <!-- Error Message -->
          <div v-if="submitError" class="error-message">
            <h3>❌ Terjadi Kesalahan</h3>
            <p>{{ submitError }}</p>
            <button @click="submitError = ''" class="close-error">Tutup</button>
          </div>
          
          <div class="form-container" v-if="!submitSuccess">
            <form @submit.prevent="submitForm">
              <div class="form-grid">
                <div class="form-group">
                  <label for="nama">Nama Lengkap</label>
                  <input type="text" id="nama" v-model="formData.nama" required>
                </div>
                <div class="form-group">
                  <label for="telepon">Nomor Telepon</label>
                  <input type="tel" id="telepon" v-model="formData.telepon" required>
                </div>
                <div class="form-group full-width">
                  <label for="email">Email</label>
                  <input type="email" id="email" v-model="formData.email" required>
                </div>
                <div class="form-group">
                  <label for="kategori">Kategori Buku</label>
                  <select id="kategori" v-model="formData.kategori" required>
                    <option value="">Pilih Kategori</option>
                    <option v-for="kategori in kategoriOptions" :key="kategori.value" :value="kategori.value">
                      {{ kategori.text }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="tema">Tema Buku</label>
                  <select id="tema" v-model="formData.tema" required>
                    <option value="">Pilih Tema</option>
                    <option v-for="tema in temaOptions" :key="tema.value" :value="tema.value">
                      {{ tema.text }}
                    </option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label for="judul">Judul Buku</label>
                  <input type="text" id="judul" v-model="formData.judul" required>
                </div>
                <div class="form-group full-width">
                  <label for="deskripsi">Deskripsi Buku</label>
                  <textarea id="deskripsi" v-model="formData.deskripsi" placeholder="Ceritakan tentang buku yang ingin Anda tulis..." required></textarea>
                </div>
                <div class="form-group">
                  <label for="draft">Apakah Anda Sudah Memiliki Draft?</label>
                  <select id="draft" v-model="formData.draft" required>
                    <option value="">Pilih Opsi</option>
                    <option value="ya">Ya</option>
                    <option value="tidak">Tidak</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="halaman">Perkiraan Halaman Buku</label>
                  <select id="halaman" v-model="formData.halaman" required>
                    <option value="">Pilih Jumlah Halaman</option>
                    <option v-for="halaman in halamanOptions" :key="halaman.value" :value="halaman.value">
                      {{ halaman.text }}
                    </option>
                  </select>
                </div>
              </div>
              
              <button type="submit" class="submit-button" :disabled="isSubmitting">
                {{ isSubmitting ? 'Mengirim...' : 'Kirim & Mulai Proyek' }}
              </button>
            </form>
          </div>

          <!-- Reset Form Button (shown after success) -->
          <div v-if="submitSuccess" class="reset-container">
            <button @click="resetFormAndMessages" class="reset-button">
              Kirim Form Lagi
            </button>
          </div>
        </div>
      </section>
  
      <!-- WhatsApp Button -->
      <a :href="whatsappUrl" class="whatsapp-button" target="_blank">
        <span>💬</span>
        <span>Hubungi Kami via WhatsApp</span>
      </a>
    </div>
</template>

<script>
export default {
    name: 'GuepediaGhostwriter',
    data() {
      return {
        isSubmitting: false,
        submitSuccess: false,
        submitError: '',
        whatsappUrl: 'https://wa.me/6281287602508',
        apiEndpoint: (process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000') + "/api/ghostwriting/submit",
        formData: {
          nama: '',
          telepon: '',
          email: '',
          kategori: '',
          tema: '',
          judul: '',
          deskripsi: '',
          draft: '',
          halaman: ''
        },
        benefits: [
            {
                title: 'Proses Kolaboratif',
                description: 'Anda tetap terlibat di setiap langkah untuk memastikan buku mencerminkan visi Anda.'
            },
            {
                title: 'Tulis Buku Tanpa Menulis',
                description: 'Kami menulis untuk Anda berdasarkan wawancara, riset, dan feedback.'
            },
            {
                title: 'Beragam Genre dan Tujuan',
                description: 'Fiksi, non-fiksi, biografi, panduan, dan lain-lain.'
            },
            {
                title: 'Harga Terjangkau',
                description: 'Layanan mulai dari Rp100.000 per halaman'
            },
            {
                title: 'Privasi dan Hak Penulis Terjamin',
                description: 'Nama Anda tercantum sebagai penulis resmi, ghostwriter tidak disebutkan.'
            },
            {
                title: 'Buku Siap Terbit',
                description: 'Kami bantu Anda dari draft pertama hingga penerbitan, termasuk desain, ISBN, dan promosi.'
            }
         ],
        processSteps: [
          {
            title: 'Diskusi Proyek',
            description: 'Kami mulai dengan diskusi mendalam tentang visi Anda untuk buku. Ini bisa dilakukan secara online atau offline.'
          },
          {
            title: 'Menentukan Tujuan dan Target',
            description: 'Kami akan bertanya tentang tujuan buku, apakah untuk self-publishing atau mencari penerbit, serta siapa target pembaca Anda.'
          },
          {
            title: 'Riset Materi',
            description: 'Kami melakukan riset untuk memastikan buku Anda terisi dengan konten yang tepat dan berkualitas tinggi.'
          },
          {
            title: 'Estimasi Waktu dan Layouting',
            description: 'Kami akan menyusun rencana waktu dan layout buku agar sesuai dengan tujuan dan panjang buku.'
          },
          {
            title: 'Draft Awal & Revisi',
            description: 'Kami menulis draft pertama, kemudian melakukan revisi berdasarkan feedback Anda.'
          },
          {
            title: 'Cover, ISBN, dan QRCBN',
            description: 'Setelah draft final disetujui, kami bantu membuat desain sampul, memperoleh ISBN, dan menambahkan QRCBN untuk akses buku digital.'
          }
        ],
        kategoriOptions: [
          { value: 'biografi', text: 'Biografi' },
          { value: 'fiksi', text: 'Fiksi' },
          { value: 'non-fiksi', text: 'Non-Fiksi' },
          { value: 'panduan', text: 'Buku Panduan' },
          { value: 'lainnya', text: 'Lainnya' }
        ],
        temaOptions: [
          { value: 'motivasi', text: 'Motivasi' },
          { value: 'pengembangan-diri', text: 'Pengembangan Diri' },
          { value: 'cerita-hidup', text: 'Cerita Hidup' },
          { value: 'lainnya', text: 'Lainnya' }
        ],
        halamanOptions: [
          { value: '70-100', text: '70-100 Halaman' },
          { value: '100-150', text: '100-150 Halaman' },
          { value: '150+', text: '150+ Halaman' }
        ]
      }
    },
    methods: {
      async submitForm() {
        if (!this.validateForm()) {
          return;
        }

        this.isSubmitting = true;
        this.submitError = '';
        
        try {
          const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(this.formData)
          });

          const responseData = await response.json();

          if (response.ok) {
            // Success
            this.submitSuccess = true;
            console.log('Form submitted successfully:', responseData);
            
            // Scroll to success message
            setTimeout(() => {
              document.getElementById('form').scrollIntoView({ 
                behavior: 'smooth' 
              });
            }, 100);
          } else {
            // API returned error
            throw new Error(responseData.message || 'Terjadi kesalahan saat mengirim data');
          }
        } catch (error) {
          console.error('Submit error:', error);
          
          // Handle different types of errors
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            this.submitError = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda dan coba lagi.';
          } else if (error.message.includes('Failed to fetch')) {
            this.submitError = 'Koneksi terputus. Silakan periksa koneksi internet Anda.';
          } else {
            this.submitError = error.message || 'Terjadi kesalahan tidak terduga. Silakan coba lagi.';
          }
        } finally {
          this.isSubmitting = false;
        }
      },
      
      validateForm() {
        const requiredFields = ['nama', 'telepon', 'email', 'kategori', 'tema', 'judul', 'deskripsi', 'draft', 'halaman'];
        
        for (let field of requiredFields) {
          if (!this.formData[field] || this.formData[field].trim() === '') {
            alert(`Mohon lengkapi field ${this.getFieldLabel(field)}`);
            return false;
          }
        }
        
        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.formData.email)) {
          alert('Format email tidak valid');
          return false;
        }
        
        // Validasi nomor telepon (minimal 10 digit)
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(this.formData.telepon)) {
          alert('Format nomor telepon tidak valid');
          return false;
        }
        
        return true;
      },
      
      getFieldLabel(field) {
        const labels = {
          nama: 'Nama Lengkap',
          telepon: 'Nomor Telepon',
          email: 'Email',
          kategori: 'Kategori Buku',
          tema: 'Tema Buku',
          judul: 'Judul Buku',
          deskripsi: 'Deskripsi Buku',
          draft: 'Status Draft',
          halaman: 'Perkiraan Halaman'
        };
        return labels[field] || field;
      },
      
      resetForm() {
        this.formData = {
          nama: '',
          telepon: '',
          email: '',
          kategori: '',
          tema: '',
          judul: '',
          deskripsi: '',
          draft: '',
          halaman: ''
        };
      },
      
      resetFormAndMessages() {
        this.resetForm();
        this.submitSuccess = false;
        this.submitError = '';
      }
    }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #ffffff;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

  /* Hero Section */
.hero {
    background: linear-gradient(135deg, #f8fffe 0%, #e8f5f0 100%);
    padding: 80px 0;
    min-height: 90vh;
    display: flex;
    align-items: center;
}
    .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.hero-text h1 {
    font-size: 3.5em;
    font-weight: 700;
    color: #2d6a4f;
    margin-bottom: 20px;
    line-height: 1.2;
}

.hero-text p {
    font-size: 1.3em;
    color: #52796f;
    margin-bottom: 30px;
    line-height: 1.6;
}

.cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #40916c 0%, #2d6a4f 100%);
    color: white;
    padding: 18px 35px;
    text-decoration: none;
    border-radius: 50px;
    font-size: 1.2em;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(64, 145, 108, 0.3);
}
.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(64, 145, 108, 0.4);
    background: linear-gradient(135deg, #2d6a4f 0%, #1b5e20 100%);
}

.hero-image {
    position: relative;
}

.hero-image img {
    width: 100%;
    height: auto;
    
}

  /* Section Styles */
.section {
    padding: 80px 0;
}

.section-title {
    font-size: 2.8em;
    font-weight: 700;
    color: #2d6a4f;
    text-align: center;
    margin-bottom: 20px;
}

.section-subtitle {
    font-size: 1.3em;
    color: #52796f;
    text-align: center;
    margin-bottom: 50px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

  /* Ghostwriting Section */
.ghostwriting {
    background: #f8fffe;
}

.benefits {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 50px;
}

.benefit-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border-left: 5px solid #40916c;
}

.benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.benefit-card h3 {
    color: #2d6a4f;
    font-size: 1.4em;
    margin-bottom: 15px;
    font-weight: 600;
}

.benefit-card p {
    color: #52796f;
    line-height: 1.6;
}

  /* Process Section */
.process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
    margin-top: 50px;
}

.step {
    display: flex;
    align-items: flex-start;
    gap: 20px;
}

.step-number {
    background: linear-gradient(135deg, #40916c 0%, #2d6a4f 100%);
    color: white;
    font-size: 1.2em;
    font-weight: bold;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.step-content h3 {
    color: #2d6a4f;
    font-size: 1.3em;
    margin-bottom: 10px;
    font-weight: 600;
}

.step-content p {
    color: #52796f;
    line-height: 1.6;
}

  /* Form Section */
.form-section {
    background: linear-gradient(135deg, #f8fffe 0%, #e8f5f0 100%);
}

.form-container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
}

.form-group {
    margin-bottom: 25px;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #2d6a4f;
    font-weight: 600;
    font-size: 1.1em;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e8f5f0;
    border-radius: 10px;
    font-size: 1em;
    transition: all 0.3s ease;
    background-color: #fafafa;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #40916c;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(64, 145, 108, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

.submit-button {
    background: linear-gradient(135deg, #40916c 0%, #2d6a4f 100%);
    color: white;
    padding: 18px 40px;
    border: none;
    border-radius: 50px;
    font-size: 1.2em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    box-shadow: 0 8px 25px rgba(64, 145, 108, 0.3);
}

.submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(64, 145, 108, 0.4);
}

.submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* Success and Error Messages */
.success-message {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    border: 2px solid #28a745;
    color: #155724;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(40, 167, 69, 0.1);
}

.success-message h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #155724;
}

.error-message {
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    border: 2px solid #dc3545;
    color: #721c24;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(220, 53, 69, 0.1);
}

.error-message h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #721c24;
}

.close-error {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    font-weight: 600;
}

.close-error:hover {
    background: #c82333;
}

.reset-container {
    text-align: center;
    margin-top: 30px;
}

.reset-button {
    background: linear-gradient(135deg, #40916c 0%, #2d6a4f 100%);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1.1em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(64, 145, 108, 0.3);
}

.reset-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(64, 145, 108, 0.4);
}

  /* WhatsApp Button */
.whatsapp-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #25D366;
    color: white;
    padding: 15px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
}

.whatsapp-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(37, 211, 102, 0.5);
}

  /* Responsive Design */
@media (max-width: 768px) {
    .hero-content {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
    }

    .hero-text h1 {
    font-size: 2.5em;
    }

    .section-title {
    font-size: 2.2em;
    }

    .form-container {
    padding: 30px 25px;
    }

    .form-grid {
    grid-template-columns: 1fr;
    }

    .process-steps {
    grid-template-columns: 1fr;
    }

    .whatsapp-button {
    bottom: 20px;
    right: 20px;
    padding: 12px;
    }
}

  /* Animations */
@keyframes fadeInUp {
    from {
    opacity: 0;
    transform: translateY(30px);
    }
    to {
    opacity: 1;
    transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.8s ease-out;
}
</style>