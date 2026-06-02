from ga import jalankan_ga
from utils import cetak_kromosom, evaluasi_constraints, plot_konvergensi


def main():
    print("=" * 55)
    print("  OPTIMASI MENU MAKANAN SEHAT HARIAN")
    print("  Implementasi Algoritma Genetika")
    print("  Mata Kuliah Kecerdasan Buatan — UNTAN 2026")
    print("=" * 55)
    print("\nMenjalankan Algoritma Genetika...\n")

    hasil = jalankan_ga(
        ukuran_populasi=50,
        maks_generasi=100,
        prob_crossover=0.8,
        prob_mutasi=0.05,
        fitness_target=95,
    )

    cetak_kromosom(hasil["kromosom_terbaik"])
    evaluasi_constraints(hasil["kromosom_terbaik"])

    print(f"\nGenerasi selesai : {hasil['generasi_selesai']}")
    print(f"Fitness terbaik  : {hasil['fitness_terbaik']}")

    plot_konvergensi(hasil["riwayat_fitness"])


if __name__ == "__main__":
    main()
