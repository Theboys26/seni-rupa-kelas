# Media Pembelajaran Seni Rupa Kelas VII
1. **Edit data.js**: nama guru, sekolah, KKM, dan (opsional) URL Docs/Sheets.
2. **Google Sheets**: buat spreadsheet baru > Extensions > Apps Script > tempel isi google-apps-script/Code.gs > Deploy > New deployment > Web app (Execute as: Me; Access: Anyone) > salin URL /exec > tempel ke GOOGLE_SHEETS_URL di data.js (atau menu Guru). Setiap hasil menjadi baris baru di sheet "Hasil". Setelah mengubah kode Apps Script, buat deployment baru.
3. **Google Docs**: buat dokumen modul > Share > "Anyone with the link: Viewer" > salin link ke GOOGLE_DOCS_URL.
4. **Jalankan**: laptop: klik dua kali index.html. HP: kirim folder ke HP atau buka lewat link deploy (langkah 5).
5. **Deploy gratis**: GitHub Pages (upload folder ke repo > Settings > Pages > branch main) atau Netlify Drop (seret folder ke app.netlify.com/drop).
6. **Ganti gambar galeri**: taruh foto di images/placeholder/ lalu isi `img:"images/placeholder/nama.jpg"` di GALERI (data.js).
