import type { HasilOptimasi, ItemDataset } from '../types/optimasi'

const BASE_URL = '/api'

export async function optimize(): Promise<HasilOptimasi> {
  const res = await fetch(`${BASE_URL}/optimize`, { method: 'POST' })
  if (!res.ok) throw new Error('Gagal menjalankan optimasi')
  return res.json()
}

export async function fetchDataset(): Promise<ItemDataset[]> {
  const res = await fetch(`${BASE_URL}/dataset`)
  if (!res.ok) throw new Error('Gagal mengambil dataset')
  return res.json()
}

export function downloadDatasetCSV() {
  window.location.href = `${BASE_URL}/dataset/csv`
}
