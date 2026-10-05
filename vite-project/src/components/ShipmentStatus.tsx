import Icon from './Icon'
import { timeline } from '../data/tracking'

const actions = [
  { icon: 'notifications_active', title: 'แจ้งเตือนผ่าน LINE / SMS', desc: 'ส่งพิกัดเมื่อคนขับเข้าใกล้ 500 ม.', tint: 'bg-secondary/15 text-secondary', hover: 'hover:bg-surface-container-highest', titleHover: 'group-hover:text-secondary' },
  { icon: 'calendar_month', title: 'นัดหมายเวลาจัดส่งใหม่', desc: 'เลื่อนเวลานำส่ง หรือฝากไว้ที่นิติ', tint: 'bg-tertiary/15 text-tertiary', hover: 'hover:bg-surface-container-highest', titleHover: 'group-hover:text-tertiary' },
  { icon: 'report_problem', title: 'รายงานปัญหาพัสดุ / เคลม', desc: 'กล่องชำรุด พนักงานล่าช้า ตรวจสอบทันที', tint: 'bg-error/15 text-error', hover: 'hover:bg-error/20', titleHover: 'group-hover:text-error' },
]

export default function ShipmentStatus({ tracking }: { tracking: string }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-surface-container rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 bg-surface-container-low/50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(255,45,120,0.3)]">
                <Icon name="local_shipping" className="text-2xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline font-bold text-lg text-on-surface tracking-wider">{tracking}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label text-[10px] uppercase font-bold tracking-wider">Flash Express</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-body mt-0.5">
                  <span>พัสดุด่วน Gadget อิเล็กทรอนิกส์</span>
                  <span>•</span>
                  <span className="font-label">น้ำหนัก: 1.45 kg</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:text-right">
              <span className="font-label text-xs text-on-surface-variant uppercase">กำหนดส่งโดยประมาณ</span>
              <span className="font-headline font-bold text-base sm:text-lg text-tertiary">วันนี้ ภายใน 16:30 น.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-surface-container-low flex items-start gap-3">
              <Icon name="trip_origin" className="text-secondary text-lg mt-0.5" />
              <div className="flex flex-col text-xs">
                <span className="font-label text-on-surface-variant uppercase tracking-wider text-[10px]">ผู้ส่งต้นทาง (Sender Hub)</span>
                <span className="font-headline font-semibold text-on-surface mt-0.5">CyberHub BKK (พระราม 9)</span>
                <span className="text-on-surface-variant text-[11px]">กรุงเทพมหานคร 10310</span>
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-container-low flex items-start gap-3">
              <Icon name="location_on" className="text-primary text-lg mt-0.5" />
              <div className="flex flex-col text-xs">
                <span className="font-label text-on-surface-variant uppercase tracking-wider text-[10px]">ผู้รับปลายทาง (Destination)</span>
                <span className="font-headline font-semibold text-on-surface mt-0.5">คุณอมรา (Logistics Lead)</span>
                <span className="text-on-surface-variant text-[11px]">แขวงจอมพล เขตจตุจักร ลาดพร้าว กทม. 10900</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-surface-container-highest p-4 flex items-center justify-between">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-secondary shadow-[0_0_10px_#00ffcc]" />
            <div className="flex items-center gap-3 pl-2">
              <div className="w-3 h-3 rounded-full bg-secondary animate-ping" />
              <div>
                <div className="font-headline font-bold text-sm text-on-surface flex items-center gap-2">
                  กำลังจัดส่งถึงผู้รับ (Out for Delivery)
                  <span className="text-xs font-label text-secondary font-medium">กำลังเคลื่อนที่</span>
                </div>
                <p className="font-body text-xs text-on-surface-variant">พนักงานนำส่งกำลังเดินทางมายังสถานที่จัดส่งของคุณ</p>
              </div>
            </div>
            <span className="hidden sm:block font-label text-xs text-secondary font-bold bg-secondary/10 px-3 py-1 rounded-full">ETA: 45 นาที</span>
          </div>

          <div className="pt-2 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">บันทึกประวัติการขนส่ง (Telemetry Log)</span>
              <span className="font-label text-xs text-on-surface-variant">Timezone: Asia/Bangkok (+07)</span>
            </div>
            <div className="relative flex flex-col gap-6 pl-4 sm:pl-6 before:content-[''] before:absolute before:left-[19px] sm:before:left-[27px] before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant">
              {timeline.map((s) => (
                <div key={s.title} className={`relative flex items-start gap-4 ${s.state === 'pending' ? 'opacity-50' : ''}`}>
                  <div className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center text-sm ${s.circle}`}>
                    <Icon name={s.icon} className="text-base" />
                  </div>
                  {s.state === 'active' ? (
                    <div className="flex-1 pt-0.5 bg-surface-container-high/60 p-3.5 rounded-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-headline font-bold text-sm text-primary">{s.title}</span>
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-label font-bold rounded">IN PROGRESS</span>
                        </div>
                        <span className="font-label text-xs text-secondary font-mono">{s.time}</span>
                      </div>
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Icon name="person" className="text-sm text-on-surface-variant" />
                          <span className="text-on-surface font-semibold">สมชาย รวดเร็ว</span>
                          <span className="text-on-surface-variant font-label">(รหัสพนักงาน: FL-9942)</span>
                        </div>
                        <a className="inline-flex items-center gap-1 text-secondary hover:underline font-label font-bold" href="tel:0819998888">
                          <Icon name="call" className="text-xs" /> โทร 081-999-XXXX
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-headline font-semibold text-sm text-on-surface">{s.title}</span>
                        <span className={`font-label text-xs font-mono ${s.state === 'pending' ? 'text-outline' : 'text-on-surface-variant'}`}>{s.time}</span>
                      </div>
                      <p className="font-body text-xs text-on-surface-variant mt-0.5">{s.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-surface-container rounded-2xl p-5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="near_me" className="text-secondary text-lg" />
              <span className="font-headline font-bold text-sm text-on-surface">ตำแหน่งดาวเทียมสด (Live GPS)</span>
            </div>
            <span className="font-label text-[11px] text-secondary bg-secondary/15 px-2 py-0.5 rounded font-semibold animate-pulse">GPS SYNC</span>
          </div>
          <div
            className="w-full h-44 rounded-xl bg-cover bg-center relative overflow-hidden shadow-inner flex flex-col justify-between p-3 bg-surface-container-low"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFebUtYLcl1B0upvKb_ZdCf7lL_JGkq_3_x5eTMCTaTdDzphvwrZuEqjulL5F2IeuyZ58f7Mb7aMCzVhxupzzHH-IE_WGxaTOgtMQO_PNY3ZGeUtUwyDlNr2F91wjLrVuI0opZSAbpUiKU05g0OwGmAwjZt36571lCKOk9MzO-Qu23W6HsrcgigKhD6g7-MM7gHxi31yJgGhX1RGRGFPDHlkVzU7oxFMz5J35STTkf28MOyvqzX10')" }}
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
              <button className="p-1.5 rounded-lg bg-primary text-on-primary shadow-lg hover:opacity-90 transition-opacity" title="เปิดแผนที่เต็มจอ">
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
          <span className="font-headline font-bold text-xs uppercase text-on-surface-variant tracking-wider">ตัวเลือกการจัดการพัสดุ (Courier Actions)</span>
          {actions.map((a) => (
            <button key={a.title} className={`w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-high ${a.hover} transition-all group`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.tint}`}>
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
              <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="98, 100" strokeLinecap="round" strokeWidth="3" />
            </svg>
            <span className="absolute font-headline font-bold text-xs text-on-surface">98%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
