## Fitur

- Optimasi kombinasi menu sarapan, makan siang, dan malam menggunakan Algoritma Genetika
- Evaluasi nutrisi berdasarkan standar AKG Kemenkes RI 2019
- Fungsi fitness berbasis penalti untuk kalori, protein, lemak, karbohidrat, dan anggaran
- Seleksi tournament dengan elitisme satu individu terbaik
- Single-point crossover dan random reset mutation
- Terminasi dini jika fitness target tercapai
- Pengukuran waktu komputasi GA
- Konfigurasi parameter GA secara manual untuk keperluan eksperimen (ukuran populasi, probabilitas crossover, probabilitas mutasi, jumlah generasi, fitness target)
- Grafik konvergensi fitness terbaik, rata-rata, dan terburuk per generasi
- Unduh dataset makanan dalam format CSV
- Antarmuka web responsif berbasis React

## Teknologi

- **Runtime:** Python 3.14, Bun
- **Backend:** FastAPI, uvicorn
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS 4, Recharts
- **Deployment:** Vercel

## Struktur Folder

```
sisehat/
├── api/                      # Backend FastAPI + Algoritma Genetika
│   ├── index.py              # Entry point Vercel + FastAPI app
│   ├── data.py               # Dataset 30 makanan dan konstanta rentang ID
│   ├── fitness.py            # Fungsi fitness dengan pendekatan penalti
│   ├── ga.py                 # Logika utama GA: inisialisasi, seleksi, crossover, mutasi
│   ├── utils.py              # Fungsi bantu: hitung nutrisi, evaluasi constraints, grafik
│   ├── cli.py                # Entry point CLI untuk menjalankan GA di terminal
│   └── requirements.txt
├── apps/
│   └── web/                  # Frontend React
│       ├── src/
│       │   ├── components/   # MenuCard, ConstraintBadge, DatasetTable, KonvergensiChart, ParameterForm
│       │   ├── services/     # Fungsi fetch ke API
│       │   ├── types/        # TypeScript interface
│       │   └── App.tsx
│       ├── index.html
│       └── package.json
├── vercel.json               # Konfigurasi deployment Vercel
├── package.json              # Bun workspaces root
└── .gitignore
```

## Cara Menjalankan

**Prasyarat sistem:** Python 3.8+, Bun, Git

1. Clone repositori:
   ```bash
   git clone https://github.com/franzxml/sisehat.git && cd sisehat
   ```

2. Setup virtual environment backend:
   ```bash
   python3 -m venv api/.venv
   source api/.venv/bin/activate
   pip install -r api/requirements.txt
   ```

3. Install dependensi frontend:
   ```bash
   bun install
   ```

4. Jalankan seluruh aplikasi:
   ```bash
   bun dev
   ```

5. Buka browser di `http://localhost:5173` — API berjalan di `http://localhost:8000`

## Scripts

| Perintah | Keterangan |
|---|---|
| `bun dev` | Jalankan API dan web secara paralel |
| `bun dev:api` | Jalankan hanya backend FastAPI |
| `bun dev:web` | Jalankan hanya frontend Vite |
| `bun build:web` | Build frontend untuk production |

## API Endpoint

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/optimize` | Jalankan GA, kembalikan hasil optimasi lengkap |
| GET | `/api/dataset` | Ambil daftar 30 makanan dalam format JSON |
| GET | `/api/dataset/csv` | Unduh dataset dalam format CSV |
| GET | `/api/health` | Cek status API |

## Parameter GA

| Parameter | Nilai default |
|---|---|
| Ukuran Populasi | 50 |
| Jumlah Generasi Maksimum | 100 |
| Probabilitas Crossover | 0.8 |
| Probabilitas Mutasi | 0.05 |
| Metode Seleksi | Tournament (size=3) |
| Metode Crossover | Single-Point |
| Metode Mutasi | Random Reset |
| Fitness Target | 95 |
| Elitisme | 1 individu terbaik |

## Constraints Nutrisi

| Parameter | Batas Bawah | Batas Atas |
|---|---|---|
| Kalori | 1.800 kkal | 2.400 kkal |
| Protein | 55 g | — |
| Lemak | — | 70 g |
| Karbohidrat | 250 g | 350 g |
| Anggaran | — | Rp60.000 |

## Deployment

https://sisehat-nine.vercel.app

## Pengembang

- [Adtriver](https://github.com/Adtriver)
- [ghinaaa09](https://github.com/ghinaaa09)
- [kaniaa-kr](https://github.com/kaniaa-kr)
- [tesafrnta](https://github.com/tesafrnta)
- [franzxml](https://github.com/franzxml)
