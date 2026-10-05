import Icon from './Icon'
import { history, type HistoryRow } from '../data/tracking'

const statusStyle: Record<HistoryRow['status'], string> = {
  active: 'bg-primary/15 text-primary',
  done: 'bg-secondary-container/40 text-secondary',
  pending: 'bg-surface-variant text-on-surface-variant',
}

function StatusIcon({ status }: { status: HistoryRow['status'] }) {
  if (status === 'active') return <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
  return <Icon name={status === 'done' ? 'check_circle' : 'hourglass_empty'} className="text-xs" />
}

export default function HistoryTable({ onSelect }: { onSelect: (tracking: string) => void }) {
  const select = (t: string) => {
    onSelect(t)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="bg-surface-container rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="manage_history" className="text-primary text-xl" />
            <h2 className="font-headline font-bold text-lg text-on-surface">ประวัติการค้นหาพัสดุล่าสุด</h2>
          </div>
          <p className="font-body text-xs text-on-surface-variant mt-0.5">บันทึกการตรวจสอบย้อนหลัง แยกตามผู้ให้บริการขนส่งที่จำแนกอัตโนมัติ</p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: 'filter_alt', label: 'กรองขนส่ง' },
            { icon: 'download', label: 'ส่งออก CSV' },
          ].map((b) => (
            <button key={b.label} className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-xs font-label text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1">
              <Icon name={b.icon} className="text-sm" />
              <span>{b.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-[11px] font-label uppercase tracking-wider text-on-surface-variant">
              <th className="py-3 px-4 rounded-l-lg">เลขพัสดุ / วันที่ค้นหา</th>
              <th className="py-3 px-4">ผู้ให้บริการ (Courier)</th>
              <th className="py-3 px-4">ผู้รับ / ผู้ส่ง</th>
              <th className="py-3 px-4">สถานะล่าสุด</th>
              <th className="py-3 px-4 rounded-r-lg text-right">ดำเนินการ</th>
            </tr>
          </thead>
          <tbody className="text-xs font-body">
            {history.map((r) => (
              <tr key={r.tracking} className="hover:bg-surface-container-high/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className={`font-headline font-semibold text-sm tracking-wide ${r.trackingClass}`}>{r.tracking}</span>
                    <span className="font-label text-[11px] text-on-surface-variant">{r.when}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label text-xs font-bold ${r.courierClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${r.dotClass}`} />
                    {r.courier}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="text-on-surface font-medium">{r.receiver}</span>
                    <span className="text-on-surface-variant text-[11px]">จาก: {r.from}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[r.status]}`}>
                    <StatusIcon status={r.status} />
                    {r.statusLabel}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="px-3 py-1 rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary transition-all text-xs font-label text-on-surface" onClick={() => select(r.tracking)}>
                    {r.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant pt-2">
        <span className="font-label">แสดง 4 จากทั้งหมด 28 รายการในคลังข้อมูลส่วนบุคคล</span>
        <div className="flex items-center gap-1 mt-2 sm:mt-0 font-label">
          <button className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface hover:bg-surface-container-highest">1</button>
          {[2, 3].map((n) => (
            <button key={n} className="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container-high">{n}</button>
          ))}
          <span className="px-1">...</span>
          <button className="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container-high">7</button>
        </div>
      </div>
    </section>
  )
}
