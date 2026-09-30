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
// 3. LANDING PAGE RENDERING
// ==========================================
app.get('/', (req, res) => {
    const landingHTML = `
<!DOCTYPE html>
<html lang="id" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Zea Technology — WhatsApp Otomatis untuk UMKM</title>

    <meta 
        name="description" 
        content="Bantu bisnis membalas chat pelanggan, memberikan informasi produk, harga, dan stok melalui WhatsApp secara otomatis."
    >

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://zeateknologiindonesia.web.id/">
    <meta property="og:title" content="Zea Technology — WhatsApp Otomatis untuk UMKM">
    <meta property="og:description" content="Balas chat pelanggan lebih mudah dengan otomatisasi WhatsApp dan AI.">

    <script src="https://cdn.tailwindcss.com"></script>

    <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    >

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: #030712;
            background-image: radial-gradient(
                rgba(34,197,94,.12) 1px,
                transparent 1px
            );
            background-size: 38px 38px;
        }

        .glass {
            background: rgba(17,24,39,.72);
            border: 1px solid rgba(148,163,184,.12);
            backdrop-filter: blur(14px);
        }

        .glow {
            box-shadow: 0 0 70px rgba(34,197,94,.10);
        }

        .step-line {
            background: linear-gradient(
                90deg,
                rgba(34,197,94,.5),
                rgba(34,197,94,.05)
            );
        }
    </style>
</head>

<body class="text-gray-100 antialiased min-h-screen overflow-x-hidden">

    <!-- BACKGROUND -->
    <div class="fixed inset-0 pointer-events-none -z-10">

        <div class="
            absolute 
            top-0 
            left-0 
            w-96 
            h-96 
            bg-green-900/20 
            blur-[120px] 
            rounded-full
        "></div>

        <div class="
            absolute 
            bottom-0 
            right-0 
            w-96 
            h-96 
            bg-emerald-900/10 
            blur-[120px] 
            rounded-full
        "></div>

    </div>


    <!-- HEADER -->
    <header 
        class="
            w-full 
            max-w-6xl 
            mx-auto 
            px-5 
            sm:px-6 
            py-5 
            flex 
            items-center 
            justify-between
        "
    >

        <a 
            href="#top" 
            class="
                font-extrabold 
                text-xl 
                tracking-tight 
                text-white
            "
        >
            Z<span class="text-green-400">TI</span>

            <span 
                class="
                    text-xs 
                    font-medium 
                    text-gray-400
                "
            >
                Zea Technology
            </span>
        </a>


        <nav 
            class="
                hidden 
                sm:flex 
                items-center 
                gap-6 
                text-sm 
                text-gray-400
            "
        >

            <a 
                href="#masalah" 
                class="hover:text-green-400 transition"
            >
                Masalah
            </a>

            <a 
                href="#solusi" 
                class="hover:text-green-400 transition"
            >
                Solusi
            </a>

            <a 
                href="#cara-kerja" 
                class="hover:text-green-400 transition"
            >
                Cara Kerja
            </a>

            <a 
                href="#contact" 
                class="hover:text-green-400 transition"
            >
                Kontak
            </a>

        </nav>

    </header>


    <!-- MAIN -->
    <main id="top">


        <!-- HERO -->
        <section 
            class="
                max-w-5xl 
                mx-auto 
                px-5 
                sm:px-6 
                pt-16 
                sm:pt-24 
                pb-20 
                text-center
            "
        >

            <!-- LABEL -->
            <div 
                class="
                    inline-flex 
                    items-center 
                    gap-2 
                    px-4 
                    py-2 
                    rounded-full 
                    bg-green-500/10 
                    border 
                    border-green-500/20 
                    text-green-400 
                    text-xs 
                    sm:text-sm 
                    font-semibold 
                    mb-7
                "
            >

                <span 
                    class="
                        w-2 
                        h-2 
                        rounded-full 
                        bg-green-400 
                        animate-pulse
                    "
                ></span>

                Solusi whatsApp untuk bisnis 

            </div>


            <!-- TITLE -->
            <h1 
                class="
                    text-4xl 
                    sm:text-5xl 
                    md:text-6xl 
                    font-extrabold 
                    tracking-tight 
                    leading-tight 
                    text-white 
                    max-w-4xl 
                    mx-auto
                "
            >

                Balas Chat Pelanggan

                <span class="text-green-400">
                    Secara Otomatis
                </span>

                , 24 Jam.

            </h1>


            <!-- DESCRIPTION -->
            <p 
                class="
                    mt-6 
                    text-base 
                    sm:text-lg 
                    md:text-xl 
                    text-gray-400 
                    leading-relaxed 
                    max-w-2xl 
                    mx-auto
                "
            >

                Bantu pelanggan mendapatkan informasi produk, harga,
                dan stok melalui WhatsApp tanpa Anda harus membalas
                chat yang sama berulang kali.

            </p>


            <!-- BUTTON -->
            <div 
                class="
                    mt-9 
                    flex 
                    flex-col 
                    sm:flex-row 
                    gap-3 
                    justify-center
                "
            >

                <a 
                    id="wa-btn"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                        inline-flex 
                        items-center 
                        justify-center 
                        gap-2 
                        px-7 
                        py-4 
                        rounded-xl 
                        bg-green-500 
                        hover:bg-green-400 
                        text-gray-950 
                        font-bold 
                        transition 
                        shadow-lg 
                        shadow-green-900/20
                    "
                >

                    <i class="fa-brands fa-whatsapp text-xl"></i>

                    Konsultasi Gratis

                </a>


                <a 
                    href="#cara-kerja" 
                    class="
                        inline-flex 
                        items-center 
                        justify-center 
                        gap-2 
                        px-7 
                        py-4 
                        rounded-xl 
                        bg-gray-800/70 
                        hover:bg-gray-800 
                        border 
                        border-gray-700 
                        text-white 
                        font-semibold 
                        transition
                    "
                >

                    Lihat Cara Kerjanya

                    <i 
                        class="
                            fa-solid 
                            fa-arrow-down 
                            text-sm
                        "
                    ></i>

                </a>

            </div>


            <!-- CHAT EXAMPLE -->
            <div 
                class="
                    mt-12 
                    glass 
                    glow 
                    rounded-2xl 
                    p-5 
                    sm:p-7 
                    max-w-3xl 
                    mx-auto 
                    text-left
                "
            >

                <div 
                    class="
                        flex 
                        items-center 
                        gap-3 
                        mb-4
                    "
                >

                    <div 
                        class="
                            w-10 
                            h-10 
                            rounded-full 
                            bg-green-500/10 
                            flex 
                            items-center 
                            justify-center 
                            text-green-400
                        "
                    >

                        <i class="fa-brands fa-whatsapp"></i>

                    </div>


                    <div>

                        <p 
                            class="
                                font-bold 
                                text-white 
                                text-sm
                            "
                        >
                            Contoh percakapan
                        </p>

                        <p 
                            class="
                                text-xs 
                                text-gray-500
                            "
                        >
                            Pelanggan tidak perlu menunggu lama
                        </p>

                    </div>

                </div>


                <div class="space-y-3 text-sm">

                    <div 
                        class="
                            ml-auto 
                            max-w-[85%] 
                            rounded-2xl 
                            rounded-tr-md 
                            bg-green-500/10 
                            border 
                            border-green-500/10 
                            p-3 
                            text-gray-200
                        "
                    >
                        Kak, harga produk A berapa?
                        Masih ada stok?
                    </div>


                    <div 
                        class="
                            max-w-[85%] 
                            rounded-2xl 
                            rounded-tl-md 
                            bg-gray-800 
                            p-3 
                            text-gray-200
                        "
                    >
                        Halo kak, Produk A tersedia.
                        Harganya Rp150.000.
                        mau info lebih lanjut?
                    </div>

                </div>

            </div>

        </section>



        <!-- MASALAH -->
        <section 
            id="masalah" 
            class="
                max-w-6xl 
                mx-auto 
                px-5 
                sm:px-6 
                py-16
            "
        >

            <div class="max-w-2xl mb-10">

                <p 
                    class="
                        text-green-400 
                        font-semibold 
                        text-sm 
                        mb-2
                    "
                >
                    Mungkin Anda mengalami ini
                </p>


                <h2 
                    class="
                        text-3xl 
                        sm:text-4xl 
                        font-bold 
                        text-white
                    "
                >
                    Chat pelanggan makin banyak?
                </h2>


                <p 
                    class="
                        mt-4 
                        text-gray-400 
                        leading-relaxed
                    "
                >
                    Pertanyaan yang sama berulang kali bisa
                    menghabiskan waktu. Sistem otomatisasi membantu
                    menangani pertanyaan dasar agar Anda bisa fokus
                    menjalankan bisnis.
                </p>

            </div>


            <div 
                class="
                    grid 
                    md:grid-cols-2 
                    lg:grid-cols-4 
                    gap-4
                "
            >

                <div class="glass rounded-2xl p-6">

                    <div class="text-2xl mb-4">
                        💬
                    </div>

                    <h3 class="font-bold text-white">
                        Chat terlalu banyak
                    </h3>

                    <p 
                        class="
                            text-sm 
                            text-gray-400 
                            mt-2
                        "
                    >
                        Sulit membalas semua pelanggan tepat waktu.
                    </p>

                </div>


                <div class="glass rounded-2xl p-6">

                    <div class="text-2xl mb-4">
                        🔁
                    </div>

                    <h3 class="font-bold text-white">
                        Pertanyaan berulang
                    </h3>

                    <p 
                        class="
                            text-sm 
                            text-gray-400 
                            mt-2
                        "
                    >
                        Harga, stok, dan produk sering ditanyakan
                        lagi dan lagi.
                    </p>

                </div>


                <div class="glass rounded-2xl p-6">

                    <div class="text-2xl mb-4">
                        ⏰
                    </div>

                    <h3 class="font-bold text-white">
                        Tidak selalu online
                    </h3>

                    <p 
                        class="
                            text-sm 
                            text-gray-400 
                            mt-2
                        "
                    >
                        Pelanggan bisa bertanya saat Anda sedang sibuk.
                    </p>

                </div>


                <div class="glass rounded-2xl p-6">

                    <div class="text-2xl mb-4">
                        👥
                    </div>

                    <h3 class="font-bold text-white">
                        Banyak admin
                    </h3>

                    <p 
                        class="
                            text-sm 
                            text-gray-400 
                            mt-2
                        "
                    >
                        Tim membutuhkan cara yang lebih rapi
                        untuk menangani chat.
                    </p>

                </div>

            </div>

        </section>



        <!-- SOLUSI -->
        <section 
            id="solusi" 
            class="
                max-w-6xl 
                mx-auto 
                px-5 
                sm:px-6 
                py-16
            "
        >

            <div 
                class="
                    text-center 
                    max-w-2xl 
                    mx-auto 
                    mb-12
                "
            >

                <p 
                    class="
                        text-green-400 
                        font-semibold 
                        text-sm 
                        mb-2
                    "
                >
                    Solusi untuk bisnis Anda
                </p>


                <h2 
                    class="
                        text-3xl 
                        sm:text-4xl 
                        font-bold 
                        text-white
                    "
                >
                    Yang Anda dapatkan
                </h2>


                <p 
                    class="
                        mt-4 
                        text-gray-400
                    "
                >
                    Fitur dibuat untuk membantu pekerjaan sehari-hari,
                    bukan membuat Anda pusing dengan teknologi.
                </p>

            </div>


            <div 
                class="
                    grid 
                    md:grid-cols-2 
                    gap-5
                "
            >

                <!-- FEATURE 1 -->
                <div 
                    class="
                        glass 
                        rounded-2xl 
                        p-7 
                        flex 
                        gap-5
                    "
                >

                    <div 
                        class="
                            w-12 
                            h-12 
                            shrink-0 
                            rounded-xl 
                            bg-green-500/10 
                            text-green-400 
                            flex 
                            items-center 
                            justify-center 
                            text-xl
                        "
                    >

                        <i class="fa-solid fa-robot"></i>

                    </div>


                    <div>

                        <h3 
                            class="
                                font-bold 
                                text-white 
                                text-lg
                            "
                        >
                            Balas Chat Otomatis
                        </h3>

                        <p 
                            class="
                                text-sm 
                                text-gray-400 
                                mt-2 
                                leading-relaxed
                            "
                        >
                            Bantu menjawab pertanyaan pelanggan
                            tentang produk, harga, dan informasi dasar
                            secara otomatis.
                        </p>

                    </div>

                </div>


                <!-- FEATURE 2 -->
                <div 
                    class="
                        glass 
                        rounded-2xl 
                        p-7 
                        flex 
                        gap-5
                    "
                >

                    <div 
                        class="
                            w-12 
                            h-12 
                            shrink-0 
                            rounded-xl 
                            bg-green-500/10 
                            text-green-400 
                            flex 
                            items-center 
                            justify-center 
                            text-xl
                        "
                    >

                        <i class="fa-solid fa-box-open"></i>

                    </div>


                    <div>

                        <h3 
                            class="
                                font-bold 
                                text-white 
                                text-lg
                            "
                        >
                            Informasi Produk
                        </h3>

                        <p 
                            class="
                                text-sm 
                                text-gray-400 
                                mt-2 
                                leading-relaxed
                            "
                        >
                            Sistem dapat menggunakan data produk
                            agar jawaban tentang stok, harga, dan
                            keterangan lebih terarah.
                        </p>

                    </div>

                </div>


                <!-- FEATURE 3 -->
                <div 
                    class="
                        glass 
                        rounded-2xl 
                        p-7 
                        flex 
                        gap-5
                    "
                >

                    <div 
                        class="
                            w-12 
                            h-12 
                            shrink-0 
                            rounded-xl 
                            bg-green-500/10 
                            text-green-400 
                            flex 
                            items-center 
                            justify-center 
                            text-xl
                        "
                    >

                        <i class="fa-solid fa-users"></i>

                    </div>


                    <div>

                        <h3 
                            class="
                                font-bold 
                                text-white 
                                text-lg
                            "
                        >
                            Satu Nomor, Banyak Admin
                        </h3>

                        <p 
                            class="
                                text-sm 
                                text-gray-400 
                                mt-2 
                                leading-relaxed
                            "
                        >
                            Tim dapat membantu mengambil alih
                            percakapan saat pelanggan membutuhkan
                            bantuan manusia.
                        </p>

                    </div>

                </div>


                <!-- FEATURE 4 -->
                <div 
                    class="
                        glass 
                        rounded-2xl 
                        p-7 
                        flex 
                        gap-5
                    "
                >

                    <div 
                        class="
                            w-12 
                            h-12 
                            shrink-0 
                            rounded-xl 
                            bg-green-500/10 
                            text-green-400 
                            flex 
                            items-center 
                            justify-center 
                            text-xl
                        "
                    >

                        <i class="fa-solid fa-moon"></i>

                    </div>


                    <div>

                        <h3 
                            class="
                                font-bold 
                                text-white 
                                text-lg
                            "
                        >
                            Melayani di Luar Jam Kerja
                        </h3>

                        <p 
                            class="
                                text-sm 
                                text-gray-400 
                                mt-2 
                                leading-relaxed
                            "
                        >
                            Pertanyaan dasar pelanggan tetap bisa
                            ditangani ketika Anda sedang sibuk atau
                            tidak sedang memegang HP.
                        </p>

                    </div>

                </div>

            </div>

        </section>



        <!-- CARA KERJA -->
        <section 
            id="cara-kerja" 
            class="
                max-w-5xl 
                mx-auto 
                px-5 
                sm:px-6 
                py-16
            "
        >

            <div 
                class="
                    text-center 
                    max-w-2xl 
                    mx-auto 
                    mb-12
                "
            >

                <p 
                    class="
                        text-green-400 
                        font-semibold 
                        text-sm 
                        mb-2
                    "
                >
                    Sederhana
                </p>


                <h2 
                    class="
                        text-3xl 
                        sm:text-4xl 
                        font-bold 
                        text-white
                    "
                >
                    Cara kerjanya
                </h2>


                <p 
                    class="
                        mt-4 
                        text-gray-400
                    "
                >
                    Pelanggan bertanya seperti biasa.
                    Sistem membantu menangani pertanyaan
                    yang bisa diotomatisasi.
                </p>

            </div>


            <div 
                class="
                    grid 
                    sm:grid-cols-4 
                    gap-4
                "
            >

                <!-- STEP 1 -->
                <div 
                    class="
                        glass 
                        rounded-2xl 
                        p-6 
                        text-center
                    "
                >

                    <div 
                        class="
                            w-11 
                            h-11 
                            mx-auto 
                            rounded-full 
                            bg-green-500 
                            text-gray-950 
                            flex 
                            items-center 
                            justify-center 
                            font-extrabold
                        "
                    >
                        1
                    </div>


                    <h3 class="font-bold mt-4">
                        Pelanggan Chat
                    </h3>


                    <p 
                        class="
                            text-sm 
                            text-gray-400 
                            mt-2
                        "
                    >
                        Pelanggan menghubungi WhatsApp bisnis.
                    </p>

                </div>


                <!-- STEP 2 -->
                <div 
                    class="
                        glass 
                        rounded-2xl 
                        p-6 
                        text-center
                    "
                >

                    <div 
                        class="
                            w-11 
                            h-11 
                            mx-auto 
                            rounded-full 
                            bg-green-500 
                            text-gray-950 
                            flex 
                            items-center 
                            justify-center 
                            font-extrabold
                        "
                    >
                        2
                    </div>


                    <h3 class="font-bold mt-4">
                        Sistem Membaca
                    </h3>


                    <p 
                        class="
                            text-sm 
                            text-gray-400 
                            mt-2
                        "
                    >
                        AI memahami pertanyaan pelanggan.
                    </p>

                </div>


                <!-- STEP 3 -->
                <div 
                    class="
                        glass 
                        rounded-2xl 
                        p-6 
                        text-center
                    "
                >

                    <div 
                        class="
                            w-11 
                            h-11 
                            mx-auto 
                            rounded-full 
                            bg-green-500 
                            text-gray-950 
                            flex 
                            items-center 
                            justify-center 
                            font-extrabold
                        "
                    >
                        3
                    </div>


                    <h3 class="font-bold mt-4">
                        Cari Informasi
                    </h3>


                    <p 
                        class="
                            text-sm 
                            text-gray-400 
                            mt-2
                        "
                    >
                        Sistem menggunakan informasi produk
                        yang tersedia.
                    </p>

                </div>


                <!-- STEP 4 -->
                <div 
                    class="
                        glass 
                        rounded-2xl 
                        p-6 
                        text-center
                    "
                >

                    <div 
                        class="
                            w-11 
                            h-11 
                            mx-auto 
                            rounded-full 
                            bg-green-500 
                            text-gray-950 
                            flex 
                            items-center 
                            justify-center 
                            font-extrabold
                        "
                    >
                        4
                    </div>


                    <h3 class="font-bold mt-4">
                        Pelanggan Dijawab
                    </h3>


                    <p 
                        class="
                            text-sm 
                            text-gray-400 
                            mt-2
                        "
                    >
                        Jawaban diberikan atau diteruskan
                        ke admin.
                    </p>

                </div>

            </div>

        </section>



        <!-- CTA -->
        <section 
            class="
                max-w-4xl 
                mx-auto 
                px-5 
                sm:px-6 
                py-16
            "
        >

            <div 
                class="
                    rounded-3xl 
                    border 
                    border-green-500/20 
                    bg-green-500/5 
                    p-8 
                    sm:p-12 
                    text-center
                "
            >

                <p 
                    class="
                        text-green-400 
                        font-semibold 
                        text-sm 
                        mb-3
                    "
                >
                    Cocok untuk berbagai bisnis
                </p>


                <h2 
                    class="
                        text-3xl 
                        sm:text-4xl 
                        font-bold 
                        text-white
                    "
                >
                    Toko online, retail, jasa, distributor,
                    dan UMKM lainnya.
                </h2>


                <p 
                    class="
                        mt-4 
                        text-gray-400
                    "
                >
                    Kita bisa mulai dari kebutuhan sederhana
                    terlebih dahulu, lalu dikembangkan sesuai
                    bisnis Anda.
                </p>


                <a 
                    id="wa-btn-bottom"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                        mt-7 
                        inline-flex 
                        items-center 
                        justify-center 
                        gap-2 
                        px-7 
                        py-4 
                        rounded-xl 
                        bg-green-500 
                        hover:bg-green-400 
                        text-gray-950 
                        font-bold 
                        transition
                    "
                >

                    <i class="fa-brands fa-whatsapp text-xl"></i>

                    Konsultasi Gratis via WhatsApp

                </a>

            </div>

        </section>

    </main>



    <!-- FOOTER -->
    <footer 
        id="contact" 
        class="
            border-t 
            border-gray-800/60 
            mt-10
        "
    >

        <div 
            class="
                max-w-6xl 
                mx-auto 
                px-5 
                sm:px-6 
                py-8 
                flex 
                flex-col 
                sm:flex-row 
                items-center 
                justify-between 
                gap-4 
                text-sm 
                text-gray-500
            "
        >

            <span>

                &copy;

                <span id="current-year"></span>

                Zea Technology.
                All rights reserved.

            </span>


            <a 
                href="/privacy.html" 
                class="
                    hover:text-green-400 
                    transition 
                    underline
                "
            >
                Kebijakan Privasi
            </a>

        </div>

    </footer>



    <!-- JAVASCRIPT -->
    <script>

        document.getElementById('current-year').textContent =
            new Date().getFullYear();


        document.addEventListener(
            'DOMContentLoaded',
            async () => {

                const waMessage = encodeURIComponent(
                    'Halo Zea, saya ingin konsultasi tentang otomatisasi WhatsApp untuk bisnis saya.'
                );


                try {

                    const configRes =
                        await fetch('/api/config');


                    if (!configRes.ok) {
                        throw new Error(
                            'Gagal mengambil konfigurasi WhatsApp'
                        );
                    }


                    const configData =
                        await configRes.json();


                    const waNumber =
                        configData.data.waNumber;


                    const waUrl =
                        'https://wa.me/' +
                        waNumber +
                        '?text=' +
                        waMessage;


                    document.getElementById(
                        'wa-btn'
                    ).href = waUrl;


                    document.getElementById(
                        'wa-btn-bottom'
                    ).href = waUrl;


                } catch (error) {

                    console.error(
                        'Gagal memuat konfigurasi WhatsApp:',
                        error
                    );


                    const fallbackUrl =
                        'https://wa.me/6285647335105?text=' +
                        waMessage;


                    document.getElementById(
                        'wa-btn'
                    ).href = fallbackUrl;


                    document.getElementById(
                        'wa-btn-bottom'
                    ).href = fallbackUrl;

                }

            }
        );

    </script>

</body>
</html>
    `;

    res.send(landingHTML);
});



