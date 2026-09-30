require('dotenv').config();
const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const app = express();

// ==========================================
// 1. SECURITY & MIDDLEWARE (Keamanan & Pengaturan Dasar)
// ==========================================
app.use(compression());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
            connectSrc: ["'self'"], 
            imgSrc: ["'self'", "data:"]
        }
    },
    crossOriginEmbedderPolicy: false 
}));

app.use(express.json());

// ==========================================
// 2. REST API ENDPOINTS (Jalur Pengambilan Data)
// ==========================================

// Endpoint Konfigurasi Nomor WA
app.get('/api/config', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            waNumber: process.env.WA_NUMBER || "6285647335105" 
        }
    });
});

// Endpoint Daftar Keunggulan (Bahasa sudah disesuaikan untuk UMKM)
app.get('/api/skills', (req, res) => {
    const skills = [
        { 
            id: 1, 
            name: "Sistem Kuat & Anti-Lelet", 
            icon: "fa-brands fa-node-js", 
            desc: "Aplikasi yang sanggup membalas ribuan chat pembeli secara bersamaan tanpa bikin sistem macet." 
        },
        { 
            id: 2, 
            name: "Asisten Admin Cerdas (AI)", 
            icon: "fa-solid fa-brain", 
            desc: "Teknologi pintar yang otomatis membalas pertanyaan pelanggan dengan ramah dan nyambung, layaknya manusia asli." 
        },
        { 
            id: 3, 
            name: "WA Resmi & Kirim Pesan Massal", 
            icon: "fa-brands fa-whatsapp", 
            desc: "Bisa kirim pesan promo ke banyak pelanggan sekaligus, tanpa takut nomor diblokir karena pakai jalur resmi." 
        },
        { 
            id: 4, 
            name: "Gampang Disambung ke Aplikasi Lain", 
            icon: "fa-solid fa-network-wired", 
            desc: "Mudah dihubungkan dengan aplikasi kasir, sistem toko online, atau aplikasi lain yang sudah usaha Anda pakai saat ini." 
        },
        { 
            id: 5, 
            name: "Catatan Stok & Harga Selalu Akurat", 
            icon: "fa-solid fa-database", 
            desc: "Info barang, harga, dan sisa stok akan selalu cocok dengan catatan toko Anda tanpa harus diubah manual tiap saat." 
        },
        { 
            id: 6, 
            name: "Bisa Diambil Alih Manual Kapan Saja", 
            icon: "fa-solid fa-headset", 
            desc: "Tersedia layar kerja khusus agar admin Anda (manusia) bisa langsung membalas chat jika pembeli butuh bantuan khusus." 
        },
        { 
            id: 7, 
            name: "Keamanan Data Pembeli Terjamin", 
            icon: "fa-solid fa-shield-halved", 
            desc: "Data kontak dan riwayat obrolan pelanggan Anda dikunci rapat dengan sistem keamanan tinggi agar tidak bocor." 
        },
        { 
            id: 8, 
            name: "Toko Online Terus Tanpa Henti", 
            icon: "fa-solid fa-bolt", 
            desc: "Berjalan di server andalan, jadi asisten ini siap melayani pembeli Anda 24 jam non-stop tanpa kenal lelah."
        }
    ];
    
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({
        status: "success",
        message: "Daftar fitur berhasil diambil",
        data: skills
    });
});

