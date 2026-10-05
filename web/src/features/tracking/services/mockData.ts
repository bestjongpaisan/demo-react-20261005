import type { HistoryRow, TimelineStep } from '../types'

// Mock data standing in for a tracking API.
export const sampleChips = [
  { label: 'Flash Express: TH2409857129EX', value: 'TH2409857129EX', dot: 'bg-secondary', text: 'text-secondary' },
  { label: 'Thailand Post: EF582910482TH', value: 'EF582910482TH', dot: 'bg-primary', text: 'text-on-surface' },
  { label: 'KEX (Kerry): KEX99482019TH', value: 'KEX99482019TH', dot: 'bg-tertiary', text: 'text-tertiary' },
]

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
