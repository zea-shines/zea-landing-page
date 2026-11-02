require('dotenv').config();
const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const app = express();

// ==========================================
// 1. Security & middleware
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
// 2. REST API endpoints
// ==========================================

app.get('/api/config', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            waNumber: process.env.WA_NUMBER || "6285771001231" 
        }
    });
});

app.get('/api/skills', (req, res) => {
    const skills = [
        { id: 1, name: "Siap hadapi ribuan chat", icon: "fa-solid fa-server", desc: "Sistem yang kuat, tidak akan lemot meskipun pelanggan membludak." },
        { id: 2, name: "Balasan cerdas (AI)", icon: "fa-solid fa-brain", desc: "Zea CS mengerti maksud pertanyaan klien dan menjawabnya secara natural." },
        { id: 3, name: "WhatsApp resmi & broadcast", icon: "fa-brands fa-whatsapp", desc: "Terhubung dengan API resmi WhatsApp untuk pengiriman pesan massal yang aman." },
        { id: 4, name: "Integrasi mudah", icon: "fa-solid fa-plug", desc: "Bisa dihubungkan dengan sistem CRM atau website bisnis anda." },
        { id: 5, name: "Penyimpanan data aman", icon: "fa-solid fa-database", desc: "Riwayat chat dan data klien tersimpan rapi dan aman." },
        { id: 6, name: "Dashboard admin", icon: "fa-solid fa-headset", desc: "Pantau chat dan ambil alih percakapan kapan saja." },
        { id: 7, name: "Keamanan terjamin", icon: "fa-solid fa-shield-halved", desc: "Data pelanggan anda dilindungi dari akses yang tidak sah." },
        { id: 8, name: "Server anti down", icon: "fa-solid fa-bolt", desc: "Sistem berjalan 24 jam non-stop memantau bisnis anda." }
    ];
    
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({ status: "success", message: "Data keahlian berhasil diambil", data: skills });
});