// ==========================================
// 3. LANDING PAGE RENDERING (Halaman Depan Website)
// ==========================================
app.get('/', (req, res) => {
    const landingHTML = `
<!DOCTYPE html>
<html lang="id" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>Zea Intelligent — Asisten Admin WhatsApp untuk Bisnis Anda</title>
    <meta name="title" content="Zea Intelligent — Asisten Admin WhatsApp untuk Bisnis Anda">
    <meta name="description" content="Solusi praktis membalas pesan pelanggan 24 jam pakai asisten pintar. Tingkatkan jualan tanpa harus capek balas chat satu-satu.">

    <!-- Open Graph / WhatsApp / LinkedIn -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://zeateknologiindonesia.web.id/">
    <meta property="og:title" content="Zea Intelligent — Bikin Jualan Makin Gampang & Laris">
    <meta property="og:description" content="Hemat waktu & biaya admin. Biar asisten pintar kami yang melayani pembeli Anda 24 jam penuh.">
    <meta property="og:image" content="https://zeateknologiindonesia/og-image.png">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background-color: #030712;
            background-image: radial-gradient(rgba(34, 197, 94, 0.15) 1px, transparent 1px);
            background-size: 40px 40px;
        }
        
        .glass-card {
            background: rgba(17, 24, 39, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(34, 197, 94, 0.1);
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #374151; }

        @keyframes pulse-slow { 
            0%, 100% { opacity: 1; } 
            50% { opacity: .4; } 
        }
        .skeleton { animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    </style>
</head>
<body class="text-gray-100 antialiased selection:bg-green-500 selection:text-black min-h-screen flex flex-col items-center relative overflow-x-hidden pb-20">
    
    <!-- Efek Bintik Putih Menyala dan Bergerak -->
    <canvas id="particles-bg" class="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none"></canvas>

    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-900/20 blur-[120px] -z-10 pointer-events-none"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px] -z-10 pointer-events-none"></div>

    <header class="w-full max-w-6xl px-6 py-6 flex justify-between items-center z-20">
        <div class="font-extrabold text-xl tracking-tighter text-white">
            Z<span class="text-green-500">TI</span> <span class="text-xs font-normal text-gray-400 ml-1">lntelligent zea</span>
        </div>
        <div class="hidden sm:flex space-x-6 text-sm font-medium text-gray-400">
            <a href="#solutions" class="hover:text-green-400 transition">Manfaat untuk Usaha Anda</a>
            <a href="#expertise" class="hover:text-green-400 transition">Fitur Lengkap</a>
            <a href="#contact" class="hover:text-green-400 transition">Tanya-Tanya</a>
        </div>
    </header>
    
    <main class="text-center px-6 max-w-4xl z-10 pt-16 md:pt-24 flex-grow flex flex-col justify-center items-center">
        <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs md:text-sm font-semibold mb-8 shadow-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Asisten Admin Otomatis Buka 24 Jam</span>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Jualan Makin Laris dengan <span class="bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent">Asisten WhatsApp Pintar</span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            Tinggalkan cara lama membalas chat satu-satu. Biar asisten cerdas kami yang membalas pesan pelanggan siang-malam, sehingga Anda bisa fokus membesarkan usaha dan menghemat biaya admin!
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a id="wa-btn" href="#" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-8 py-4 text-base rounded-xl bg-green-500 hover:bg-green-400 text-gray-950 font-bold transition shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transform hover:-translate-y-1 duration-200">
                <i class="fa-brands fa-whatsapp text-xl mr-2"></i>
                Konsultasi Gratis via WA 
            </a>
            <a href="#expertise" class="inline-flex items-center justify-center px-8 py-4 text-base rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white font-semibold transition duration-200">
                Lihat Fitur Kami
            </a>
        </div>
    </main>

    <!-- SECTION SOLUSI BISNIS -->
    <section id="solutions" class="w-full max-w-6xl px-6 z-10 mt-28">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 rounded-2xl glass-card text-left">
                <div class="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 text-green-400 text-2xl">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Toko Buka 24 Jam</h3>
                <p class="text-sm text-gray-400 leading-relaxed">
                    Otomatis melayani pembeli yang menanyakan harga atau mau beli barang, bahkan saat Anda sedang tidur. Tidak ada lagi pembeli kabur karena admin balasnya lama!
                </p>
            </div>
            
            <div class="p-8 rounded-2xl glass-card text-left">
                <div class="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 text-green-400 text-2xl">
                    <i class="fa-solid fa-database"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Stok Selalu Update</h3>
                <p class="text-sm text-gray-400 leading-relaxed">
                    Asisten akan mengecek langsung sisa barang di catatan toko, memastikan info stok dan harga yang diberikan ke pelanggan selalu pas dan tidak pernah salah.
                </p>
            </div>

            <div class="p-8 rounded-2xl glass-card text-left">
                <div class="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 text-green-400 text-2xl">
                    <i class="fa-solid fa-user-shield"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">1 Nomor WA Untuk Semua</h3>
                <p class="text-sm text-gray-400 leading-relaxed">
                    Punya banyak tim admin? Tenang, mereka semua bisa membalas chat pembeli pakai 1 nomor WA yang sama lewat layar kerja kami yang super gampang dipakai.
                </p>
            </div>
        </div>
    </section>

    <!-- SECTION KEAHLIAN TEKNIS -->
    <section id="expertise" class="w-full max-w-6xl px-6 z-10 mt-32">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Fitur Unggulan Kami</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Semua alat canggih yang siap bantu mempermudah operasional harian jualan online Anda.</p>
        </div>
        
        <div id="skills-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="p-6 rounded-2xl glass-card h-36 skeleton"></div>
            <div class="p-6 rounded-2xl glass-card h-36 skeleton"></div>
            <div class="p-6 rounded-2xl glass-card h-36 skeleton"></div>
            <div class="p-6 rounded-2xl glass-card h-36 skeleton"></div>
        </div>
    </section>
    
    <footer id="contact" class="mt-32 border-t border-gray-800/60 pt-8 pb-4 text-sm text-gray-500 w-full text-center z-10">
        &copy; <span id="current-year"></span> Zea Technology. All rights reserved. | <a href="/privacy.html" class="hover:text-green-400 transition font-medium underline">Kebijakan Privasi</a>
    </footer>

    <script>
        document.getElementById('current-year').textContent = new Date().getFullYear();

        document.addEventListener('DOMContentLoaded', async () => {
            const container = document.getElementById('skills-container');
            const waBtn = document.getElementById('wa-btn');
            const waMessage = encodeURIComponent("Halo Kak, saya mau tanya-tanya soal sistem admin pintar untuk usaha saya nih.");
            
            try {
                // 1. Fetch Konfigurasi
                const configRes = await fetch('/api/config');
                if (configRes.ok) {
                    const configData = await configRes.json();
                    const waNumber = configData.data.waNumber;
                    waBtn.href = \`https://wa.me/\${waNumber}?text=\${waMessage}\`;
                }

                // 2. Fetch Data Layanan & Keahlian
                const response = await fetch('/api/skills');
                if (!response.ok) throw new Error('Network response failure');
                const result = await response.json();

                if (result.status === 'success') {
                    const cardsHTML = result.data.map((skill) => {
                        return \`
                            <div class="p-6 rounded-2xl glass-card hover:bg-gray-800/40 hover:border-green-500/30 transition-all duration-300 group flex flex-col items-start text-left">
                                <div class="w-12 h-12 rounded-lg bg-gray-800/80 border border-gray-700 flex items-center justify-center mb-4 group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-colors">
                                    <i class="\${skill.icon} text-xl text-green-400"></i>
                                </div>
                                <h3 class="text-base font-bold text-gray-100 mb-2">\${skill.name}</h3>
                                <p class="text-sm text-gray-400 leading-relaxed">\${skill.desc}</p>
                            </div>
                        \`;
                    }).join('');
                    
                    container.innerHTML = cardsHTML;
                }
            } catch (error) {
                console.error("Gagal memuat data API:", error);
                container.innerHTML = '<div class="col-span-full p-6 bg-red-900/20 border border-red-500/30 rounded-xl text-center"><p class="text-red-400 font-medium">Wah, sepertinya koneksi internet sedang gangguan. Gagal memuat daftar fitur kami.</p></div>';
            }
        });
    </script>
    
    <!-- Script Canvas Efek Bintik Menyala -->
    <script>
        const canvas = document.getElementById('particles-bg');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 75; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    alpha: Math.random() * 0.5 + 0.3
                });
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, " + p.alpha + ")";
                ctx.shadowBlur = 8;
                ctx.shadowColor = "white";
                ctx.fill();
            });
            requestAnimationFrame(animateCanvas);
        }

        window.addEventListener('resize', initCanvas);
        initCanvas();
        animateCanvas();
    </script>
</body>
</html>
    `;
    res.send(landingHTML);
});

