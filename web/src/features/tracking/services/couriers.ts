import type { Courier } from '../types'

// Supported couriers and their tracking-number patterns.
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
