## Fitur

* Optimasi kombinasi menu sarapan, makan siang, dan makan malam menggunakan Algoritma Genetika
* Evaluasi nutrisi berdasarkan standar AKG Kemenkes RI 2019
* Fungsi fitness berbasis penalti untuk kalori, protein, lemak, karbohidrat, dan anggaran
* Seleksi tournament dengan elitisme satu individu terbaik
* Single-point crossover dan random reset mutation
* Terminasi dini jika fitness target tercapai
* Pengukuran waktu komputasi GA
* Grafik konvergensi fitness terbaik, rata-rata, dan terburuk per generasi
* Unduh dataset makanan dalam format CSV
* Antarmuka web responsif berbasis React

## Teknologi

* Python 3.8+
* FastAPI
* Bun
* React 19
* Vite
* TypeScript
* Tailwind CSS 4
* Recharts

## Struktur Folder

```text
sisehat/
|-- apps/
|   |-- api/                  # Backend FastAPI + Algoritma Genetika
|   |   |-- data.py           # Dataset 30 makanan dan konstanta rentang ID
|   |   |-- fitness.py        # Fungsi fitness dengan pendekatan penalti
|   |   |-- ga.py             # Logika utama GA: inisialisasi, seleksi, crossover, mutasi
|   |   |-- utils.py          # Fungsi bantu: hitung nutrisi, evaluasi constraints, grafik
|   |   |-- main.py           # FastAPI app dengan endpoint REST
|   |   |-- cli.py            # Entry point CLI untuk menjalankan GA di terminal
|   |   `-- requirements.txt
|   `-- web/                  # Frontend React
|       |-- src/
|       |   |-- components/   # MenuCard, ConstraintBadge, DatasetTable, KonvergensiChart
|       |   |-- services/     # Fungsi fetch ke API
|       |   |-- types/        # TypeScript interface
|       |   `-- App.tsx
|       |-- index.html
|       `-- package.json
|-- package.json              # Bun workspaces root
`-- .gitignore
```

## Cara Menjalankan

1. Pastikan komputer sudah memiliki **Python 3.8+**, **Bun**, dan **Git**.

2. Clone repositori.

   ```bash
   git clone git@github.com:franzxml/sisehat.git
   cd sisehat
   ```

   Jika menggunakan HTTPS:

   ```bash
   git clone https://github.com/franzxml/sisehat.git
   cd sisehat
   ```

3. Setup virtual environment backend.

   ```bash
   python3 -m venv apps/api/.venv
   source apps/api/.venv/bin/activate
   pip install -r apps/api/requirements.txt
   ```

4. Install dependensi frontend.

   ```bash
   bun install
   ```

5. Jalankan seluruh aplikasi dalam satu perintah.

   ```bash
   bun dev
   ```

6. Buka browser.

   ```
   http://localhost:5173
   ```

   API berjalan di:

   ```
   http://localhost:8000
   ```

## Script

* `bun dev` — jalankan API dan web secara paralel dalam satu terminal
* `bun dev:api` — jalankan hanya backend FastAPI
* `bun dev:web` — jalankan hanya frontend Vite
* `bun build:web` — build frontend untuk produksi

## API Endpoint

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/optimize` | Jalankan GA, kembalikan hasil optimasi lengkap |
| GET | `/dataset` | Ambil daftar 30 makanan dalam format JSON |
| GET | `/dataset/csv` | Unduh dataset dalam format CSV |
| GET | `/health` | Cek status API |

## Parameter GA

| Parameter | Nilai |
|-----------|-------|
| Ukuran Populasi | 50 |
| Jumlah Generasi Maksimum | 100 |
| Probabilitas Crossover | 0.8 |
| Probabilitas Mutasi | 0.05 |
| Metode Seleksi | Tournament (size=3) |
| Metode Crossover | Single-Point |
| Metode Mutasi | Random Reset |
| Fitness Target | 95 |
| Elitisme | 1 individu terbaik |

## Constraints

| Parameter | Batas Bawah | Batas Atas |
|-----------|-------------|------------|
| Kalori | 1.800 kkal | 2.400 kkal |
| Protein | 55 g | — |
| Lemak | — | 70 g |
| Karbohidrat | 250 g | 350 g |
| Anggaran | — | Rp60.000 |

---

Dikembangkan oleh:

* @Adtriver
* @ghinaaa09
* @kaniaa-kr
* @tesafrnta
* @franzxml