// ==========================================
// 3.1 PRIVACY POLICY ROUTING
// ==========================================
app.get('/privacy.html', (req, res) => {

    const privacyHTML = `
<!DOCTYPE html>
<html lang="id">

<head>

    <meta charset="UTF-8">

    <meta 
        name="viewport" 
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Kebijakan Privasi - Zea Technology Indonesia
    </title>

    <style>

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #d1d5db;
            background-color: #030712;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        h1,
        h2 {
            color: #fff;
        }

        h1 {
            margin-bottom: 5px;
        }

        p.date {
            font-size: 0.85em;
            color: #9ca3af;
            margin-bottom: 30px;
        }

        a {
            color: #22c55e;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        ul {
            margin-bottom: 20px;
        }

        li {
            margin-bottom: 10px;
        }

        footer {
            margin-top: 40px;
            font-size: 0.9em;
            color: #6b7280;
            border-top: 1px solid #1f2937;
            padding-top: 20px;
            text-align: center;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #22c55e;
            font-weight: bold;
            text-decoration: none;
            border: 1px solid #22c55e;
            padding: 5px 15px;
            border-radius: 5px;
        }

        .back-link:hover {
            background-color: rgba(34, 197, 94, 0.1);
            text-decoration: none;
        }

    </style>

</head>


<body>

    <a 
        href="/" 
        class="back-link"
    >
        &larr; Kembali ke Beranda
    </a>


    <h1>
        Kebijakan Privasi (Privacy Policy)
    </h1>


    <p class="date">
        Terakhir diperbarui: 29 September 2026
    </p>


    <p>

        <strong>Zea Technology</strong>

        ("kami") berkomitmen untuk melindungi
        dan menghormati privasi pengguna dan pelanggan kami.

        Kebijakan Privasi ini menjelaskan bagaimana kami
        mengumpulkan, menggunakan, dan melindungi informasi
        pribadi yang diperoleh melalui layanan otomatisasi
        pesan WhatsApp dan platform AI Customer Service kami.

    </p>


    <h2>
        1. Informasi yang Kami Kumpulkan
    </h2>


    <p>
        Dalam menjalankan layanan otomatisasi,
        kami mengumpulkan dan memproses informasi terbatas,
        antara lain:
    </p>


    <ul>

        <li>
            <strong>Data Kontak:</strong>
            Nomor telepon WhatsApp pengguna/pelanggan.
        </li>

        <li>
            <strong>Pesan Komunikasi:</strong>
            Teks pesan masuk yang dikirimkan oleh pelanggan
            untuk keperluan pemrosesan jawaban otomatis
            oleh sistem AI kami.
        </li>

    </ul>


    <h2>
        2. Penggunaan Informasi
    </h2>


    <p>
        Informasi yang kami kumpulkan hanya digunakan
        untuk tujuan berikut:
    </p>


    <ul>

        <li>
            Merespons pertanyaan pelanggan secara otomatis
            terkait informasi produk, harga, dan ketersediaan
            stok atas nama klien kami.
        </li>

        <li>
            Meningkatkan kualitas respons asisten virtual
            dan efisiensi layanan pelanggan.
        </li>

        <li>
            Memastikan keamanan dan mencegah aktivitas
            yang tidak sah pada sistem kami.
        </li>

    </ul>


    <h2>
        3. Perlindungan dan Keamanan Data
    </h2>


    <p>

        Kami menerapkan langkah-langkah teknis dan
        organisasional yang ketat untuk melindungi data
        dari akses, pengungkapan, atau perubahan yang
        tidak sah.

        Data pesan diproses menggunakan enkripsi dan
        tidak dijual atau disewakan kepada pihak ketiga
        mana pun untuk tujuan pemasaran.

    </p>


    <h2>
        4. Pembagian Data Pihak Ketiga
    </h2>


    <p>

        Kami tidak membagikan informasi pribadi Anda
        kepada pihak luar, kecuali diperlukan untuk
        memproses layanan (seperti penyedia API pesan
        resmi dari Meta) atau jika diwajibkan oleh
        hukum yang berlaku.

    </p>


    <h2>
        5. Hak Pengguna
    </h2>


    <p>

        Pengguna berhak meminta penghapusan riwayat chat
        atau meminta agar sistem otomatisasi dihentikan
        saat berinteraksi dengan nomor bisnis kami.

        Anda dapat menghubungi kami melalui kontak resmi
        di bawah ini.

    </p>


    <h2>
        6. Kontak Kami
    </h2>


    <p>
        Jika Anda memiliki pertanyaan tentang
        Kebijakan Privasi ini, silakan hubungi kami di:
    </p>


    <ul>

        <li>
            <strong>Perusahaan:</strong>
            Zea Technology
        </li>

        <li>
            <strong>Website:</strong>

            <a href="https://zeateknologiindonesia.web.id">
                https://zeateknologiindonesia.web.id
            </a>
        </li>

        <li>
            <strong>Email:</strong>
            admin@zeateknologiindonesia.web.id
        </li>

    </ul>


    <footer>

        <p>
            &copy; 2026 Zea Technology.
            All rights reserved.
        </p>

    </footer>

</body>

</html>
    `;

    res.send(privacyHTML);

});



