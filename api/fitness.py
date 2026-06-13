from data import makanan


def fitness(g1: int, g2: int, g3: int) -> float:
    kalori  = makanan[g1][0] + makanan[g2][0] + makanan[g3][0]
    protein = makanan[g1][1] + makanan[g2][1] + makanan[g3][1]
    lemak   = makanan[g1][2] + makanan[g2][2] + makanan[g3][2]
    karbo   = makanan[g1][3] + makanan[g2][3] + makanan[g3][3]
    harga   = makanan[g1][4] + makanan[g2][4] + makanan[g3][4]

    P_kalori  = max(0, kalori - 2400) * 0.05 + max(0, 1800 - kalori) * 0.05
    P_protein = max(0, 55 - protein) * 0.30
    P_lemak   = max(0, lemak - 70) * 0.30
    P_karbo   = max(0, karbo - 350) * 0.10 + max(0, 250 - karbo) * 0.10
    P_biaya   = max(0, harga - 60000) / 1000

    return round(max(0, 100 - (P_kalori + P_protein + P_lemak + P_karbo + P_biaya)), 2)