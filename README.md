# Mico Farm Company Profile

## Menjalankan secara lokal

```sh
npm ci
npm run dev
```

## Deploy ke GitHub Pages

Website ini menggunakan Vite dan harus di-build sebelum dipublikasikan. File sumber di root repositori tidak dapat langsung dijalankan sebagai website produksi.

1. Di GitHub, buka **Settings → Pages → Build and deployment** dan pilih **GitHub Actions** sebagai source (bukan “Deploy from a branch”).
2. Gabungkan perubahan ini ke `main`. Workflow akan menjalankan `npm ci`, `npm run build`, dan mempublikasikan folder `dist` secara otomatis. Workflow juga dapat dijalankan secara manual melalui tab Actions.
3. Tunggu workflow **Deploy to GitHub Pages** selesai, lalu buka URL GitHub Pages repositori.

Untuk hosting lain, jalankan `npm ci && npm run build` dan publikasikan isi folder `dist`, bukan file sumber di root repositori. Routing menggunakan hash sehingga tidak memerlukan konfigurasi fallback server.
