import type { ParameterGA } from '../types/optimasi'
import ParameterField from './ParameterField'

interface Props {
  params: ParameterGA
  onChange: (params: ParameterGA) => void
  onReset: () => void
}

const DEFAULTS: ParameterGA = {
  ukuran_populasi: 50,
  maks_generasi: 100,
  prob_crossover: 0.8,
  prob_mutasi: 0.05,
  fitness_target: 95,
}

export default function ParameterForm({ params, onChange, onReset }: Props) {
  function handleChange(name: keyof ParameterGA, value: number) {
    onChange({ ...params, [name]: value })
  }

  const adaYangDiubah = Object.keys(DEFAULTS).some(
    (k) => params[k as keyof ParameterGA] !== DEFAULTS[k as keyof ParameterGA]
  )

  return (
    <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-gray-800">Parameter Eksperimen</h2>
          <p className="text-xs text-gray-400 mt-0.5">Ubah parameter GA untuk eksperimen. Default = nilai studi kasus.</p>
        </div>
        {adaYangDiubah && (
          <button
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors underline underline-offset-2 cursor-pointer"
          >
            Reset default
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <ParameterField label="Ukuran Populasi" name="ukuran_populasi" value={params.ukuran_populasi} min={10} max={500} step={10} defaultValue={DEFAULTS.ukuran_populasi} onChange={handleChange} />
        <ParameterField label="Maks. Generasi" name="maks_generasi" value={params.maks_generasi} min={10} max={1000} step={10} defaultValue={DEFAULTS.maks_generasi} onChange={handleChange} />
        <ParameterField label="Probabilitas Crossover" name="prob_crossover" value={params.prob_crossover} min={0} max={1} step={0.05} defaultValue={DEFAULTS.prob_crossover} onChange={handleChange} />
        <ParameterField label="Probabilitas Mutasi" name="prob_mutasi" value={params.prob_mutasi} min={0} max={1} step={0.01} defaultValue={DEFAULTS.prob_mutasi} onChange={handleChange} />
        <ParameterField label="Fitness Target" name="fitness_target" value={params.fitness_target} min={1} max={100} step={1} defaultValue={DEFAULTS.fitness_target} onChange={handleChange} />
      </div>
    </div>
  )
}

export { DEFAULTS }
