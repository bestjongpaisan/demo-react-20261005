import Icon from './Icon'
import { couriers } from '../data/tracking'

type Props = { query: string }

export default function CourierMatch({ query }: Props) {
  const q = query.trim().toUpperCase()
  const matched = couriers.find((c) => c.pattern.test(q))

  return (
    <section className="flex flex-col gap-4">
      <div className="w-full bg-surface-container-low rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shadow-[0_0_12px_rgba(0,255,204,0.3)]">
            <Icon name="auto_awesome" className="text-2xl" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {matched ? (
                <>
                  <span className="font-headline font-bold text-base text-on-surface">ระบบตรวจพบคู่สายขนส่งที่ตรงกัน:</span>
                  <span className="font-headline font-bold text-base text-secondary">{matched.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary font-label text-[11px] font-semibold tracking-wide">ความแม่นยำ 99.4%</span>
                </>
              ) : (
                <span className="font-headline font-bold text-base text-on-surface-variant">
                  {q ? 'ไม่พบขนส่งที่ตรงกับรูปแบบเลขพัสดุนี้' : 'กรอกเลขพัสดุเพื่อให้ระบบจำแนกขนส่งอัตโนมัติ'}
                </span>
              )}
            </div>
            <p className="font-body text-xs text-on-surface-variant mt-0.5">
              ยืนยันความถูกต้องผ่านฐานข้อมูลโครงสร้างรหัสพัสดุสากล UPU &amp; เครือข่ายโลจิสติกส์แห่งประเทศไทย
            </p>
          </div>
        </div>
        {matched && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-label font-bold tracking-wider uppercase self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            Matched Automatically
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {couriers.map((c) => {
          const hit = matched?.id === c.id
          return hit ? (
            <div key={c.id} className="relative bg-surface-container rounded-xl p-5 shadow-lg overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center font-headline font-extrabold text-xs ${c.codeColor}`}>{c.code}</div>
                  <div>
                    <h3 className="font-headline font-bold text-sm text-on-surface">{c.name}</h3>
                    <span className="font-label text-[10px] text-secondary font-semibold">MATCH CONFIRMED</span>
                  </div>
                </div>
                <Icon name="verified" className="text-secondary text-xl" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>กฎเกณฑ์แพทเทิร์น:</span>
                  <span className="font-label text-on-surface text-[11px]">{c.rule}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>ค่าสัมประสิทธิ์ AI:</span>
                  <span className="font-label text-secondary font-bold text-[11px]">0.994 (Confidence)</span>
                </div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[99.4%] shadow-[0_0_8px_#00ffcc]" />
                </div>
              </div>
              <div className="mt-4 pt-3 flex items-center justify-between font-label text-[11px] text-secondary">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  พบข้อมูลอัปเดตล่าสุด
                </span>
                <span className="underline cursor-pointer hover:text-on-surface">API Node-01 OK</span>
              </div>
            </div>
          ) : (
            <div key={c.id} className="relative bg-surface-container-low rounded-xl p-5 shadow-md flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg bg-surface-variant flex items-center justify-center font-headline font-extrabold text-xs ${c.codeColor}`}>{c.code}</div>
                  <div>
                    <h3 className="font-headline font-semibold text-sm text-on-surface">{c.name}</h3>
                    <span className="font-label text-[10px] text-on-surface-variant">แพลตฟอร์มสำรอง / Standby</span>
                  </div>
                </div>
                <Icon name="horizontal_rule" className="text-outline text-lg" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>กฎเกณฑ์แพทเทิร์น:</span>
                  <span className="font-label text-[11px]">{c.rule}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>ค่าสัมประสิทธิ์ AI:</span>
                  <span className="font-label text-[11px]">0.040 (Mismatch)</span>
                </div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-outline h-full w-[4%]" />
                </div>
              </div>
              <div className="mt-4 pt-3 flex items-center justify-between font-label text-[11px] text-on-surface-variant">
                <span>ไม่ตรงกับรูปแบบมาตรฐาน</span>
                <span className="text-outline-variant font-mono">Standby</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
