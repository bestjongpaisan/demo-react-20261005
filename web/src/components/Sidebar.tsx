import { Icon } from './Icon'

const MAP =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCFebUtYLcl1B0upvKb_ZdCf7lL_JGkq_3_x5eTMCTaTdDzphvwrZuEqjulL5F2IeuyZ58f7Mb7aMCzVhxupzzHH-IE_WGxaTOgtMQO_PNY3ZGeUtUwyDlNr2F91wjLrVuI0opZSAbpUiKU05g0OwGmAwjZt36571lCKOk9MzO-Qu23W6HsrcgigKhD6g7-MM7gHxi31yJgGhX1RGRGFPDHlkVzU7oxFMz5J35STTkf28MOyvqzX10'

const actions = [
  {
    icon: 'notifications_active',
    title: 'แจ้งเตือนผ่าน LINE / SMS',
    desc: 'ส่งพิกัดเมื่อคนขับเข้าใกล้ 500 ม.',
    iconBox: 'bg-secondary/15 text-secondary',
    hover: 'hover:bg-surface-container-highest',
    titleHover: 'group-hover:text-secondary',
  },
  {
    icon: 'calendar_month',
    title: 'นัดหมายเวลาจัดส่งใหม่',
    desc: 'เลื่อนเวลานำส่ง หรือฝากไว้ที่นิติ',
    iconBox: 'bg-tertiary/15 text-tertiary',
    hover: 'hover:bg-surface-container-highest',
    titleHover: 'group-hover:text-tertiary',
  },
  {
    icon: 'report_problem',
    title: 'รายงานปัญหาพัสดุ / เคลม',
    desc: 'กล่องชำรุด พนักงานล่าช้า ตรวจสอบทันที',
    iconBox: 'bg-error/15 text-error',
    hover: 'hover:bg-error/20',
    titleHover: 'group-hover:text-error',
  },
]

export function Sidebar() {
  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      <div className="bg-surface-container rounded-2xl p-5 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="near_me" className="text-secondary text-lg" />
            <span className="font-headline font-bold text-sm text-on-surface">ตำแหน่งดาวเทียมสด (Live GPS)</span>
          </div>
          <span className="font-label text-[11px] text-secondary bg-secondary/15 px-2 py-0.5 rounded font-semibold animate-pulse">
            GPS SYNC
          </span>
        </div>
        <div
          className="w-full h-44 rounded-xl bg-cover bg-center relative overflow-hidden shadow-inner flex flex-col justify-between p-3"
          style={{ backgroundImage: `url('${MAP}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-transparent to-surface-dim/40 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between text-[11px] font-label">
            <span className="bg-surface-container-low/90 backdrop-blur px-2 py-1 rounded text-on-surface">Rider: FL-9942</span>
            <span className="bg-surface-container-low/90 backdrop-blur px-2 py-1 rounded text-secondary font-bold">ห่าง 1.2 กม.</span>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-surface-container-low/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-label text-on-surface">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>กำลังมุ่งหน้าไป ถ.ลาดพร้าว</span>
            </div>
            <button type="button" title="เปิดแผนที่เต็มจอ" className="p-1.5 rounded-lg bg-primary text-on-primary shadow-lg hover:opacity-90 transition-opacity">
              <Icon name="fullscreen" className="text-sm" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-label">
          <div className="p-2.5 rounded-lg bg-surface-container-low">
            <span className="text-on-surface-variant text-[10px] block">ความเร็วพิกัด</span>
            <span className="text-on-surface font-bold">38 km/h</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low">
            <span className="text-on-surface-variant text-[10px] block">อุณหภูมิสินค้า</span>
            <span className="text-secondary font-bold">24.2 °C (ปกติ)</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container rounded-2xl p-5 shadow-xl flex flex-col gap-3">
        <span className="font-headline font-bold text-xs uppercase text-on-surface-variant tracking-wider">
          ตัวเลือกการจัดการพัสดุ (Courier Actions)
        </span>
        {actions.map((a) => (
          <button
            key={a.title}
            type="button"
            className={`w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-high ${a.hover} transition-all group`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.iconBox}`}>
                <Icon name={a.icon} className="text-lg" />
              </div>
              <div className="text-left">
                <span className={`font-headline text-xs font-bold text-on-surface ${a.titleHover} transition-colors block`}>{a.title}</span>
                <span className="font-body text-[11px] text-on-surface-variant">{a.desc}</span>
              </div>
            </div>
            <Icon name="chevron_right" className="text-on-surface-variant text-base" />
          </button>
        ))}
      </div>

      <div className="bg-surface-container rounded-2xl p-5 shadow-xl flex items-center justify-between">
        <div>
          <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider block">Carrier On-Time SLA</span>
          <span className="font-headline font-bold text-base text-on-surface">Flash Express Hub</span>
          <span className="font-label text-xs text-secondary block mt-0.5">SLA Rank #1 (ลาดพร้าว)</span>
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-surface-container-highest"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="text-primary"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray="98, 100"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
          <span className="absolute font-headline font-bold text-xs text-on-surface">98%</span>
        </div>
      </div>
    </div>
  )
}
