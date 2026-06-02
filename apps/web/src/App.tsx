import { useState, useEffect } from 'react'
import { optimize, fetchDataset, downloadDatasetCSV } from './services/api'
import type { HasilOptimasi, ItemDataset, ParameterGA } from './types/optimasi'
import MenuCard from './components/MenuCard'
import ConstraintBadge from './components/ConstraintBadge'
import DatasetTable from './components/DatasetTable'
import KonvergensiChart from './components/KonvergensiChart'
import ParameterForm, { DEFAULTS } from './components/ParameterForm'

function IconGear() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

export default function App() {
  const [hasil, setHasil] = useState<HasilOptimasi | null>(null)
  const [dataset, setDataset] = useState<ItemDataset[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDataset, setShowDataset] = useState(false)
  const [showParams, setShowParams] = useState(false)
  const [params, setParams] = useState<ParameterGA>({ ...DEFAULTS })

  const isModified = Object.keys(DEFAULTS).some(
    (k) => params[k as keyof ParameterGA] !== DEFAULTS[k as keyof ParameterGA]
  )

  useEffect(() => {
    fetchDataset().then(setDataset).catch(() => {})
  }, [])

  async function handleOptimize() {
    setLoading(true)
    setError(null)
    try {
      const data = await optimize(params)
      setHasil(data)
    } catch {
      setError('Gagal menghubungi server. Pastikan API berjalan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-gray-800">

      {/* Hero */}
      <div className={`relative flex flex-col items-center justify-center text-center px-4 overflow-hidden transition-all duration-500 ${!hasil ? 'min-h-screen' : 'py-16 sm:min-h-[400px]'}`}>

        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-100 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl">
          <div className="flex flex-col gap-3 max-w-xl text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
              Makan Sehat,{' '}
              <span className="text-green-600">Tepat Anggaran</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              Temukan kombinasi menu terbaik yang memenuhi standar AKG Kemenkes RI dalam budget{' '}
              <span className="text-gray-800 font-semibold">Rp60.000/hari</span>.
            </p>
          </div>

          {/* Dataset link — subtle di bawah subtitle */}
          {dataset.length > 0 && (
            <div className="-mt-3">
              <button
                onClick={downloadDatasetCSV}
                className="lg:hidden text-xs text-gray-400 hover:text-green-600 transition-colors underline underline-offset-4 cursor-pointer"
              >
                Unduh dataset ({dataset.length} makanan) sebagai CSV
              </button>
              <button
                onClick={() => setShowDataset((v) => !v)}
                className="hidden lg:block text-xs text-gray-400 hover:text-green-600 transition-colors underline underline-offset-4 cursor-pointer"
              >
                {showDataset ? 'Sembunyikan dataset' : `Lihat ${dataset.length} makanan yang digunakan`}
              </button>
            </div>
          )}

          {showDataset && dataset.length > 0 && (
            <div className="w-full text-left animate-expand-down hidden lg:block">
              <div>
                <DatasetTable data={dataset} />
              </div>
            </div>
          )}

          {/* Parameter form */}
          {showParams && (
            <div className="w-full text-left animate-expand-down">
              <div>
                <ParameterForm
                  params={params}
                  onChange={setParams}
                  onReset={() => setParams({ ...DEFAULTS })}
                />
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <button
            onClick={handleOptimize}
            disabled={loading}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold px-10 py-4 rounded-2xl text-base transition-all cursor-pointer shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? 'Menjalankan...' : hasil ? 'Cari Ulang Menu Optimal' : 'Cari Menu Optimal'}
          </button>

          {/* Secondary — parameter GA */}
          <button
            onClick={() => setShowParams((v) => !v)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
              isModified ? 'text-green-600 hover:text-green-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <IconGear />
            {isModified ? 'Parameter diubah ·' : ''} Atur parameter GA
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>

      {/* Hasil */}
      {hasil && (
        <div className="max-w-4xl mx-auto px-4 pb-20 flex flex-col gap-8">

          <div className="text-center bg-white border border-gray-100 rounded-3xl py-8 shadow-sm">
            <p className="text-sm text-gray-400 mb-2 font-medium">Nilai Fitness</p>
            <p className="text-6xl font-extrabold text-green-600">{hasil.fitness}</p>
            <p className="text-xs text-gray-400 mt-2">
              Selesai di generasi {hasil.generasi_selesai} · {hasil.waktu_komputasi}s
            </p>
            {isModified && (
              <p className="text-xs text-green-600 mt-1 font-medium">
                Populasi {hasil.parameter.ukuran_populasi} · Crossover {hasil.parameter.prob_crossover} · Mutasi {hasil.parameter.prob_mutasi}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-gray-800 text-lg">Menu Harian</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <MenuCard label="Sarapan" menu={hasil.menu.sarapan} />
              <MenuCard label="Makan Siang" menu={hasil.menu.siang} />
              <MenuCard label="Makan Malam" menu={hasil.menu.malam} />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-800 text-lg mb-4">Total Nutrisi Harian</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              {[
                { label: 'Kalori',   nilai: hasil.nutrisi.kalori,   satuan: 'kkal' },
                { label: 'Protein',  nilai: hasil.nutrisi.protein,  satuan: 'g' },
                { label: 'Lemak',    nilai: hasil.nutrisi.lemak,    satuan: 'g' },
                { label: 'Karbo',    nilai: hasil.nutrisi.karbo,    satuan: 'g' },
                { label: 'Anggaran', nilai: `Rp${hasil.nutrisi.harga.toLocaleString('id-ID')}`, satuan: '' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                  <span className="text-xl font-bold text-gray-900">
                    {item.nilai} <span className="text-xs font-normal text-gray-400">{item.satuan}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-gray-800 text-lg">Evaluasi Constraints</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <ConstraintBadge label="Kalori"      nilai={hasil.constraints.kalori.nilai}   satuan="kkal" status={hasil.constraints.kalori.status}   batas="1.800 – 2.400 kkal" />
              <ConstraintBadge label="Protein"     nilai={hasil.constraints.protein.nilai}  satuan="g"    status={hasil.constraints.protein.status}  batas="min. 55 g" />
              <ConstraintBadge label="Lemak"       nilai={hasil.constraints.lemak.nilai}    satuan="g"    status={hasil.constraints.lemak.status}    batas="maks. 70 g" />
              <ConstraintBadge label="Karbohidrat" nilai={hasil.constraints.karbo.nilai}    satuan="g"    status={hasil.constraints.karbo.status}    batas="250 – 350 g" />
              <ConstraintBadge label="Anggaran"    nilai={hasil.constraints.anggaran.nilai} satuan="Rp"   status={hasil.constraints.anggaran.status} batas="maks. Rp60.000" />
            </div>
          </div>

          <KonvergensiChart data={hasil.riwayat_fitness} />
        </div>
      )}
    </div>
  )
}
