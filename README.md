## Fitur

* Optimasi kombinasi menu sarapan, makan siang, dan makan malam menggunakan Algoritma Genetika
* Evaluasi nutrisi berdasarkan standar AKG Kemenkes RI 2019
* Fungsi fitness berbasis penalti untuk kalori, protein, lemak, karbohidrat, dan anggaran
* Seleksi tournament dengan elitisme satu individu terbaik
* Single-point crossover dan random reset mutation
* Terminasi dini jika fitness target tercapai
* Evaluasi status pemenuhan setiap constraint secara detail
* Grafik konvergensi fitness terbaik, rata-rata, dan terburuk per generasi

## Teknologi

* Python 3.8+
* matplotlib

## Struktur Folder

```text
sisehat/
|-- data.py       # Dataset 30 makanan dan konstanta rentang ID per waktu makan
|-- fitness.py    # Fungsi fitness dengan pendekatan penalti
|-- ga.py         # Logika utama GA: inisialisasi, seleksi, crossover, mutasi
|-- utils.py      # Fungsi bantu: cetak kromosom, evaluasi constraints, grafik konvergensi
|-- main.py       # Entry point program
|-- README.md
|-- .gitignore
`-- output/       # Hasil grafik konvergensi (di-generate saat program dijalankan)
    `-- konvergensi.png
```

## Cara Menjalankan

1. Pastikan komputer sudah memiliki **Python 3.8+** dan **Git**.

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

3. Buat virtual environment.

   ```bash
   python3 -m venv .venv
   ```

4. Aktifkan virtual environment.

   ```bash
   source .venv/bin/activate
   ```

5. Install dependensi.

   ```bash
   pip install matplotlib
   ```

6. Jalankan program.

   ```bash
   python3 main.py
   ```

## Output

* Rekomendasi menu sarapan, makan siang, dan makan malam beserta detail nutrisi dan harga
* Status pemenuhan setiap constraint gizi
* Jumlah generasi yang dibutuhkan dan nilai fitness terbaik
* File `output/konvergensi.png` berisi grafik perkembangan fitness per generasi

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

## Catatan Struktur

* `data.py` adalah sumber tunggal dataset — semua modul lain mengimpornya dari sini.
* `fitness.py` hanya berisi satu fungsi murni tanpa side effect.
* `ga.py` tidak mencetak output apapun — semua output ditangani `utils.py`.
* `output/` di-generate otomatis saat program dijalankan dan masuk `.gitignore`.

---

Dikembangkan oleh:

* @Adtriver
* @ghinaaa09
* @kaniaa-kr
* @tesafrnta
* @franzxml