// ==========================================
// 3. Landing page rendering
// ==========================================
app.get('/', (req, res) => {
    const landingHTML = `
<!DOCTYPE html>
<html lang="id" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zea CS — Asisten WhatsApp otomatis untuk berbagai bisnis</title>
    <meta name="description" content="Jangan biarkan klien lari ke kompetitor karena telat dibalas. Otomatiskan WhatsApp bisnis anda dengan Zea CS 24 jam.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://zeacs.web.id/">
    <meta property="og:title" content="Zea CS — Asisten WhatsApp otomatis untuk berbagai bisnis">
    <meta property="og:description" content="Tingkatkan pelayanan bisnis anda dengan otomatisasi WhatsApp dan AI.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #030712; background-image: radial-gradient(rgba(245,158,11,.12) 1px, transparent 1px); background-size: 38px 38px; }
        .glass { background: rgba(17,24,39,.72); border: 1px solid rgba(148,163,184,.12); backdrop-filter: blur(14px); }
        .glow { box-shadow: 0 0 70px rgba(245,158,11,.10); }
        .step-line { background: linear-gradient(90deg, rgba(245,158,11,.5), rgba(245,158,11,.05)); }
        @keyframes float-white-glow { 0% { transform: translate(0, 0) scale(1); opacity: 0.8; } 33% { transform: translate(10vw, -10vh) scale(1.2); opacity: 0.5; } 66% { transform: translate(-5vw, 15vh) scale(0.9); opacity: 0.7; } 100% { transform: translate(0, 0) scale(1); opacity: 0.8; } }
        .white-glow-element { animation: float-white-glow 15s infinite ease-in-out; }
    </style>
</head>
<body class="text-gray-100 antialiased min-h-screen overflow-x-hidden">
    <!-- Background & particles -->
    <div class="fixed inset-0 pointer-events-none -z-10">
        <canvas id="particleCanvas" class="absolute inset-0 w-full h-full"></canvas>
        <div class="absolute top-1/3 left-1/3 w-96 h-96 bg-white/10 blur-[120px] rounded-full white-glow-element"></div>
        <div class="absolute top-0 left-0 w-96 h-96 bg-amber-900/20 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/10 blur-[120px] rounded-full"></div>
    </div>

    <!-- Header -->
    <header class="w-full max-w-6xl mx-auto px-5 sm:px-6 py-5 flex items-center justify-between">
        <a href="#top" class="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
            <span class="text-amber-500">ZEA</span><span>CS</span> 
            <span class="text-xs font-medium text-gray-400 hidden sm:inline-block">Asisten bisnis 24/7</span>
        </a>
        <nav class="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <a href="#masalah" class="hover:text-amber-500 transition">Tantangan</a>
            <a href="#solusi" class="hover:text-amber-500 transition">Solusi</a>
            <a href="#cara-kerja" class="hover:text-amber-500 transition">Cara kerja</a>
            <a href="#contact" class="hover:text-amber-500 transition">Kontak</a>
        </nav>
    </header>

    <main id="top">
        <!-- Hero -->
        <section class="max-w-5xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24 pb-20 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs sm:text-sm font-semibold mb-7">
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Modern customer service solutions
            </div>
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl mx-auto">
                Jangan biarkan klien lari <span class="text-amber-500">hanya karena telat balas chat.</span>
            </h1>
            <p class="mt-6 text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                Biarkan <strong>Zea CS</strong> yang menjawab pertanyaan klien, info layanan, harga, hingga jadwal secara otomatis 24 jam. Anda fokus kembangkan bisnis, urusan balas chat serahkan pada kami.
            </p>
            <div class="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                <a id="wa-btn" href="#" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition shadow-lg shadow-amber-900/20">
                    <i class="fa-brands fa-whatsapp text-xl"></i> Konsultasi gratis sekarang
                </a>
                <a href="#cara-kerja" class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gray-800/70 hover:bg-gray-800 border border-gray-700 text-white font-semibold transition">
                    Lihat cara kerjanya <i class="fa-solid fa-arrow-down text-sm"></i>
                </a>
            </div>

            <!-- Chat example (dibuat netral untuk jasa/produk) -->
            <div class="mt-12 glass glow rounded-2xl p-5 sm:p-7 max-w-3xl mx-auto text-left">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500"><i class="fa-brands fa-whatsapp"></i></div>
                    <div>
                        <p class="font-bold text-white text-sm">Contoh percakapan</p>
                        <p class="text-xs text-gray-500">Zea CS balas chat simpel, dan manusiawi</p>
                    </div>
                </div>
                <div class="space-y-3 text-sm">
                    <div class="ml-auto max-w-[85%]">
                        <p class="text-[10px] uppercase tracking-wider text-gray-500 mb-1 text-right">Pelanggan</p>
                        <div class="rounded-2xl rounded-tr-md bg-amber-500/10 border border-amber-500/10 p-3 text-gray-200">
                            Produk ready?
                        </div>
                    </div>
                    <div class="max-w-[85%]">
                        <p class="text-[10px] uppercase tracking-wider text-amber-500 mb-1">Zea CS</p>
                        <div class="rounded-2xl rounded-tl-md bg-gray-800 p-3 text-gray-200">
                            Ready kak, mau yang mana?
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Masalah -->
        <section id="masalah" class="max-w-6xl mx-auto px-5 sm:px-6 py-16">
            <div class="max-w-2xl mb-10">
                <p class="text-amber-500 font-semibold text-sm mb-2">Pernah mengalami ini?</p>
                <h2 class="text-3xl sm:text-4xl font-bold text-white">Ribetnya ngurus chat sendiri</h2>
                <p class="mt-4 text-gray-400 leading-relaxed">Tanpa disadari, lambat membalas chat pelanggan adalah salah satu penyebab utama potensi pendapatan bisnis anda hilang.</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="glass rounded-2xl p-6"><div class="text-2xl mb-4">📉</div><h3 class="font-bold text-white">Klien kabur</h3><p class="text-sm text-gray-400 mt-2">Chat menumpuk, telat dibalas, calon klien batal deal dan pindah ke kompetitor.</p></div>
                <div class="glass rounded-2xl p-6"><div class="text-2xl mb-4">😩</div><h3 class="font-bold text-white">Admin kewalahan</h3><p class="text-sm text-gray-400 mt-2">Waktu terbuang habis hanya untuk menjawab "Ini harganya berapa?" berulang kali.</p></div>
                <div class="glass rounded-2xl p-6"><div class="text-2xl mb-4">🌙</div><h3 class="font-bold text-white">Pertanyaan terlewat</h3><p class="text-sm text-gray-400 mt-2">Saat anda istirahat atau rapat, pelanggan yang chat jadi tidak terurus.</p></div>
                <div class="glass rounded-2xl p-6"><div class="text-2xl mb-4">😵‍💫</div><h3 class="font-bold text-white">Repot bagi tugas</h3><p class="text-sm text-gray-400 mt-2">Punya banyak tim, tapi chat malah tumpang tindih dan tidak teratur.</p></div>
            </div>
        </section>

        <!-- Solusi -->
        <section id="solusi" class="max-w-6xl mx-auto px-5 sm:px-6 py-16">
            <div class="text-center max-w-2xl mx-auto mb-12">
                <p class="text-amber-500 font-semibold text-sm mb-2">Solusi untuk bisnis anda</p>
                <h2 class="text-3xl sm:text-4xl font-bold text-white">Zea CS siap bantu anda</h2>
                <p class="mt-4 text-gray-400">Bukan sekadar robot, Zea CS adalah asisten digital profesional yang mengerti kebutuhan bisnis anda.</p>
            </div>
            <div class="grid md:grid-cols-2 gap-5">
                <div class="glass rounded-2xl p-7 flex gap-5">
                    <div class="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl"><i class="fa-solid fa-bolt"></i></div>
                    <div><h3 class="font-bold text-white text-lg">Balas kilat 24/7</h3><p class="text-sm text-gray-400 mt-2 leading-relaxed">Zea CS siap sedia siang-malam menjawab pertanyaan dasar pelanggan tanpa pernah lelah.</p></div>
                </div>
                <div class="glass rounded-2xl p-7 flex gap-5">
                    <div class="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl"><i class="fa-solid fa-briefcase"></i></div>
                    <div><h3 class="font-bold text-white text-lg">Paham layanan anda</h3><p class="text-sm text-gray-400 mt-2 leading-relaxed">Zea CS otomatis tahu detail produk, paket harga, dan FAQ bisnis anda. Klien dapat jawaban akurat.</p></div>
                </div>
                <div class="glass rounded-2xl p-7 flex gap-5">
                    <div class="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl"><i class="fa-solid fa-users"></i></div>
                    <div><h3 class="font-bold text-white text-lg">Satu nomor, banyak tim</h3><p class="text-sm text-gray-400 mt-2 leading-relaxed">Jika klien butuh bantuan manusia, tim anda bisa mengambil alih percakapan dengan rapi dari dashboard.</p></div>
                </div>
                <div class="glass rounded-2xl p-7 flex gap-5">
                    <div class="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl"><i class="fa-solid fa-bed"></i></div>
                    <div><h3 class="font-bold text-white text-lg">Anda bisa istirahat</h3><p class="text-sm text-gray-400 mt-2 leading-relaxed">Bisnis tetap melayani dan mencatat prospek masuk meskipun anda sedang tidur atau liburan.</p></div>
                </div>
            </div>
        </section>

        <!-- Cara kerja -->
        <section id="cara-kerja" class="max-w-5xl mx-auto px-5 sm:px-6 py-16">
            <div class="text-center max-w-2xl mx-auto mb-12">
                <p class="text-amber-500 font-semibold text-sm mb-2">Sangat mudah</p>
                <h2 class="text-3xl sm:text-4xl font-bold text-white">Bagaimana Zea CS bekerja?</h2>
                <p class="mt-4 text-gray-400">Pelanggan merasa seperti chat dengan admin asli, padahal itu Zea CS yang bekerja untuk anda.</p>
            </div>
            <div class="grid sm:grid-cols-4 gap-4">
                <div class="glass rounded-2xl p-6 text-center"><div class="w-11 h-11 mx-auto rounded-full bg-amber-600 text-white flex items-center justify-center font-extrabold">1</div><h3 class="font-bold mt-4">Klien chat</h3><p class="text-sm text-gray-400 mt-2">Pelanggan kirim pesan ke WhatsApp bisnis seperti biasa.</p></div>
                <div class="glass rounded-2xl p-6 text-center"><div class="w-11 h-11 mx-auto rounded-full bg-amber-600 text-white flex items-center justify-center font-extrabold">2</div><h3 class="font-bold mt-4">Zea CS paham</h3><p class="text-sm text-gray-400 mt-2">AI cerdas memahami maksud pertanyaan calon klien anda.</p></div>
                <div class="glass rounded-2xl p-6 text-center"><div class="w-11 h-11 mx-auto rounded-full bg-amber-600 text-white flex items-center justify-center font-extrabold">3</div><h3 class="font-bold mt-4">Cek data otomatis</h3><p class="text-sm text-gray-400 mt-2">Mencari info harga & layanan dari basis data bisnis anda.</p></div>
                <div class="glass rounded-2xl p-6 text-center"><div class="w-11 h-11 mx-auto rounded-full bg-amber-600 text-white flex items-center justify-center font-extrabold">4</div><h3 class="font-bold mt-4">Klien puas</h3><p class="text-sm text-gray-400 mt-2">Dibalas cepat. Jika rumit, otomatis diteruskan ke tim admin.</p></div>
            </div>
        </section>

        <!-- CTA -->
        <section class="max-w-4xl mx-auto px-5 sm:px-6 py-16">
            <div class="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 sm:p-12 text-center">
                <p class="text-amber-500 font-semibold text-sm mb-3">Waktunya upgrade layanan anda</p>
                <h2 class="text-3xl sm:text-4xl font-bold text-white">Cocok untuk retail, jasa, klinik, agensi, edukasi, & profesional.</h2>
                <p class="mt-4 text-gray-400">Mulai dari kebutuhan sederhana. Biarkan sistem yang bekerja, dan lihat bisnis anda berkembang pesat.</p>
                <a id="wa-btn-bottom" href="#" target="_blank" rel="noopener noreferrer" class="mt-7 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition">
                    <i class="fa-brands fa-whatsapp text-xl"></i> Mulai konsultasi gratis
                </a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer id="contact" class="border-t border-gray-800/60 mt-10">
        <div class="max-w-6xl mx-auto px-5 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <span>&copy; <span id="current-year"></span> Zea CS. All rights reserved.</span>
            <a href="/privacy.html" class="hover:text-amber-500 transition underline">Kebijakan privasi</a>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        document.getElementById('current-year').textContent = new Date().getFullYear();
        document.addEventListener('DOMContentLoaded', async () => {
            const waMessage = encodeURIComponent('Halo, saya ingin konsultasi untuk otomatisasi WhatsApp bisnis saya.');
            try {
                const configRes = await fetch('/api/config');
                if (!configRes.ok) throw new Error('Gagal mengambil konfigurasi WhatsApp');
                const configData = await configRes.json();
                const waUrl = 'https://wa.me/' + configData.data.waNumber + '?text=' + waMessage;
                document.getElementById('wa-btn').href = waUrl;
                document.getElementById('wa-btn-bottom').href = waUrl;
            } catch (error) {
                console.error('Gagal memuat konfigurasi WhatsApp:', error);
                const fallbackUrl = 'https://wa.me/6285647335105?text=' + waMessage;
                document.getElementById('wa-btn').href = fallbackUrl;
                document.getElementById('wa-btn-bottom').href = fallbackUrl;
            }
        });

        // Background particle script
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        let pWidth, pHeight;
        let particles = [];
        function initParticles() {
            pWidth = canvas.width = window.innerWidth;
            pHeight = canvas.height = window.innerHeight;
            particles = [];
            for(let i=0; i<150; i++) {
                particles.push({
                    x: Math.random() * pWidth,
                    y: Math.random() * pHeight,
                    r: Math.random() * 2 + 0.5,
                    dx: (Math.random() - 0.5) * 0.6,
                    dy: (Math.random() - 0.5) * 0.6,
                    opacity: Math.random() * 0.8 + 0.2
                });
            }
        }
        function drawParticles() {
            ctx.clearRect(0, 0, pWidth, pHeight);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')';
                ctx.shadowBlur = 12;
                ctx.shadowColor = 'white';
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if(p.x < 0 || p.x > pWidth) p.dx *= -1;
                if(p.y < 0 || p.y > pHeight) p.dy *= -1;
            });
            requestAnimationFrame(drawParticles);
        }
        initParticles();
        drawParticles();
        window.addEventListener('resize', initParticles);
    </script>
</body>
</html>
    `;
    res.send(landingHTML);
});