// ==========================================
// 3.1 PRIVACY POLICY ROUTING (Kebijakan Privasi)
// ==========================================
app.get('/privacy.html', (req, res) => {
    const privacyHTML = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kebijakan Privasi - Zea Technology</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #d1d5db; background-color: #030712; max-width: 800px; margin-left: auto; margin-right: auto; }
        h1, h2 { color: #fff; }
        h1 { margin-bottom: 5px; }
        p.date { font-size: 0.85em; color: #9ca3af; margin-bottom: 30px; }
        a { color: #22c55e; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ul { margin-bottom: 20px; }
        li { margin-bottom: 10px; }
        footer { margin-top: 40px; font-size: 0.9em; color: #6b7280; border-top: 1px solid #1f2937; padding-top: 20px; text-align: center; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #22c55e; font-weight: bold; text-decoration: none; border: 1px solid #22c55e; padding: 5px 15px; border-radius: 5px; }
        .back-link:hover { background-color: rgba(34, 197, 94, 0.1); text-decoration: none; }
    </style>
</head>
<body>

    <a href="/" class="back-link">&larr; Kembali ke Beranda</a>

    <h1>Kebijakan Privasi (Aturan Kerahasiaan Data)</h1>
    <p class="date">Terakhir diperbarui: 29 September 2026</p>

    <p><strong>Zea Technology</strong> berkomitmen penuh untuk melindungi kerahasiaan data pengguna dan pelanggan kami. Catatan ini menjelaskan secara sederhana bagaimana kami menyimpan dan menjaga keamanan data Anda saat menggunakan asisten balas pesan otomatis kami.</p>

    <h2>1. Data Apa Saja yang Kami Simpan?</h2>
    <p>Agar asisten pintar ini bisa bekerja membalas pesan, kami hanya membaca dan mencatat hal-hal penting berikut:</p>
    <ul>
        <li><strong>Nomor HP:</strong> Nomor WhatsApp pembeli/pelanggan Anda.</li>
        <li><strong>Isi Pesan:</strong> Pesan yang dikirim pembeli (seperti tanya harga atau stok) agar asisten pintar kami bisa membacanya dan memberikan balasan yang pas.</li>
    </ul>

    <h2>2. Untuk Apa Data Itu Dipakai?</h2>
    <p>Data yang dicatat di atas semata-mata dipakai HANYA untuk kebutuhan jualan Anda, yaitu:</p>
    <ul>
        <li>Agar sistem kami bisa membalas pertanyaan pelanggan Anda secara otomatis soal produk dan harga.</li>
        <li>Membuat asisten otomatis kami semakin pintar dalam melayani toko Anda.</li>
        <li>Memastikan keamanan aplikasi dan mencegah pihak nakal meretas toko Anda.</li>
    </ul>

    <h2>3. Keamanan Data Anda</h2>
    <p>Kami menggunakan sistem keamanan yang berlapis dan sangat kuat untuk mengunci rapat data Anda. Kami <strong>TIDAK AKAN PERNAH</strong> menjual, menyewakan, atau memberikan data pembeli maupun riwayat chat Anda kepada pihak ketiga untuk alasan apapun.</p>

    <h2>4. Berbagi Data dengan Pihak Luar</h2>
    <p>Kami hanya menghubungkan data ke layanan resmi yang Anda gunakan (seperti sistem pesan resmi dari WhatsApp/Meta) agar obrolan bisa terkirim. Selain itu, data Anda 100% aman bersama kami.</p>

    <h2>5. Hak Anda Sebagai Pemilik Toko</h2>
    <p>Anda punya hak penuh untuk meminta kami menghapus seluruh riwayat chat kapan saja, atau mematikan sistem asisten otomatis ini jika sudah tidak diperlukan. Tinggal hubungi kami, dan kami akan langsung membereskannya.</p>

    <h2>6. Butuh Bantuan atau Ada Pertanyaan?</h2>
    <p>Kalau ada yang masih membingungkan soal aturan ini, jangan ragu hubungi kami di:</p>
    <ul>
        <li><strong>Perusahaan:</strong> Zea Technology </li>
        <li><strong>Website:</strong> <a href="https://zeateknologiindonesia.web.id">https://zeateknologiindonesia.web.id</a></li>
        <li><strong>Email:</strong> admin@zeateknologiindonesia.web.id</li>
    </ul>

    <footer>
        <p>&copy; 2026 Zea Technology. Hak Cipta Dilindungi.</p>
    </footer>

</body>
</html>
    `;
    res.send(privacyHTML);
});

app.use('/api', (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Halaman tujuan tidak ditemukan"
    });
});

// ==========================================
// 4. SERVER INITIALIZATION & GRACEFUL SHUTDOWN (Nyalakan Aplikasi)
// ==========================================
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`[SISTEM] Aplikasi Zea Intelligent sukses menyala dan siap digunakan di port ${PORT}`);
});

const gracefulShutdown = (signal) => {
    console.log(`\n[SISTEM] Ada perintah ${signal}. Sedang mematikan aplikasi dengan aman...`);
    
    server.close(() => {
        console.log('[SISTEM] Semua jalur obrolan sudah ditutup dengan rapi. Aplikasi berhenti.');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('[SISTEM] Waktu tunggu habis. Mematikan paksa aplikasi.');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
