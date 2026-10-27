# Guepedia Company Frontend

Frontend Vue 2 dari source lokal dengan halaman katalog, detail buku, keranjang, akun, naskah, transaksi, dan tampilan admin. Ini adalah ekspor kode frontend; backend perusahaan, data akun, dokumen naskah, dan kredensial layanan tidak disertakan.

## Menjalankan lokal

Source menggunakan Vue CLI 4 dan dependency lama. Dari folder proyek:

```powershell
Copy-Item .env.example .env.local
npm ci --legacy-peer-deps
$env:NODE_OPTIONS='--openssl-legacy-provider'
npm run serve
```

Buka alamat yang dicetak Vue CLI. `VUE_APP_API_BASE_URL` menunjuk backend kompatibel yang kamu sediakan sendiri. Nilai contoh memakai localhost. `VUE_APP_ASSET_BASE_URL` mengatur awal URL cover. API_PROXY_TARGET mengatur target proxy /api pada server development; default tetap localhost. Konfigurasi Pusher bersifat opsional dan kosong secara default. Jangan menaruh secret server pada variabel VUE_APP karena nilainya masuk bundle browser.

Tanpa backend yang kompatibel, login, daftar, pencarian, transaksi, dan modul admin tidak akan bekerja lengkap. Tidak ada mock backend yang diklaim tersedia. Tautan atau gambar publik warisan source dapat memerlukan internet.

## Source yang dipilih

Root dengan `src`, `public`, dan package.json dipertahankan sebagai source utama. Snapshot bertanggal, hasil build lama, source map hasil deploy, ZIP, `.env` asli, catatan lokal, dan riwayat Git asing tidak ikut dalam ekspor. Dependency self-reference `guepedia: file:` dihapus agar instalasi tidak merujuk folder sendiri.

## Verifikasi dan keterbatasan

Build produksi `npm run build` berhasil dengan Node 22.14.0, npm 10.9.2, dan opsi OpenSSL legacy pada 27 Oktober 2026. Webpack melaporkan tiga peringatan ukuran aset, ukuran entrypoint, dan pemecahan bundle. Entrypoint utama sekitar 4,62 MiB. Instalasi dependency juga memberi peringatan engine dan paket usang.

Integrasi API, login, transaksi, dan otorisasi admin belum diuji karena backend tidak disertakan. Vue 2 serta Vue CLI 4 adalah stack lama dan masih memerlukan pembaruan sebelum pemakaian produksi. Aplikasi menyimpan token akses di localStorage sesuai source lama; model autentikasi dan otorisasi server harus ditinjau dengan backend.

## Asal kode

Checkout lokal memiliki upstream `barraaaa/guepediavps`. Ekspor ini tidak memodifikasi atau mengirim perubahan ke upstream tersebut. Tidak ada file lisensi proyek yang ditemukan; atribusi upstream dipertahankan di `NOTICE.md`. Branding dan aset perusahaan tidak diberikan lisensi baru oleh ekspor ini.