// ==========================================
// 3.1 Privacy policy routing
// ==========================================
app.get('/privacy.html', (req, res) => {
    const privacyHTML = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kebijakan privasi - Zea CS</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #d1d5db; background-color: #030712; max-width: 800px; margin-left: auto; margin-right: auto; }
        h1, h2 { color: #fff; } h1 { margin-bottom: 5px; }
        p.date { font-size: 0.85em; color: #9ca3af; margin-bottom: 30px; }
        a { color: #f59e0b; text-decoration: none; } a:hover { text-decoration: underline; }
        ul { margin-bottom: 20px; } li { margin-bottom: 10px; }
        footer { margin-top: 40px; font-size: 0.9em; color: #6b7280; border-top: 1px solid #1f2937; padding-top: 20px; text-align: center; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #f59e0b; font-weight: bold; text-decoration: none; border: 1px solid #f59e0b; padding: 5px 15px; border-radius: 5px; }
        .back-link:hover { background-color: rgba(245, 158, 11, 0.1); text-decoration: none; }
    </style>
</head>
<body>
    <a href="/" class="back-link">&larr; Kembali ke beranda</a>
    <h1>Kebijakan privasi (privacy policy)</h1>
    <p class="date">Terakhir diperbarui: 22 februari 2026</p>
    <p><strong>Zea CS</strong> ("kami") berkomitmen untuk melindungi dan menghormati privasi pengguna dan pelanggan kami. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi yang diperoleh melalui layanan otomatisasi pesan WhatsApp dan platform AI customer service kami.</p>
    
    <h2>1. Informasi yang kami kumpulkan</h2>
    <p>Dalam menjalankan layanan otomatisasi, kami mengumpulkan dan memproses informasi terbatas, antara lain:</p>
    <ul>
        <li><strong>Data kontak:</strong> Nomor telepon WhatsApp pengguna/pelanggan.</li>
        <li><strong>Pesan komunikasi:</strong> Teks pesan masuk yang dikirimkan oleh pelanggan untuk keperluan pemrosesan jawaban otomatis oleh sistem AI kami.</li>
    </ul>
    
    <h2>2. Penggunaan informasi</h2>
    <p>Informasi yang kami kumpulkan hanya digunakan untuk tujuan berikut:</p>
    <ul>
        <li>Merespons pertanyaan pelanggan secara otomatis terkait informasi produk, harga, dan ketersediaan layanan atas nama klien kami.</li>
        <li>Meningkatkan kualitas respons asisten virtual dan efisiensi layanan pelanggan.</li>
        <li>Memastikan keamanan dan mencegah aktivitas yang tidak sah pada sistem kami.</li>
    </ul>
    
    <h2>3. Perlindungan dan keamanan data</h2>
    <p>Kami menerapkan langkah-langkah teknis dan organisasional yang ketat untuk melindungi data dari akses, pengungkapan, atau perubahan yang tidak sah. Data pesan diproses menggunakan enkripsi dan tidak dijual atau disewakan kepada pihak ketiga mana pun untuk tujuan pemasaran.</p>
    
    <h2>4. Pembagian data pihak ketiga</h2>
    <p>Kami tidak membagikan informasi pribadi anda kepada pihak luar, kecuali diperlukan untuk memproses layanan (seperti penyedia API pesan resmi dari Meta) atau jika diwajibkan oleh hukum yang berlaku.</p>
    
    <h2>5. Hak pengguna</h2>
    <p>Pengguna berhak meminta penghapusan riwayat chat atau meminta agar sistem otomatisasi dihentikan saat berinteraksi dengan nomor bisnis kami. Anda dapat menghubungi kami melalui kontak resmi di bawah ini.</p>
    
    <h2>6. Kontak kami</h2>
    <p>Jika anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:</p>
    <ul>
        <li><strong>Perusahaan:</strong> Zea CS</li> 
        <li><strong>Email:</strong> admin@zeacs.web.id</li>
    </ul>
    <footer><p>&copy; 2026 Zea CS. All rights reserved.</p></footer>
</body>
</html>
    `;
    res.send(privacyHTML);
});

// ==========================================
// API 404 handler
// ==========================================
app.use('/api', (req, res) => {
    res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan" });
});

// ==========================================
// 4. Server initialization
// ==========================================
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`[Sistem] Zea CS berjalan di port ${PORT}`);
});

// ==========================================
// Graceful shutdown
// ==========================================
const gracefulShutdown = (signal) => {
    console.log(`\n[Sistem] Menerima sinyal ${signal}. Memulai proses graceful shutdown...`);
    server.close(() => {
        console.log('[Sistem] Semua koneksi HTTP telah diselesaikan. Server berhasil ditutup.');
        process.exit(0);
    });
    setTimeout(() => {
        console.error('[Sistem] Peringatan: graceful shutdown timeout. Memaksa penghentian proses.');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
