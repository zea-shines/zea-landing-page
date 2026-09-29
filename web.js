require('dotenv').config();
const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const app = express();

// ==========================================
// 1. SECURITY & MIDDLEWARE
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
// 2. REST API ENDPOINTS
// ==========================================

// Endpoint Konfigurasi Dinamis
app.get('/api/config', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            waNumber: process.env.WA_NUMBER || "6285647335105" 
        }
    });
});

app.get('/api/skills', (req, res) => {
    const skills = [
        { 
            id: 1, 
            name: "Layanan Skalabel", 
            icon: "fa-brands fa-node-js", 
            desc: "Pengembangan server yang siap menangani ribuan permintaan simultan." 
        },
        { 
            id: 2, 
            name: "Layanan Pelanggan Otomatis (AI Intelligent )", 
            icon: "fa-solid fa-brain", 
            desc: "Integrasi model AI pemroses bahasa alami untuk menjawab pertanyaan pelanggan secara cerdas, kontekstual." 
        },
        { 
            id: 3, 
            name: "WhatsApp Business API Resmi & Broadcast", 
            icon: "fa-brands fa-whatsapp", 
            desc: "Penanganan pesan masuk/keluar berskala besar, sistem antrean terstruktur, dan penyiaran pesan promosi berbasis Cloud API Meta." 
        },
        { 
            id: 4, 
            name: "API & Layanan mikro", 
            icon: "fa-solid fa-network-wired", 
            desc: "Perancangan RESTful API yang termodularisasi untuk integrasi antar-sistem yang aman dan stabil." 
        },
        { 
            id: 5, 
            name: "Database Engineering", 
            icon: "fa-solid fa-database", 
            desc: "Pengelolaan basis data yang tersinkronisasi secara waktu nyata" 
        },
        { 
            id: 6, 
            name: "Dashboard Intervensi Manual, Analitik", 
            icon: "fa-solid fa-headset", 
            desc: "Panel kontrol terpadu untuk tim layanan pelanggan (Customer Support) dalam mengambil alih percakapan secara manual kapan saja." 
        },
        { 
            id: 7, 
            name: "Proteksi Data & Keamanan", 
            icon: "fa-solid fa-shield-halved", 
            desc: "autentikasi JWT, enkripsi, proteksi sanitasi input, serta pencegahan manipulasi instruksi sistem." 
        },
        { 
            id: 8, 
            name: "Infrastruktur & Cloud deployment", 
            icon: "fa-solid fa-bolt", 
            desc: "Sistem komunikasi via WebSocket dan skalabilitas cloud."
        }
    ];
    
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({
        status: "success",
        message: "Data keahlian berhasil diambil",
        data: skills
    });
});

