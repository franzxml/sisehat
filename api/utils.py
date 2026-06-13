import os
from data import makanan
from fitness import fitness


def hitung_nutrisi(kromosom: list[int]) -> dict:
    g1, g2, g3 = kromosom
    m1, m2, m3 = makanan[g1], makanan[g2], makanan[g3]
    return {
        "kalori":  m1[0] + m2[0] + m3[0],
        "protein": m1[1] + m2[1] + m3[1],
        "lemak":   m1[2] + m2[2] + m3[2],
        "karbo":   m1[3] + m2[3] + m3[3],
        "harga":   m1[4] + m2[4] + m3[4],
    }


def evaluasi_constraints(kromosom: list[int]) -> dict:
    n = hitung_nutrisi(kromosom)
    return {
        "kalori":   {"nilai": n["kalori"],  "status": "TERPENUHI" if 1800 <= n["kalori"] <= 2400 else "TIDAK TERPENUHI"},
        "protein":  {"nilai": n["protein"], "status": "TERPENUHI" if n["protein"] >= 55 else "TIDAK TERPENUHI"},
        "lemak":    {"nilai": n["lemak"],   "status": "TERPENUHI" if n["lemak"] <= 70 else "TIDAK TERPENUHI"},
        "karbo":    {"nilai": n["karbo"],   "status": "TERPENUHI" if 250 <= n["karbo"] <= 350 else "TIDAK TERPENUHI"},
        "anggaran": {"nilai": n["harga"],   "status": "TERPENUHI" if n["harga"] <= 60000 else "TIDAK TERPENUHI"},
    }


def format_rupiah(nilai: int | float) -> str:
    return f"Rp{nilai:,.0f}".replace(",", ".")


def cetak_kromosom(kromosom: list[int]) -> None:
    g1, g2, g3 = kromosom
    m1, m2, m3 = makanan[g1], makanan[g2], makanan[g3]
    n = hitung_nutrisi(kromosom)

    print("=" * 55)
    print("=== Hasil Menu Optimal ===")
    for label, m in [("Sarapan ", m1), ("Siang   ", m2), ("Malam   ", m3)]:
        print(f"{label:<9}: {m[5]} ({m[0]} kkal, protein {m[1]}g, lemak {m[2]}g, karbo {m[3]}g, {format_rupiah(m[4])})")
    print("-" * 55)
    print(f"Total    : {n['kalori']} kkal | protein {n['protein']}g | lemak {n['lemak']}g | karbo {n['karbo']}g | {format_rupiah(n['harga'])}")
    print(f"Fitness  : {fitness(g1, g2, g3)}")
    print("=" * 55)


def cetak_constraints(kromosom: list[int]) -> None:
    n = hitung_nutrisi(kromosom)
    c = evaluasi_constraints(kromosom)
    print("\n=== Evaluasi Constraints ===")
    print(f"Kalori   : {n['kalori']} kkal  → {c['kalori']['status']} (1800–2400 kkal)")
    print(f"Protein  : {n['protein']} g     → {c['protein']['status']} (min. 55 g)")
    print(f"Lemak    : {n['lemak']} g     → {c['lemak']['status']} (maks. 70 g)")
    print(f"Karbo    : {n['karbo']} g    → {c['karbo']['status']} (250–350 g)")
    print(f"Anggaran : {format_rupiah(n['harga'])}  → {c['anggaran']['status']} (maks. Rp60.000)")


def plot_konvergensi(riwayat_fitness: list[dict]) -> None:
    import matplotlib.pyplot as plt
    generasi  = [r["generasi"]  for r in riwayat_fitness]
    terbaik   = [r["terbaik"]   for r in riwayat_fitness]
    rata_rata = [r["rata_rata"] for r in riwayat_fitness]
    terburuk  = [r["terburuk"]  for r in riwayat_fitness]

    plt.figure(figsize=(10, 6))
    plt.plot(generasi, terbaik,   label="Terbaik",   color="green", linewidth=2)
    plt.plot(generasi, rata_rata, label="Rata-rata", color="blue",  linewidth=1.5, linestyle="--")
    plt.plot(generasi, terburuk,  label="Terburuk",  color="red",   linewidth=1,   linestyle=":")

    plt.title("Grafik Konvergensi Algoritma Genetika")
    plt.xlabel("Generasi")
    plt.ylabel("Nilai Fitness")
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    os.makedirs("output", exist_ok=True)
    plt.savefig("output/konvergensi.png", dpi=150)
    plt.close()
    print("\nGrafik konvergensi disimpan ke: output/konvergensi.png")
