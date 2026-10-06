// ===== DATA & KONFIGURASI (GURU DAPAT MENGEDIT BAGIAN INI) =====
const GURU = "Nama Guru";          // <- ganti nama guru
const SEKOLAH = "Nama Sekolah";    // <- ganti nama sekolah
const KKM = 75;                    // <- nilai ketuntasan
// Tempel URL Web App Google Apps Script (berakhiran /exec). Bisa juga diatur lewat menu Guru.
const GOOGLE_SHEETS_URL = "TEMPEL_URL_GOOGLE_APPS_SCRIPT_DI_SINI";
// Tempel link Google Docs modul. Bisa juga diatur lewat menu Guru.
const GOOGLE_DOCS_URL = "TEMPEL_LINK_GOOGLE_DOCS_DI_SINI";

// Format soal: [pertanyaan, [opsi...], indeks jawaban benar (mulai 0)]
const MATERI = [
 {t:"Pengertian Seni Rupa",r:"Seni rupa adalah karya seni yang dinikmati lewat penglihatan dan sering bisa diraba. Karya dibuat dengan unsur seperti garis, warna, bentuk, dan tekstur.",c:"Lukisan, patung, poster, dan batik.",q:["Seni rupa terutama dinikmati melalui indra...",["Penglihatan","Pendengaran","Penciuman","Pengecap"],0]},
 {t:"Fungsi Seni Rupa",r:"Seni rupa berfungsi untuk mengekspresikan diri, menghias (estetika), menyampaikan pesan, mendukung adat/ritual, dan sebagai benda pakai.",c:"Poster kebersihan menyampaikan pesan; batik menghias pakaian.",q:["Poster ajakan menjaga lingkungan berfungsi untuk...",["Menyampaikan pesan","Mengiringi tari","Menyanyikan lagu","Memasak"],0]},
 {t:"Unsur-Unsur Seni Rupa",r:"Titik (unsur terkecil), garis (goresan memanjang), bidang (area dua dimensi), bentuk, warna, tekstur (halus/kasar permukaan), ruang (kesan jauh/dekat), dan gelap terang (kesan volume).",c:"Kulit kayu yang kasar memperlihatkan unsur tekstur.",q:["Halus atau kasarnya permukaan benda disebut...",["Tekstur","Titik","Ruang","Garis"],0]},
 {t:"Prinsip Seni Rupa",r:"Kesatuan (unsur terpadu), keseimbangan (bobot visual seimbang), irama (pengulangan), penekanan (pusat perhatian), proporsi (perbandingan ukuran), dan keselarasan (unsur serasi).",c:"Motif batik yang berulang menunjukkan irama.",q:["Bobot visual kiri dan kanan yang seimbang disebut prinsip...",["Keseimbangan","Irama","Proporsi","Penekanan"],0]},
 {t:"Seni Rupa 2 Dimensi",r:"Karya yang hanya punya panjang dan lebar sehingga dilihat dari satu arah.",c:"Lukisan, poster, gambar, ilustrasi, dan fotografi.",q:["Manakah contoh seni rupa 2 dimensi?",["Poster","Patung","Keramik","Miniatur"],0]},
 {t:"Seni Rupa 3 Dimensi",r:"Karya yang punya panjang, lebar, dan tinggi sehingga bisa dilihat dari banyak sisi.",c:"Patung, keramik, kriya, dan miniatur.",q:["Karya yang bisa dilihat dari banyak sisi termasuk seni rupa...",["3 dimensi","2 dimensi","Suara","Gerak"],0]},
 {t:"Apresiasi Karya Seni Rupa",r:"Langkahnya: mengamati, mendeskripsikan, menganalisis (unsur dan prinsip), menafsirkan (makna), lalu menilai dengan sopan.",c:"Mengamati lukisan pemandangan, lalu menyebut warna dan garis yang tampak.",q:["Setelah mengamati karya, langkah berikutnya adalah...",["Mendeskripsikan","Menilai","Menafsirkan","Menjual"],0]}
];
// img: kosongkan untuk memakai emoji, atau isi "images/placeholder/nama.jpg" untuk mengganti dengan foto
const GALERI = [
 {n:"Lukisan Pemandangan",j:"2 Dimensi",te:"Cat air di kertas",u:"Warna, bidang, ruang",d:"Pemandangan gunung dan sawah dengan warna lembut.",e:"🏞️",c:"#a5d8ff",img:""},
 {n:"Poster Peduli Lingkungan",j:"2 Dimensi",te:"Desain digital",u:"Warna, bentuk, garis",d:"Poster ajakan membuang sampah pada tempatnya.",e:"♻️",c:"#b2f2bb",img:""},
 {n:"Foto Potret",j:"2 Dimensi",te:"Fotografi",u:"Gelap terang, ruang",d:"Foto wajah dengan permainan cahaya.",e:"📸",c:"#ffec99",img:""},
 {n:"Patung Batu",j:"3 Dimensi",te:"Memahat",u:"Bentuk, tekstur, ruang",d:"Patung dipahat dari batu dan dilihat dari segala sisi.",e:"🗿",c:"#dee2e6",img:""},
 {n:"Guci Keramik",j:"3 Dimensi",te:"Membentuk tanah liat",u:"Bentuk, tekstur, warna",d:"Guci dari tanah liat yang dibakar dan diglasir.",e:"🏺",c:"#ffd8a8",img:""},
 {n:"Miniatur Rumah Adat",j:"3 Dimensi",te:"Menyusun bahan",u:"Bentuk, garis, proporsi",d:"Rumah adat berukuran kecil dari kayu dan bambu.",e:"🏠",c:"#eebefa",img:""}
];
// Aktivitas: [emoji, nama, jawaban(0=2D,1=3D)]
const JENIS = [["🖼️","Lukisan pemandangan",0],["🗿","Patung pahlawan",1],["📸","Foto keluarga",0],["🏺","Guci keramik",1]];
// [deskripsi, indeks jawaban] opsi: Titik, Garis, Warna, Tekstur
const UNSUR = [["✨ Gambar bintang-bintang kecil di langit malam",0],["🛣️ Gambar jalan lurus dan berkelok",1],["🌈 Gambar pelangi merah, kuning, hijau, biru",2],["🪵 Gambar kulit kayu yang kasar",3]];
// [pernyataan, 0=BENAR / 1=SALAH]
const BS = [["Seni rupa tiga dimensi hanya dapat dilihat dari satu arah.",1],["Poster termasuk seni rupa 2 dimensi.",0],["Warna merupakan salah satu unsur seni rupa.",0],["Irama berkaitan dengan pengulangan unsur.",0]];