// ==========================================
// 3. LANDING PAGE RENDERING (TEMPORARY HTML INCLUSION)
// ==========================================
app.get('/', (req, res) => {
    const landingHTML = `
<!DOCTYPE html>
<html lang="id" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>lntelligent zea— Komunikasi & layanan pelanggan</title>
    <meta name="title" content="Intelligence zea — Komunikasi & layanan pelanggan">
    <meta name="description" content="Penyedia otomasi layanan pelanggan berbasis AI, dengean WhatsApp Business API untuk transformasi digital bisnis anda.">

    <!-- Open Graph / WhatsApp / LinkedIn -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://zeateknologiindonesia.web.id/">
    <meta property="og:title" content="Intelligent zea— Solusi otomatisasi Komunikasi & Sistem layanan">
    <meta property="og:description" content="Layanan arsitektur backend, otomatisasi operasional, dan integrasi sistem berkinerja tinggi.">
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
            <a href="#solutions" class="hover:text-green-400 transition">Solusi Bisnis</a>
            <a href="#expertise" class="hover:text-green-400 transition">Keahlian Teknis</a>
            <a href="#contact" class="hover:text-green-400 transition">Konsultasi</a>
        </div>
    </header>
    
    <main class="text-center px-6 max-w-4xl z-10 pt-16 md:pt-24 flex-grow flex flex-col justify-center items-center">
        <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs md:text-sm font-semibold mb-8 shadow-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Operational automation & 24/7 Customer Service</span>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Tingkatkan Efisiensi Bisnis dengan <span class="bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent">WhatsApp API yang terintegrasi AI cerdas </span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            Kami membangun komunikasi cerdas, dan sistem layanan pelanggan yang siap memangkas operasional bisnis anda hingga 80%, dan meningkatkan konversi penjualan, 
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a id="wa-btn" href="#" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-8 py-4 text-base rounded-xl bg-green-500 hover:bg-green-400 text-gray-950 font-bold transition shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transform hover:-translate-y-1 duration-200">
                <i class="fa-brands fa-whatsapp text-xl mr-2"></i>
                Let's discuss 
            </a>
            <a href="#expertise" class="inline-flex items-center justify-center px-8 py-4 text-base rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white font-semibold transition duration-200">
                Eksplorasi Fitur Sistem
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
                <h3 class="text-xl font-bold text-white mb-3">Layanan Tanpa Henti</h3>
                <p class="text-sm text-gray-400 leading-relaxed">
                    Merespon pertanyaan harga, ketersediaan produk dari database langsung, selama  24 jam.
                </p>
            </div>
            
            <div class="p-8 rounded-2xl glass-card text-left">
                <div class="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 text-green-400 text-2xl">
                    <i class="fa-solid fa-database"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Sinkronisasi Inventaris</h3>
                <p class="text-sm text-gray-400 leading-relaxed">
                    AI terhubung langsung dengan database anda untuk memastikan stok, harga dan keterangan produk selalu akurat dalam waktu nyata.
                </p>
            </div>

            <div class="p-8 rounded-2xl glass-card text-left">
                <div class="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 text-green-400 text-2xl">
                    <i class="fa-solid fa-user-shield"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Dashboard Multi-Admin (1 nomor untuk beberapa admin)</h3>
                <p class="text-sm text-gray-400 leading-relaxed">
                    Dashboard interaktif memfasilitasi tim sales (Costumer Support) untuk mengambil alih kendali percakapan kapan pun dibutuhkan.
                </p>
            </div>
        </div>
    </section>

    <!-- SECTION KEAHLIAN TEKNIS -->
    <section id="expertise" class="w-full max-w-6xl px-6 z-10 mt-32">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Arsitektur & Layanan</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Pendekatan komprehensif dalam merancang infrastruktur digital yang handal, aman, dan berkinerja tinggi.</p>
        </div>
        
        <div id="skills-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="p-6 rounded-2xl glass-card h-36 skeleton"></div>
            <div class="p-6 rounded-2xl glass-card h-36 skeleton"></div>
            <div class="p-6 rounded-2xl glass-card h-36 skeleton"></div>
            <div class="p-6 rounded-2xl glass-card h-36 skeleton"></div>
        </div>
    </section>
    
    <footer id="contact" class="mt-32 border-t border-gray-800/60 pt-8 pb-4 text-sm text-gray-500 w-full text-center z-10">
        &copy; <span id="current-year"></span> Zea Technology Indonesia. All rights reserved.
    </footer>

    <script>
        document.getElementById('current-year').textContent = new Date().getFullYear();

        document.addEventListener('DOMContentLoaded', async () => {
            const container = document.getElementById('skills-container');
            const waBtn = document.getElementById('wa-btn');
            const waMessage = encodeURIComponent("Halo Zea, saya ingin mendiskusikan untuk bisnis saya.");
            
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
                container.innerHTML = '<div class="col-span-full p-6 bg-red-900/20 border border-red-500/30 rounded-xl text-center"><p class="text-red-400 font-medium">Gagal memuat data arsitektur sistem. Harap periksa jaringan server.</p></div>';
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

app.use('/api', (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint tidak ditemukan"
    });
});

// ==========================================
// 4. SERVER INITIALIZATION & GRACEFUL SHUTDOWN
// ==========================================
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`[SYSTEM] Zea Intelligent berjalan di port ${PORT}`);
});

const gracefulShutdown = (signal) => {
    console.log(`\n[SYSTEM] Menerima sinyal ${signal}. Memulai proses Graceful Shutdown...`);
    
    server.close(() => {
        console.log('[SYSTEM] Semua koneksi HTTP telah diselesaikan. Server berhasil ditutup.');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('[SYSTEM] Peringatan: Graceful shutdown timeout. Memaksa penghentian proses.');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
