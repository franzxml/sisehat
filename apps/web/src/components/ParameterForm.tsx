import type { ParameterGA } from '../types/optimasi'

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

function Field({
  label, name, value, min, max, step, onChange,
}: {
  label: string
  name: keyof ParameterGA
  value: number
  min: number
  max: number
  step: number
  onChange: (name: keyof ParameterGA, value: number) => void
}) {
  const isDefault = value === DEFAULTS[name]
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-600">{label}</label>
        {!isDefault && (
          <span className="text-xs text-green-600 font-medium">diubah</span>
        )}
      </div>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(name, Number(e.target.value))}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
      />
      <span className="text-xs text-gray-400">default: {DEFAULTS[name]}</span>
    </div>
  )
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
        <Field label="Ukuran Populasi" name="ukuran_populasi" value={params.ukuran_populasi} min={10} max={500} step={10} onChange={handleChange} />
        <Field label="Maks. Generasi" name="maks_generasi" value={params.maks_generasi} min={10} max={1000} step={10} onChange={handleChange} />
        <Field label="Probabilitas Crossover" name="prob_crossover" value={params.prob_crossover} min={0} max={1} step={0.05} onChange={handleChange} />
        <Field label="Probabilitas Mutasi" name="prob_mutasi" value={params.prob_mutasi} min={0} max={1} step={0.01} onChange={handleChange} />
        <Field label="Fitness Target" name="fitness_target" value={params.fitness_target} min={1} max={100} step={1} onChange={handleChange} />
      </div>
    </div>
  )
}

export { DEFAULTS }
