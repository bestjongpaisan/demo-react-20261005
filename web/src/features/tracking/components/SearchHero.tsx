import { sampleChips } from '../services/mockData'
import { Icon } from '../../../shared/components/Icon'

interface Props {
  /** True while the API request is in flight. */
  loading: boolean
  /** Validation / API error message, if any. */
  error: string | null
  value: string
  onChange: (value: string) => void
  onTrack: () => void
}

export function SearchHero({ value, onChange, onTrack, loading, error }: Props) {
  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) onChange(text)
    } catch {
      // clipboard permission denied
    }
  }

  return (
    <section className="relative w-full rounded-2xl bg-surface-container-low p-6 sm:p-10 shadow-2xl overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col gap-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-secondary animate-ping" />
              <span className="font-label text-xs uppercase tracking-widest text-secondary font-semibold">
                NEURAL COURIER RADAR v4.8
              </span>
              <span className="text-outline text-xs">/</span>
              <span className="font-label text-[11px] text-on-surface-variant">AUTO-CARRIER RESOLUTION PROTOCOL</span>
            </div>
            <h1 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight">
              ค้นหาสถานะพัสดุอัจฉริยะ{' '}
              <span className="text-primary tracking-normal">(Multi-Courier Smart Track)</span>
            </h1>
            <p className="font-body text-sm sm:text-base text-on-surface-variant mt-1.5">
              ระบบตรวจสอบและจำแนกผู้ให้บริการจัดส่งอัตโนมัติด้วย AI Matching ตรวจจับโครงสร้างหมายเลขพัสดุแบบเรียลไทม์
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto bg-surface-container-high/80 px-3.5 py-1.5 rounded-full">
            <Icon name="memory" className="text-secondary text-sm" />
            <span className="font-label text-xs text-on-surface">Neural Engine:</span>
            <span className="font-label text-xs font-bold text-secondary">ACTIVE 99.4% MATCH</span>
          </div>
        </div>

        <div className="relative flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row items-stretch gap-2.5 p-2 bg-surface-container rounded-xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
            <div className="relative flex-1 flex items-center min-w-0 pl-3.5 pr-2">
              <Icon name="travel_explore" className="text-primary text-2xl mr-3 select-none" />
              <input
                id="trackingInput"
                aria-label="Tracking Number"
                aria-invalid={error ? true : undefined}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onTrack()}
                placeholder="กรอกเลขพัสดุ Tracking Number เช่น TH0123456789A, EF582910482TH, KEX99482019"
                className="w-full bg-transparent font-label text-base sm:text-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none tracking-wide"
              />
              <button
                type="button"
                title="Clear input"
                onClick={() => onChange('')}
                className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={paste}
                className="flex items-center gap-1.5 px-3.5 py-3 rounded-lg bg-surface-container-highest/80 hover:bg-surface-container-highest text-xs font-label text-on-surface-variant hover:text-on-surface transition-all shadow-sm"
              >
                <Icon name="content_paste" className="text-base text-secondary" />
                <span className="hidden sm:inline">วางเลข</span>
              </button>
              <button
                type="button"
                title="เปิดกล้องสแกนบาร์โค้ด"
                className="flex items-center gap-1.5 px-3.5 py-3 rounded-lg bg-surface-container-highest/80 hover:bg-surface-container-highest text-xs font-label text-on-surface-variant hover:text-on-surface transition-all shadow-sm"
              >
                <Icon name="barcode_scanner" className="text-base text-tertiary" />
                <span className="hidden sm:inline">สแกนบาร์โค้ด</span>
              </button>
              <button
                type="button"
                onClick={onTrack}
                disabled={loading}
                className="relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,45,120,0.45)] hover:shadow-[0_0_25px_rgba(255,45,120,0.7)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
              >
                <Icon name={loading ? "progress_activity" : "radar"} className={`text-lg ${loading ? "animate-spin" : ""}`} />
                <span>ตรวจหาและติดตามพัสดุ</span>
              </button>
            </div>
          </div>

          {error && (
            <div role="alert" className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-error-container text-error text-sm font-label">
              <Icon name="error" className="text-lg" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-label text-on-surface-variant flex items-center gap-1 mr-1">
              <Icon name="bolt" className="text-xs" /> ตัวอย่างด่วน:
            </span>
            {sampleChips.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => onChange(chip.value)}
                className={`px-2.5 py-1 rounded bg-surface-container-high/60 hover:bg-surface-container-highest ${chip.text} font-label transition-colors flex items-center gap-1.5`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
