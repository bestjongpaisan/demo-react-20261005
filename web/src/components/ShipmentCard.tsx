import { timeline } from '../data'
import { Icon } from './Icon'

export function ShipmentCard({ tracking, courierName }: { tracking: string; courierName: string }) {
  return (
    <div className="bg-surface-container rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 bg-surface-container-low/50 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(255,45,120,0.3)]">
            <Icon name="local_shipping" className="text-2xl" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-lg text-on-surface tracking-wider">{tracking}</span>
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label text-[10px] uppercase font-bold tracking-wider">
                {courierName}
              </span>
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
        <span className="hidden sm:block font-label text-xs text-secondary font-bold bg-secondary/10 px-3 py-1 rounded-full">
          ETA: 45 นาที
        </span>
      </div>

      <div className="pt-2 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">
            บันทึกประวัติการขนส่ง (Telemetry Log)
          </span>
          <span className="font-label text-xs text-on-surface-variant">Timezone: Asia/Bangkok (+07)</span>
        </div>
        <div className="relative flex flex-col gap-6 pl-4 sm:pl-6 before:content-[''] before:absolute before:left-[19px] sm:before:left-[27px] before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant">
          {timeline.map((step) => (
            <div key={step.title} className={`relative flex items-start gap-4 ${step.state === 'pending' ? 'opacity-50' : ''}`}>
              <div className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center text-sm ${step.circle}`}>
                <Icon name={step.icon} className="text-base" />
              </div>
              {step.state === 'active' ? (
                <div className="flex-1 pt-0.5 bg-surface-container-high/60 p-3.5 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-sm text-primary">{step.title}</span>
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-label font-bold rounded">IN PROGRESS</span>
                    </div>
                    <span className="font-label text-xs text-secondary font-mono">{step.time}</span>
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
                    <span className="font-headline font-semibold text-sm text-on-surface">{step.title}</span>
                    <span className={`font-label text-xs font-mono shrink-0 ${step.state === 'pending' ? 'text-outline' : 'text-on-surface-variant'}`}>
                      {step.time}
                    </span>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant mt-0.5">{step.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
