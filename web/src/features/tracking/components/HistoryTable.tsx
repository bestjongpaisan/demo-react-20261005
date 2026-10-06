import type { HistoryRow } from '../types'
import { history } from '../services/mockData'
import { Icon } from '../../../shared/components/Icon'

function StatusBadge({ status }: { status: HistoryRow['status'] }) {
  if (status === 'transit') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        อยู่ระหว่างจัดส่ง
      </span>
    )
  }
  if (status === 'delivered') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/40 text-secondary text-xs font-semibold">
        <Icon name="check_circle" className="text-xs" />
        จัดส่งสำเร็จแล้ว
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs font-semibold">
      <Icon name="hourglass_empty" className="text-xs" />
      รอดำเนินการเข้ารับ
    </span>
  )
}

const toolButton =
  'px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-xs font-label text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1'

export function HistoryTable({ activeTracking, onSelect }: { activeTracking?: string; onSelect: (tracking: string) => void }) {
  return (
    <section className="bg-surface-container rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="manage_history" className="text-primary text-xl" />
            <h2 className="font-headline font-bold text-lg text-on-surface">ประวัติการค้นหาพัสดุล่าสุด</h2>
          </div>
          <p className="font-body text-xs text-on-surface-variant mt-0.5">
            บันทึกการตรวจสอบย้อนหลัง แยกตามผู้ให้บริการขนส่งที่จำแนกอัตโนมัติ
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className={toolButton}>
            <Icon name="filter_alt" className="text-sm" />
            <span>กรองขนส่ง</span>
          </button>
          <button type="button" className={toolButton}>
            <Icon name="download" className="text-sm" />
            <span>ส่งออก CSV</span>
          </button>
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
            {history.map((row) => (
              <tr key={row.tracking} className="hover:bg-surface-container-high/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className={`font-headline font-semibold text-sm tracking-wide ${row.tracking === activeTracking ? 'text-secondary' : 'text-on-surface'}`}>
                      {row.tracking}
                    </span>
                    <span className="font-label text-[11px] text-on-surface-variant">{row.when}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label text-xs font-bold ${row.courierClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${row.dotClass}`} />
                    {row.courier}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="text-on-surface font-medium">{row.receiver}</span>
                    <span className="text-on-surface-variant text-[11px]">{row.sender}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(row.tracking)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="px-3 py-1 rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary transition-all text-xs font-label text-on-surface"
                  >
                    {row.action}
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
          <button type="button" className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface hover:bg-surface-container-highest">1</button>
          {['2', '3'].map((p) => (
            <button key={p} type="button" className="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container-high">{p}</button>
          ))}
          <span className="px-1 text-on-surface-variant">...</span>
          <button type="button" className="px-2.5 py-1 rounded text-on-surface-variant hover:bg-surface-container-high">7</button>
        </div>
      </div>
    </section>
  )
}
