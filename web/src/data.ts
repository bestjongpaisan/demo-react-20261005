export type CourierId = 'flash' | 'thp' | 'kex'

export interface Courier {
  id: CourierId
  short: string
  name: string
  rule: string
  pattern: RegExp
  matchScore: number
  missScore: number
  missNote: string
  badgeText: string
}

export const couriers: Courier[] = [
  {
    id: 'flash',
    short: 'FL',
    name: 'Flash Express',
    rule: 'ขึ้นต้น TH + ตัวเลข 10-12 หลัก',
    pattern: /^TH\d{10,12}[A-Z0-9]{0,2}$/,
    matchScore: 0.994,
    missScore: 0.08,
    missNote: 'Mismatch prefix',
    badgeText: 'text-tertiary',
  },
  {
    id: 'thp',
    short: 'THP',
    name: 'ไปรษณีย์ไทย (EMS)',
    rule: '13 หลัก (EF/ED...TH)',
    pattern: /^[A-Z]{2}\d{9}TH$/,
    matchScore: 0.998,
    missScore: 0.12,
    missNote: 'Mismatch suffix',
    badgeText: 'text-primary',
  },
  {
    id: 'kex',
    short: 'KEX',
    name: 'KEX Express (Kerry)',
    rule: 'KEX / KER + เลข 8-10 หลัก',
    pattern: /^KE[XR]\d{8,10}(TH)?$/,
    matchScore: 0.987,
    missScore: 0.04,
    missNote: 'Non-prefix',
    badgeText: 'text-tertiary',
  },
]

export function detectCourier(input: string): Courier | undefined {
  const value = input.trim().toUpperCase()
  return couriers.find((c) => c.pattern.test(value))
}

export const sampleChips = [
  { label: 'Flash Express: TH2409857129EX', value: 'TH2409857129EX', dot: 'bg-secondary', text: 'text-secondary' },
  { label: 'Thailand Post: EF582910482TH', value: 'EF582910482TH', dot: 'bg-primary', text: 'text-on-surface' },
  { label: 'KEX (Kerry): KEX99482019TH', value: 'KEX99482019TH', dot: 'bg-tertiary', text: 'text-tertiary' },
]

export interface TimelineStep {
  icon: string
  title: string
  time: string
  desc: string
  state: 'pending' | 'active' | 'done'
  circle: string
}

export const timeline: TimelineStep[] = [
  {
    icon: 'task_alt',
    title: 'นำส่งสำเร็จ (Package Delivered)',
    time: '16:30 น. (ประมาณการ)',
    desc: 'รอเซ็นรับพัสดุผ่าน Smart Sign OTP',
    state: 'pending',
    circle: 'bg-surface-container-high text-outline-variant',
  },
  {
    icon: 'two_wheeler',
    title: 'พนักงานกำลังนำจ่ายพัสดุ',
    time: 'วันนี้ 10:20 น.',
    desc: '',
    state: 'active',
    circle: 'bg-primary text-on-primary shadow-[0_0_15px_rgba(255,45,120,0.8)]',
  },
  {
    icon: 'domain',
    title: 'สินค้าถึงสาขาปลายทาง (DC ลาดพร้าว)',
    time: 'วันนี้ 07:15 น.',
    desc: 'คัดแยกสู่สายนำจ่ายพื้นที่ Zone 4-จตุจักรเรียบร้อย',
    state: 'done',
    circle: 'bg-secondary text-on-secondary shadow-[0_0_10px_rgba(0,255,204,0.5)]',
  },
  {
    icon: 'hub',
    title: 'ศูนย์คัดแยกสินค้าหลัก (Sort Center ลาดกระบัง)',
    time: 'เมื่อวาน 13:45 น.',
    desc: 'ตรวจสอบสภาพบรรจุภัณฑ์และส่งต่อรถบรรทุกขนส่งข้ามเขต',
    state: 'done',
    circle: 'bg-secondary/80 text-on-secondary',
  },
  {
    icon: 'inventory_2',
    title: 'เข้ารับพัสดุแล้ว (Hub พระราม 9)',
    time: 'เมื่อวาน 09:30 น.',
    desc: 'บันทึกข้อมูลเข้าระบบ Flash Express Node BKK-09',
    state: 'done',
    circle: 'bg-secondary/60 text-on-secondary',
  },
]

export interface HistoryRow {
  tracking: string
  when: string
  courier: string
  courierClass: string
  dotClass: string
  receiver: string
  sender: string
  status: 'transit' | 'delivered' | 'pending'
  action: string
}

export const history: HistoryRow[] = [
  {
    tracking: 'TH2409857129EX',
    when: 'วันนี้ • 10:24 น. (AI Matched 99.4%)',
    courier: 'Flash Express',
    courierClass: 'bg-secondary-container/60 text-secondary',
    dotClass: 'bg-secondary',
    receiver: 'คุณอมรา (ลาดพร้าว)',
    sender: 'จาก: CyberHub BKK',
    status: 'transit',
    action: 'ดูข้อมูลสด',
  },
  {
    tracking: 'EF582910482TH',
    when: 'เมื่อวาน • 14:15 น. (AI Matched 99.8%)',
    courier: 'ไปรษณีย์ไทย (EMS)',
    courierClass: 'bg-primary-container/40 text-primary-fixed',
    dotClass: 'bg-primary',
    receiver: 'คุณอมรา (ลาดพร้าว)',
    sender: 'จาก: สำนักงาน กสทช.',
    status: 'delivered',
    action: 'ตรวจอีกครั้ง',
  },
  {
    tracking: 'KEX99482019TH',
    when: '3 วันที่แล้ว • 09:12 น. (AI Matched 98.7%)',
    courier: 'KEX (Kerry Express)',
    courierClass: 'bg-tertiary-container/40 text-tertiary',
    dotClass: 'bg-tertiary',
    receiver: 'คุณชวลิต (ทีมเทคนิค)',
    sender: 'จาก: PowerMart Online',
    status: 'delivered',
    action: 'ตรวจอีกครั้ง',
  },
  {
    tracking: 'TH0482910481AA',
    when: '5 วันที่แล้ว • 18:30 น. (AI Matched 96.2%)',
    courier: 'Flash Express',
    courierClass: 'bg-secondary-container/60 text-secondary',
    dotClass: 'bg-secondary',
    receiver: 'คุณอมรา (ลาดพร้าว)',
    sender: 'จาก: NeoGadget เชียงใหม่',
    status: 'pending',
    action: 'ตรวจอีกครั้ง',
  },
]
