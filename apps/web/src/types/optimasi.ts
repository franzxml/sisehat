export interface ItemMenu {
  nama: string
  kalori: number
  protein: number
  lemak: number
  karbo: number
  harga: number
}

export interface ItemDataset extends ItemMenu {
  id: number
  waktu_makan: string
}

export interface ParameterGA {
  ukuran_populasi: number
  maks_generasi: number
  prob_crossover: number
  prob_mutasi: number
  fitness_target: number
}

export interface HasilOptimasi {
  kromosom: number[]
  menu: {
    sarapan: ItemMenu
    siang: ItemMenu
    malam: ItemMenu
  }
  nutrisi: {
    kalori: number
    protein: number
    lemak: number
    karbo: number
    harga: number
  }
  constraints: Record<string, { nilai: number; status: string }>
  fitness: number
  generasi_selesai: number
  waktu_komputasi: number
  riwayat_fitness: Array<{
    generasi: number
    terbaik: number
    rata_rata: number
    terburuk: number
  }>
  parameter: ParameterGA
}