const KUIS = [
 ["Seni rupa dinikmati terutama melalui indra...",["Penglihatan","Pendengaran","Penciuman","Pengecap"],0],
 ["Manakah contoh karya seni rupa?",["Lukisan","Lagu","Tari","Drama"],0],
 ["Poster ajakan hemat air berfungsi untuk...",["Menyampaikan pesan","Mengiringi tari","Bernyanyi","Memasak"],0],
 ["Unsur seni rupa yang paling kecil adalah...",["Titik","Bidang","Ruang","Bentuk"],0],
 ["Goresan memanjang disebut...",["Garis","Titik","Tekstur","Ruang"],0],
 ["Bidang pada seni rupa 2 dimensi memiliki...",["Panjang dan lebar","Tinggi saja","Berat saja","Suara"],0],
 ["Merah, kuning, dan biru disebut warna...",["Primer","Sekunder","Netral","Dingin"],0],
 ["Halus atau kasarnya permukaan disebut...",["Tekstur","Garis","Titik","Irama"],0],
 ["Gelap terang menciptakan kesan...",["Volume atau berbentuk","Suara","Rasa","Bau"],0],
 ["Kesan jauh dan dekat dalam gambar disebut...",["Ruang","Titik","Warna","Garis"],0],
 ["Keterpaduan semua unsur dalam karya disebut...",["Kesatuan","Irama","Proporsi","Titik"],0],
 ["Bobot visual yang seimbang adalah prinsip...",["Keseimbangan","Irama","Penekanan","Bidang"],0],
 ["Pengulangan unsur secara teratur disebut...",["Irama","Proporsi","Kesatuan","Tekstur"],0],
 ["Bagian yang menjadi pusat perhatian disebut...",["Penekanan","Irama","Garis","Titik"],0],
 ["Perbandingan ukuran antarbagian disebut...",["Proporsi","Irama","Warna","Ruang"],0],
 ["Contoh seni rupa 2 dimensi adalah...",["Lukisan","Patung","Keramik","Miniatur"],0],
 ["Contoh seni rupa 3 dimensi adalah...",["Patung","Poster","Foto","Gambar"],0],
 ["Tas anyaman yang bisa dipakai termasuk karya...",["Kriya","Fotografi","Poster","Titik"],0],
 ["Langkah pertama apresiasi karya adalah...",["Mengamati","Menilai","Menafsirkan","Menjual"],0],
 ["Sikap apresiatif terhadap karya teman adalah...",["Menghargai dan memberi masukan sopan","Mengejek","Merusak","Mengabaikan"],0]
];
const EV_MC = [
 ["Garis, bidang, dan warna disebut...",["Unsur seni rupa","Alat musik","Gerak tari","Naskah drama"],0],
 ["Ilustrasi buku cerita termasuk seni rupa...",["2 dimensi","3 dimensi","Suara","Gerak"],0],
 ["Keramik termasuk seni rupa...",["3 dimensi","2 dimensi","Suara","Tulisan"],0],
 ["Warna sekunder berasal dari campuran...",["Dua warna primer","Hitam dan putih","Satu warna","Air saja"],0],
 ["Motif batik yang berulang menunjukkan prinsip...",["Irama","Proporsi","Kesatuan","Titik"],0],
 ["Fokus utama sebuah lukisan disebut...",["Penekanan","Irama","Tekstur","Bidang"],0],
 ["Menjelaskan makna karya termasuk langkah...",["Menafsirkan","Mengamati","Menilai","Menjual"],0],
 ["Memberi pendapat tentang kualitas karya adalah langkah...",["Menilai","Mengamati","Mendeskripsikan","Menghapus"],0],
 ["Lukisan di dinding rumah berfungsi untuk...",["Menghias ruangan","Memasak","Menimbang","Mengukur"],0],
 ["Miniatur rumah adat termasuk seni rupa...",["3 dimensi","2 dimensi","Suara","Gerak"],0]
];
const EV_TF = [["Seni rupa 3 dimensi dapat dilihat dari banyak sisi.",0],["Fotografi termasuk seni rupa 3 dimensi.",1],["Warna adalah unsur seni rupa.",0],["Mengejek karya teman adalah sikap apresiatif.",1],["Keseimbangan hanya boleh simetris.",1]];
const EV_ES = ["Jelaskan pengertian seni rupa dengan bahasamu sendiri.","Sebutkan 3 unsur seni rupa dan contohnya di sekitarmu.","Bagaimana caramu menghargai karya seni temanmu?"];
