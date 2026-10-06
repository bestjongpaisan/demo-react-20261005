import type { Courier, HistoryRow } from '../types'

// Static UI data (courier cards, quick samples, search history).

export const couriers: Courier[] = [
  {
    id: 'flash',
    short: 'FL',
    name: 'Flash Express',
    rule: 'ขึ้นต้น TH + ตัวเลข 10-12 หลัก',
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
    matchScore: 0.987,
    missScore: 0.04,
    missNote: 'Non-prefix',
    badgeText: 'text-tertiary',
  },
]

// Sample codes are 10 characters so they pass the validation rule.
export const sampleChips = [
  { label: 'Flash Express: TH24098571', value: 'TH24098571', dot: 'bg-secondary', text: 'text-secondary' },
  { label: 'Thailand Post: EF58291048', value: 'EF58291048', dot: 'bg-primary', text: 'text-on-surface' },
  { label: 'KEX (Kerry): KEX9948201', value: 'KEX9948201', dot: 'bg-tertiary', text: 'text-tertiary' },
]

export const history: HistoryRow[] = [
  {
    tracking: 'TH24098571',
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
    tracking: 'EF58291048',
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
    tracking: 'KEX9948201',
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
    tracking: 'TH04829104',
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
