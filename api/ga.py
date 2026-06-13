import random
import copy
from data import SARAPAN_IDS, SIANG_IDS, MALAM_IDS
from fitness import fitness


def inisialisasi_populasi(ukuran_populasi: int) -> list[list[int]]:
    populasi = []
    for _ in range(ukuran_populasi):
        kromosom = [
            random.choice(SARAPAN_IDS),
            random.choice(SIANG_IDS),
            random.choice(MALAM_IDS),
        ]
        populasi.append(kromosom)
    return populasi


def seleksi_tournament(populasi: list[list[int]], tournament_size: int = 3) -> list[int]:
    kandidat = random.sample(populasi, tournament_size)
    return max(kandidat, key=lambda k: fitness(k[0], k[1], k[2]))


def crossover(induk1: list[int], induk2: list[int], prob_crossover: float = 0.8) -> tuple[list[int], list[int]]:
    if random.random() < prob_crossover:
        titik = random.randint(1, 2)
        anak1 = induk1[:titik] + induk2[titik:]
        anak2 = induk2[:titik] + induk1[titik:]
        return anak1, anak2
    return copy.copy(induk1), copy.copy(induk2)


def mutasi(kromosom: list[int], prob_mutasi: float = 0.05) -> list[int]:
    rentang = [SARAPAN_IDS, SIANG_IDS, MALAM_IDS]
    hasil = copy.copy(kromosom)
    for i in range(3):
        if random.random() < prob_mutasi:
            hasil[i] = random.choice(rentang[i])
    return hasil


def jalankan_ga(
    ukuran_populasi: int = 50,
    maks_generasi: int = 100,
    prob_crossover: float = 0.8,
    prob_mutasi: float = 0.05,
    fitness_target: float = 95,
) -> dict:
    populasi = inisialisasi_populasi(ukuran_populasi)
    riwayat_fitness = []

    nilai_fitness = [fitness(k[0], k[1], k[2]) for k in populasi]
    idx_terbaik = nilai_fitness.index(max(nilai_fitness))
    individu_terbaik = copy.copy(populasi[idx_terbaik])
    fitness_terbaik = nilai_fitness[idx_terbaik]

    generasi_selesai = 0

    for gen in range(maks_generasi):
        riwayat_fitness.append({
            "generasi": gen + 1,
            "terbaik": max(nilai_fitness),
            "rata_rata": round(sum(nilai_fitness) / len(nilai_fitness), 2),
            "terburuk": min(nilai_fitness),
        })

        if fitness_terbaik >= fitness_target:
            generasi_selesai = gen + 1
            break

        populasi_baru = [copy.copy(individu_terbaik)]

        while len(populasi_baru) < ukuran_populasi:
            induk1 = seleksi_tournament(populasi)
            induk2 = seleksi_tournament(populasi)
            anak1, anak2 = crossover(induk1, induk2, prob_crossover)
            anak1 = mutasi(anak1, prob_mutasi)
            anak2 = mutasi(anak2, prob_mutasi)
            populasi_baru.append(anak1)
            if len(populasi_baru) < ukuran_populasi:
                populasi_baru.append(anak2)

        populasi = populasi_baru
        nilai_fitness = [fitness(k[0], k[1], k[2]) for k in populasi]
        idx_terbaik = nilai_fitness.index(max(nilai_fitness))

        if nilai_fitness[idx_terbaik] > fitness_terbaik:
            individu_terbaik = copy.copy(populasi[idx_terbaik])
            fitness_terbaik = nilai_fitness[idx_terbaik]

        generasi_selesai = gen + 1

    return {
        "kromosom_terbaik": individu_terbaik,
        "fitness_terbaik": fitness_terbaik,
        "generasi_selesai": generasi_selesai,
        "riwayat_fitness": riwayat_fitness,
    }