// ==========================================
// API 404 HANDLER
// ==========================================
app.use('/api', (req, res) => {

    res.status(404).json({

        status: "error",

        message: "Endpoint tidak ditemukan"

    });

});



// ==========================================
// 4. SERVER INITIALIZATION
// ==========================================
const PORT =
    process.env.PORT || 3000;


const server =
    http.createServer(app);


server.listen(
    PORT,
    '0.0.0.0',
    () => {

        console.log(
            `[SYSTEM] Zea Intelligent berjalan di port ${PORT}`
        );

    }
);



// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================
const gracefulShutdown = (signal) => {

    console.log(
        `\n[SYSTEM] Menerima sinyal ${signal}. Memulai proses Graceful Shutdown...`
    );


    server.close(() => {

        console.log(
            '[SYSTEM] Semua koneksi HTTP telah diselesaikan. Server berhasil ditutup.'
        );

        process.exit(0);

    });


    setTimeout(() => {

        console.error(
            '[SYSTEM] Peringatan: Graceful shutdown timeout. Memaksa penghentian proses.'
        );

        process.exit(1);

    }, 10000);

};


process.on(
    'SIGTERM',
    () => gracefulShutdown('SIGTERM')
);


process.on(
    'SIGINT',
    () => gracefulShutdown('SIGINT')
);
